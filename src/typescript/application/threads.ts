namespace shortycut {

    type ParserCallback = (result: unknown) => void;

    const SHORTCUTS_PER_BATCH = 2_000;

    //------------------------------------------------------------------------------------------------------------------
    // Parse shortcut definitions batch-wise
    //------------------------------------------------------------------------------------------------------------------

    export function parseShortcuts(callback: ParserCallback) {

        handleExceptions(callback, () => {
            const lines = new Array<string>();
            startupCache.shortcuts.forEach(shortcut => lines.push(...shortcut.split(/\r?\n/)));
            const parser = new ShortcutParser();
            parseBatch(parser, lines, 0, SHORTCUTS_PER_BATCH, shortcuts, callback);
        });
    }

    function parseBatch(
        parser: ShortcutParser,
        lines: string[],
        index: number,
        batchSize: number,
        shortcuts: Shortcuts,
        callback: ParserCallback
    ) {

        handleExceptions(callback, () => {
            if (index < lines.length) {
                parser.parseLines(lines, index, Math.min(index + batchSize, lines.length), shortcuts);
                setTimeout(() => parseBatch(parser, lines, index + batchSize, batchSize, shortcuts, callback), 0);
            } else {
                callback(shortcuts);
            }
        });
    }
}
