import { assertNotNull } from "./misc";
import { adjustCase } from "./string";

type HotkeyCandidates = Array<{ index: number; isPreferred: boolean }>;

//----------------------------------------------------------------------------------------------------------------------
// Automatically select letters from the description to be highlighted as hotkeys
//----------------------------------------------------------------------------------------------------------------------

export class HotkeySelector {
    private static readonly MAX_ASCII_CODE = 127;

    //------------------------------------------------------------------------------------------------------------------
    // Split the description into alternating segments of descriptions and hotkeys
    //------------------------------------------------------------------------------------------------------------------

    public selectHotkeys(keyword: string, description: string, skipFirst: number) {
        try {
            description = this.appendMissingHotkeys(keyword, description);
            const hotkeyPositions = this.selectBestCandidates(this.determineAllCandidates(keyword, description));
            hotkeyPositions.splice(0, skipFirst);
            return this.splitDescription(description, hotkeyPositions);
        } catch (exception) {
            console.error(exception);
            return [{ text: description, isHotkey: false }];
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Append trailing keyword letters that can't be matched to hotkeys
    //------------------------------------------------------------------------------------------------------------------

    private appendMissingHotkeys(keyword: string, description: string) {
        const keywordCaseAdjusted = adjustCase(keyword);
        const descriptionCaseAdjusted = adjustCase(description);
        let descriptionIndex = 0;

        for (let keywordIndex = 0; keywordIndex < keywordCaseAdjusted.length; keywordIndex++) {
            const hotkey = keywordCaseAdjusted.charAt(keywordIndex);
            descriptionIndex = descriptionCaseAdjusted.indexOf(hotkey, descriptionIndex);
            if (descriptionIndex < 0) {
                return `${description} ${keyword.substring(keywordIndex)}`;
            }
        }

        return description;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine all positions that could be used as hotkey
    //------------------------------------------------------------------------------------------------------------------

    private determineAllCandidates(keyword: string, description: string) {
        const candidates = new Array<HotkeyCandidates>();
        const keywordCaseAdjusted = adjustCase(keyword);
        const descriptionCaseAdjusted = adjustCase(description);

        for (let keywordIndex = 0; keywordIndex < keywordCaseAdjusted.length; keywordIndex++) {
            const hotkey = keywordCaseAdjusted.charAt(keywordIndex);
            candidates.push([]);
            let descriptionIndex = -1;
            while (0 <= (descriptionIndex = descriptionCaseAdjusted.indexOf(hotkey, descriptionIndex + 1))) {
                candidates.at(-1)?.push({
                    index: descriptionIndex,
                    isPreferred:
                        0 === descriptionIndex ||
                        this.isUpperCase(description.charAt(descriptionIndex)) ||
                        this.isSeparator(description.charAt(descriptionIndex - 1)),
                });
            }
        }

        return candidates;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine if a given character is uppercase
    //------------------------------------------------------------------------------------------------------------------

    private isUpperCase(char: string) {
        return char === char.toUpperCase();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine if a given character is an obvious separator (not a-z and within ASCII range [0, 127])
    //------------------------------------------------------------------------------------------------------------------

    private isSeparator(char: string) {
        const code = char.codePointAt(0);
        return undefined !== code && 0 <= code && code <= HotkeySelector.MAX_ASCII_CODE && /[^a-z]/i.test(char);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Select the optimal hotkey candidates
    //------------------------------------------------------------------------------------------------------------------

    private selectBestCandidates(candidates: HotkeyCandidates[]) {
        const currentCombination = candidates.map(() => 0);
        let bestCombination = new Array<number>();

        do {
            if (
                this.isValidCombination(currentCombination, candidates) &&
                (!bestCombination.length || this.isBetterThan(currentCombination, bestCombination, candidates))
            ) {
                bestCombination = currentCombination.slice();
            }
        } while (this.switchToNextCombination(currentCombination, candidates));

        return bestCombination.map((value, index) => assertNotNull(candidates[index]?.[value]?.index));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Switch to the next possible candidate combination
    //------------------------------------------------------------------------------------------------------------------

    private switchToNextCombination(currentCombination: number[], candidates: HotkeyCandidates[]) {
        for (let index = currentCombination.length - 1; 0 <= index; index--) {
            currentCombination[index] = (currentCombination[index] ?? 0) + 1;
            if ((currentCombination[index] ?? Number.MAX_VALUE) < (candidates[index]?.length ?? -1)) {
                return true;
            } else if (0 === index) {
                return false;
            } else {
                currentCombination[index] = 0;
            }
        }

        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine if a combination is valid (i.e. all hotkeys are in the correct order)
    //------------------------------------------------------------------------------------------------------------------

    private isValidCombination(currentCombination: number[], candidates: HotkeyCandidates[]) {
        for (let index = 1; index < currentCombination.length; index++) {
            const previousIndex =
                candidates[index - 1]?.[assertNotNull(currentCombination[index - 1])]?.index ?? Number.MAX_VALUE;
            const currentIndex = candidates[index]?.[assertNotNull(currentCombination[index])]?.index ?? -1;
            if (currentIndex <= previousIndex) {
                return false;
            }
        }
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Determine if one combination is better (has more preferred hotkeys) than the other
    //------------------------------------------------------------------------------------------------------------------

    private isBetterThan(currentCombination: number[], bestCombination: number[], candidates: HotkeyCandidates[]) {
        const currentScore = this.countPreferredHotkeys(currentCombination, candidates);
        const bestScore = this.countPreferredHotkeys(bestCombination, candidates);

        if (bestScore < currentScore) {
            return true;
        } else if (currentScore < bestScore) {
            return false;
        } else {
            return !candidates[0]?.[bestCombination[0] ?? -1]?.isPreferred;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Count how many hotkeys of the given combination point to preferred hotkeys
    //------------------------------------------------------------------------------------------------------------------

    private countPreferredHotkeys(combination: number[], candidates: HotkeyCandidates[]) {
        return combination.map((value, index) => candidates[index]?.[value]).filter(candidate => candidate?.isPreferred)
            .length;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Split the description into an array alternating between description and hotkey (starting with a description)
    //------------------------------------------------------------------------------------------------------------------

    private splitDescription(description: string, hotkeyPositions: number[]) {
        const result = new Array<{ text: string; isHotkey: boolean }>();
        result.push({ text: description.substring(0, hotkeyPositions[0]), isHotkey: false });
        hotkeyPositions.forEach((hotkeyPosition, index) => {
            result.push({
                text: description.substring(hotkeyPosition, hotkeyPosition + 1),
                isHotkey: true,
            });
            const nextIndex = index + 1 < hotkeyPositions.length ? hotkeyPositions[index + 1] : description.length;
            result.push({ text: description.substring(hotkeyPosition + 1, nextIndex), isHotkey: false });
        });
        return result.filter(item => item.text);
    }
}
