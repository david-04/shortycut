import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class Cache {

    private final Map<String, LoadedFile> cache = new HashMap<>();

    //------------------------------------------------------------------------------------------------------------------
    // Retrieve a cached file
    //------------------------------------------------------------------------------------------------------------------

    Optional<LoadedFile> get(String path) {
        return Optional.ofNullable(cache.get(path)).filter(LoadedFile::isUpToDate);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Add a file to the cache
    //------------------------------------------------------------------------------------------------------------------

    void put(String path, LoadedFile loadedFile) {
        cache.put(path, loadedFile);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Data structure for cached files
    //------------------------------------------------------------------------------------------------------------------

    static class LoadedFile {

        private final File file;
        private final long lastModifiedWhenLoaded;
        private final byte[] content;

        LoadedFile(File file, long lastModifiedWhenLoaded, byte[] content) {
            this.file = file;
            this.lastModifiedWhenLoaded = lastModifiedWhenLoaded;
            this.content = content;
        }

        public byte[] getContent() {
            return content;
        }

        public boolean isUpToDate() {
            return file.lastModified() == lastModifiedWhenLoaded;
        }
    }
}
