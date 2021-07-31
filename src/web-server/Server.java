import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsServer;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.SSLParameters;
import javax.net.ssl.TrustManagerFactory;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.util.HashMap;
import java.util.Map;

public class Server implements HttpHandler {

    Handler handler;
    int port;

    static final Map<String, String> CONTENT_TYPES = new HashMap<>();
    final static Charset ENCODING = StandardCharsets.UTF_8;

    static {

        CONTENT_TYPES.put("css", "text/css");
        CONTENT_TYPES.put("gif", "image/gif");
        CONTENT_TYPES.put("ico", "image/x-icon");
        CONTENT_TYPES.put("jpg", "image/jpeg");
        CONTENT_TYPES.put("jpeg", "image/jpeg");
        CONTENT_TYPES.put("js", "text/javascript");
        CONTENT_TYPES.put("htm", "text/html");
        CONTENT_TYPES.put("html", "text/html");
        CONTENT_TYPES.put("png", "image/png");
        CONTENT_TYPES.put("svg", "image/svg+xml");
    }

    //------------------------------------------------------------------------------------------------------------------
    // Initialise the server
    //------------------------------------------------------------------------------------------------------------------

    Server(Config config, int port, boolean ssl, Handler handler) {

        this.handler = handler;
        this.port = port;

        String protocol = ssl ? "https" : "http";
        try {
            HttpServer server = createServer(port, ssl, config.getAllowExternalConnections());
            server.createContext("/", this);
            server.setExecutor(null);
            server.start();
            System.out.println(protocol + "://localhost:" + port + "/index.html");
        } catch (Exception exception) {
            throw new RuntimeException(
                    "Failed to start the " + protocol + " server on port " + port + ":\n" + exception.getMessage());
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Serve requests
    //------------------------------------------------------------------------------------------------------------------

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {

        Response response = handler.getResponse(port, httpExchange.getRequestURI().getPath());

        httpExchange.getResponseHeaders()
                .set("Content-Type", response.getContentType() + "; charset=" + ENCODING.displayName());
        httpExchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        httpExchange.sendResponseHeaders(response.getStatus(), response.getBody().length);
        try (OutputStream os = httpExchange.getResponseBody()) {
            try {
                os.write(response.getBody());
            } catch (Exception exception) {
                exception.printStackTrace(System.err);
                throw exception;
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create the underlying server
    //------------------------------------------------------------------------------------------------------------------

    public HttpServer createServer(int port, boolean ssl, boolean allowExternalConnections) throws Exception {

        InetSocketAddress inetSocketAddress =
                allowExternalConnections ? new InetSocketAddress(port) : new InetSocketAddress(
                        InetAddress.getLoopbackAddress(), port);
        if (ssl) {
            return configureSsl(HttpsServer.create(inetSocketAddress, 0));
        } else {
            return HttpServer.create(inetSocketAddress, 0);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Configure the SSL settings
    //------------------------------------------------------------------------------------------------------------------

    public HttpsServer configureSsl(HttpsServer server) throws Exception {

        SSLContext sslContext = SSLContext.getInstance("TLS");

        // initialise the keystore
        char[] password = "shortycut".toCharArray();
        KeyStore keyStore = KeyStore.getInstance("JKS");
        keyStore.load(getClass().getClassLoader().getResourceAsStream("keystore.jks"), password);
        if (0 == keyStore.size()) {
            throw new RuntimeException("Unable to load the SSL keystore");
        }

        // set up the key manager factory
        KeyManagerFactory keyManagementFactory = KeyManagerFactory.getInstance("SunX509");
        keyManagementFactory.init(keyStore, password);

        // setup the trust manager factory
        TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance("SunX509");
        trustManagerFactory.init(keyStore);

        // setup the HTTPS context and parameters
        sslContext.init(keyManagementFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), null);
        server.setHttpsConfigurator(new HttpsConfigurator(sslContext));

        return server;
    }

    private static class HttpsConfigurator extends com.sun.net.httpserver.HttpsConfigurator {

        HttpsConfigurator(SSLContext sslContext) {
            super(sslContext);
        }

        public void configure(HttpsParameters parameters) {

            try {

                // initialise the SSL context
                SSLContext context = getSSLContext();
                SSLEngine engine = context.createSSLEngine();
                parameters.setNeedClientAuth(false);
                parameters.setCipherSuites(engine.getEnabledCipherSuites());
                parameters.setProtocols(engine.getEnabledProtocols());

                // set the SSL parameters
                SSLParameters sslParameters = context.getSupportedSSLParameters();
                parameters.setSSLParameters(sslParameters);

            } catch (Exception ex) {
                System.out.println("Failed to create HTTPS port");
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Wrapper for the response returned by the handler
    //------------------------------------------------------------------------------------------------------------------

    static class Response {

        private final int status;
        private final String contentType;
        private final byte[] body;

        Response(int status, String contentType, byte[] body) {
            this.status = status;
            this.contentType = contentType;
            this.body = body;
        }

        Response(int status, String contentType, String body) {
            this(status, contentType, body.getBytes(ENCODING));
        }

        public int getStatus() {
            return status;
        }

        public String getContentType() {
            return contentType;
        }

        public byte[] getBody() {
            return body;
        }
    }
}
