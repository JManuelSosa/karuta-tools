import { STAT_KEY } from "../types";

export const GAME_CONSTANTS = {
    MOVE: {
        [STAT_KEY.GAS]:10,
        [STAT_KEY.FOOD]:4,
        [STAT_KEY.DRINK]:6,
        [STAT_KEY.ENTERTAINMENT]: 8,
        [STAT_KEY.TIME]:4
    },
    ACTION: {
        [STAT_KEY.FOOD]:4,
        [STAT_KEY.DRINK]:6,
        [STAT_KEY.ENTERTAINMENT]: 8,
        [STAT_KEY.TIME]:4
    }
} as const;