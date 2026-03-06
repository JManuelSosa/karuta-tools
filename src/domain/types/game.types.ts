import { StatValue } from "../value-objects";
import { StatKey } from "./stats.types";

export const GAME_RESULT = {
    ONGOING: "ongoing",
    VICTORY: "victory",
    DEFEAT: "defeat",
    EARLY_END: "early_end"
} as const;


export type GameResult = typeof GAME_RESULT[keyof typeof GAME_RESULT];

export interface Stats extends Record<StatKey, StatValue> {}