export const STAT_KEY = {
    GAS: "gas",
    FOOD: "food",
    DRINK: "drink",
    ENTERTAINMENT: "entertainment",
    TIME: "time"
} as const;

export type StatKey = typeof STAT_KEY[keyof typeof STAT_KEY];

export interface StatEffect {
    stat:StatKey;
    amount:number;
}