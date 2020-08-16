import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.AbstractMap.SimpleEntry;
import java.util.LinkedList;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.regex.Pattern;

@SuppressWarnings("OptionalUsedAsFieldOrParameterType")
public class Config {

    private static final String HTTP_PORT = "http-port";
    private static final String HTTPS_PORT = "https-port";
    private static final String DOCUMENT_ROOT = "document-root";
    private static final String ALLOW_EXTERNAL_CONNECTIONS = "allow-external-connections";
    private static final String FILE_SYSTEM_MOUNT = "file-system-mount";
    private static final String ALLOW_LISTING = "allow-listing";

    private Optional<Integer> httpPort = Optional.empty();
    private Optional<Integer> httpsPort = Optional.empty();
    private File documentRoot = new File(System.getProperty("user.dir"));
    private boolean allowExternalConnections = false;
    private final List<Entry<String, File>> fileSystemMount = new LinkedList<>();
    private boolean allowListing = false;

    //------------------------------------------------------------------------------------------------------------------
    // Load the config file
    //------------------------------------------------------------------------------------------------------------------

    Config(String file) {

        try {
            File configPath = new File(file).getParentFile();
            Files.readAllLines(Paths.get(file)).stream().map(line -> line.replaceAll("#.*", "").trim())
                    .filter(line -> !line.isEmpty()).forEach(line -> processLine(line, configPath));
            validate();
        } catch (Exception exception) {
            throw new RuntimeException("An error occurred while loading " + file + ".\n" + exception.getMessage());
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Parse a line
    //------------------------------------------------------------------------------------------------------------------

    private void processLine(String line, File configPath) {

        Entry<String, String> entry = splitLine(line);

        try {

            if (null == entry.getValue()) {
                throw new RuntimeException("The line is not in key=value format");
            } else if (HTTP_PORT.equals(entry.getKey())) {
                httpPort = Optional.of(parsePort(entry.getValue()));
            } else if (HTTPS_PORT.equals(entry.getKey())) {
                httpsPort = Optional.of(parsePort(entry.getValue()));
            } else if (DOCUMENT_ROOT.equals(entry.getKey())) {
                documentRoot = new File(entry.getValue());
                if (!documentRoot.isDirectory()) {
                    throw new Exception("The document root is not a directory");
                }
            } else if (ALLOW_EXTERNAL_CONNECTIONS.equals(entry.getKey())) {
                allowExternalConnections = Boolean.parseBoolean(entry.getValue());
            } else if (ALLOW_LISTING.equals(entry.getKey())) {
                allowListing = Boolean.parseBoolean(entry.getValue());
            } else if (FILE_SYSTEM_MOUNT.equals(entry.getKey())) {
                fileSystemMount.add(parseMountPoint(entry.getValue(), configPath));
            } else {
                throw new Exception("Unknown property key " + entry.getKey());
            }
        } catch (Exception exception) {
            throw new RuntimeException(
                    exception.getMessage() + "\nThe problem was caused by the following line:\n" + line);
        }
    }

    private Entry<String, String> splitLine(String line) {
        int index = line.indexOf("=");
        if (index < 0) {
            return new SimpleEntry<>(line, null);
        } else {
            return new SimpleEntry<>(line.substring(0, index).trim(), line.substring(index + 1).trim());
        }
    }

    private int parsePort(String value) {
        try {
            int port = Integer.parseInt(value);
            if (!value.equals(String.valueOf(port)) || port < 0) {
                throw new RuntimeException();
            }
            return port;
        } catch (Exception exception) {
            throw new RuntimeException(value + " is not a valid port number");
        }
    }

    private Entry<String, File> parseMountPoint(String value, File configPath) {
        int index = value.indexOf(" ");
        if (index <= 0) {
            return new SimpleEntry<>(value, null);
        } else {
            String path = value.substring(index + 1).trim();
            File file = new File(path);
            if (!file.isAbsolute()) {
                file = new File(configPath, path);
            }
            return new SimpleEntry<>(value.substring(0, index).trim(), file);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Validate the configuration
    //------------------------------------------------------------------------------------------------------------------

    private void validate() throws Exception {
        if (!getHttpPort().isPresent() && !getHttpsPort().isPresent()) {
            throw new Exception("Neither " + HTTP_PORT + " nor " + HTTPS_PORT + " is set");
        } else if (getHttpPort().orElse(-1).intValue() == getHttpsPort().orElse(-1).intValue()) {
            throw new Exception(HTTP_PORT + " and " + HTTPS_PORT + " must point to different ports");
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters
    //------------------------------------------------------------------------------------------------------------------

    Optional<Integer> getHttpPort() {
        return httpPort;
    }

    Optional<Integer> getHttpsPort() {
        return httpsPort;
    }

    public File getDocumentRoot() {
        return documentRoot;
    }

    public boolean getAllowExternalConnections() {
        return allowExternalConnections;
    }

    public boolean getAllowListing() {
        return allowListing;
    }

    public List<Entry<String, File>> getFileSystemMount() {
        return fileSystemMount;
    }
}
