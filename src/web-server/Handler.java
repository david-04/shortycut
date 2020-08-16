import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import static java.nio.file.Files.readAllBytes;

public class Handler {

    private final File documentRoot;
    private final List<Entry<String, File>> fileSystemMount;
    private final Map<Integer, byte[]> searchXmlByPort = new HashMap<>();
    private final Cache cache = new Cache();
    private final boolean allowListing;

    private static final Server.Response FILE_NOT_FOUND = new Server.Response(400, "text/plain", "File not found");

    //------------------------------------------------------------------------------------------------------------------
    // Initialise the handler
    //------------------------------------------------------------------------------------------------------------------

    Handler(Config config) {

        config.getHttpPort().ifPresent(port -> searchXmlByPort.put(port, getSearchXml("http", port)));
        config.getHttpsPort().ifPresent(port -> searchXmlByPort.put(port, getSearchXml("https", port)));
        documentRoot = config.getDocumentRoot();
        fileSystemMount = config.getFileSystemMount();
        allowListing = config.getAllowListing();
    }

    private byte[] getSearchXml(String protocol, int port) {

        String baseUrl = protocol + "://localhost:" + port;
        String favicon = baseUrl + "/resources/favicon.ico";
        String searchUrl = baseUrl + "/index.html?q={searchTerms}";
        return ("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" +
                "    <OpenSearchDescription xmlns=\"http://a9.com/-/spec/opensearch/1.1/\">\n" +
                "    <ShortName>ShortyCut</ShortName>\n" +
                "    <Description>Search through your own shortcuts</Description>\n" +
                "    <InputEncoding>UTF-8</InputEncoding>\n" +
                "    <Image width=\"16\" height=\"16\" type=\"image/x-icon\">" + favicon + "</Image>\n" +
                "    <Url type=\"text/html\" template=\"" + searchUrl + "\" />\n" + "</OpenSearchDescription>\n")
                .getBytes(Server.ENCODING);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Handle a request
    //------------------------------------------------------------------------------------------------------------------

    Server.Response getResponse(int port, String path) {

        try {

            path = unifyPath(path);
            if (path.equals("data/search.xml")) {
                return new Server.Response(200, "application/opensearchdescription+xm", searchXmlByPort.get(port));
            } else {
                return loadFile(path);
            }
        } catch (Exception exception) {
            return createErrorResponse(exception);
        }
    }

    private String unifyPath(String path) {

        if (null == path) {
            path = "";
        }
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        if (path.isEmpty()) {
            path = "index.html";
        }
        if ("favicon.ico".equals(path)) {
            path = "resources/favicon.ico";
        }
        return path;
    }

    private Server.Response createErrorResponse(Exception exception) {

        StringWriter stringWriter = new StringWriter();
        try (PrintWriter printWriter = new PrintWriter(stringWriter)) {
            exception.printStackTrace(printWriter);
            printWriter.close();
            return new Server.Response(500, "text/plain", stringWriter.toString().trim());
        } catch (Exception ignored) {
            if (null != exception.getMessage() && !exception.getMessage().isEmpty()) {
                return new Server.Response(500, "text/plain", exception.getMessage());
            } else {
                return new Server.Response(500, "text/plain", "Internal server error");
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Load a file
    //------------------------------------------------------------------------------------------------------------------

    private Server.Response loadFile(String path) throws IOException {

        Optional<Cache.LoadedFile> loadedFile = cache.get(path);
        if (loadedFile.isPresent()) {
            return new Server.Response(200, getContentType(path), loadedFile.get().getContent());
        }

        File file = new File(documentRoot, path);
        if (file.isDirectory() && allowListing) {
            return createListing(file, path);
        }
        loadedFile = loadFile(new File(documentRoot, path));
        if (loadedFile.isPresent()) {
            cache.put(path, loadedFile.get());
            return new Server.Response(200, getContentType(path), loadedFile.get().getContent());
        }

        return loadMountedFile("/" + path).orElse(FILE_NOT_FOUND);
    }

    private Optional<Cache.LoadedFile> loadFile(File file) throws IOException {

        if (file.isFile()) {
            return Optional.of(new Cache.LoadedFile(file, file.lastModified(), readAllBytes(Paths.get(file.toURI()))));
        } else {
            return Optional.empty();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Load a file from a mount point
    //------------------------------------------------------------------------------------------------------------------

    private Optional<Server.Response> loadMountedFile(String path) throws IOException {

        for (Entry<String, File> mount : fileSystemMount) {
            String prefix = (mount.getKey().startsWith("/") ? "" : "/") + mount.getKey();
            if (path.startsWith(prefix)) {
                Optional<Server.Response> response = loadMountedFile(mount.getValue(), path.substring(prefix.length()));
                if (response.isPresent()) {
                    return response;
                }
            }
        }

        return Optional.empty();
    }

    private Optional<Server.Response> loadMountedFile(File baseDirectory, String path) throws IOException {

        File file = null != baseDirectory ? new File(baseDirectory, path) : new File(path);
        if (file.exists()) {
            Optional<Cache.LoadedFile> loadedFile = Optional.empty();
            if (file.isFile()) {
                loadedFile = loadFile(file);
            }
            if (loadedFile.isPresent()) {
                return Optional.of(new Server.Response(200, getContentType(path), loadedFile.get().getContent()));
            } else if (file.isDirectory() && allowListing) {
                return Optional.of(createListing(new File(file, "xxx").getParentFile(), path));
            }
        }
        return Optional.empty();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create a file listing
    //------------------------------------------------------------------------------------------------------------------

    private Server.Response createListing(File directory, String path) {

        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        if (!path.endsWith("/")) {
            path = path + "/";
        }
        final String pathPrefix = path;

        List<String> html = new LinkedList<>();
        html.add("<!DOCTYPE html>");
        html.add("<html>");
        html.add("<head>");
        html.add("<meta charset=\"utf-8\" />");
        html.add("<title>" + directory.getName() + "</title>");
        html.add("</head>");
        html.add("<body>");

        List<String> links = new LinkedList<>();
        if (directory.getParentFile() != null) {
            links.add("<a href=\"" + pathPrefix + "..\">[..]</a>");
        }

        File[] children = directory.listFiles();
        if (null != children) {
            Arrays.stream(children).filter(File::isDirectory).sorted().map(File::getName)
                    .map(item -> "<a href=\"" + pathPrefix + item + "/\">[" + item + "]</a>").forEach(links::add);
            Arrays.stream(children).filter(child -> !child.isDirectory()).sorted().map(File::getName)
                    .map(item -> "<a href=\"" + pathPrefix + item + "\">" + item + "</a>").forEach(links::add);
        }

        html.add(String.join("<br>", links));
        html.add("</body>");
        html.add("</html>");

        return new Server.Response(200, Server.CONTENT_TYPES.get("html"),
                String.join("\n", html).getBytes(Server.ENCODING));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine the content type based on the file extension
    //------------------------------------------------------------------------------------------------------------------

    private String getContentType(String path) {
        int index = path.lastIndexOf(".");
        String extension = path.substring(index < 0 ? 0 : index + 1).toLowerCase();
        return Server.CONTENT_TYPES.getOrDefault(extension, "application/octet-stream");
    }
}
