import static javax.swing.JOptionPane.ERROR_MESSAGE;
import static javax.swing.JOptionPane.showMessageDialog;

import java.io.File;

public class Application {

    private static final String DEFAULT_PROPERTIES_FILE = "web-server.properties";

    //------------------------------------------------------------------------------------------------------------------
    // Initialize and start the server
    //------------------------------------------------------------------------------------------------------------------

    public static void main(String[] args) {

        try {

            boolean useDefaultConfigFile = 0 == args.length;
            String configFile = useDefaultConfigFile ? "../data/" + DEFAULT_PROPERTIES_FILE : args[0];
            if (!new File(configFile).exists()) {
                if (useDefaultConfigFile) {
                    throw new Exception(
                            "The configuration file \"data/" + DEFAULT_PROPERTIES_FILE + "\" does not exist.\n\n" +
                                    "Before starting the web server for the first time, make sure to rename the\n" +
                                    "data-template folder to data (i.e. remove \"-template\" from the folder's name).");
                } else {
                    throw new Exception("The configuration file " + configFile + " does not exist.");
                }
            }

            Config config = new Config(configFile);
            Handler handler = new Handler(config);
            config.getHttpPort().ifPresent(port -> new Server(config, port, false, handler));
            config.getHttpsPort().ifPresent(port -> new Server(config, port, true, handler));

        } catch (Exception exception) {
            exception.printStackTrace(System.err);
            showMessageDialog(null, exception.getMessage(), "Failed to start the ShortyCut web server", ERROR_MESSAGE);
            System.exit(1);
        }
    }
}
