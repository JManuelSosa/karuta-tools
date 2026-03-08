import { describe, it, expect } from "vitest";
import { GameState } from "../../../domain/entities/GameState";
import { GameMap } from "../../../domain/entities/GameMap";
import { Position } from "../../../domain/value-objects";
import { StatValue } from "../../../domain/value-objects";
import { Stats } from "../../../domain/types";
import { LocationType } from "../../../domain/value-objects";
import { LocationID, LocationCategory } from "../../../domain/enums";
import { RegularLocation } from "../../../domain/entities/RegularLocation";
import { Reward } from "../../../domain/value-objects";
import { DIRECTION } from "../../../domain/types";
import { STAT_KEY } from "../../../domain/types";
import { GAME_RESULT } from "../../../domain/types";

//? Helpers

function makeStats(overrides:Partial<Record<keyof Stats, number>> = {}):Stats {
    return {
        gas: new StatValue(overrides.gas ?? 100),
        food: new StatValue(overrides.food ?? 50),
        drink: new StatValue(overrides.drink ?? 50),
        entertainment: new StatValue(overrides.entertainment ?? 75),
        time: new StatValue(overrides.time ?? 100)
    }
}

function makeMap():GameMap {

    const initialPosition = new Position(2, 7, DIRECTION.RIGHT);
    const locationType = new LocationType(LocationID.GAS_STATION, LocationCategory.REGULAR, '⛽');
    const reward = new Reward([{ stat:STAT_KEY.GAS, amount:100 }]);
    const location = new RegularLocation(new Position(1, 6, DIRECTION.RIGHT), locationType, reward);

    return new GameMap("test-hash", initialPosition, [location]);
}

function makeState(statsOverrides:Partial<Record<keyof Stats, number>> = {}): GameState {

    const stats = makeStats(statsOverrides);
    const position = new Position(2, 7, DIRECTION.RIGHT);
    const map = makeMap();

    return new GameState(stats, position, map);
}

// ~ Test

describe("GameState", () => {

    describe("Estado inicial", () =>{

        it("Debe iniciar como ongoing", () => {
            expect(makeState().isOngoing()).toBe(true);
        });

        it("Debe iniciar en turnsElapsed en 0", () => {
            expect(makeState().turnsElapsed).toBe(0);
        })
    });

    describe("applyMoveCost", () => {

        it("Debe restar correctamente todas las stats", () => {
            const state = makeState().applyMoveCost();
            expect(state.stats.gas.getValue()).toBe(90);
            expect(state.stats.food.getValue()).toBe(46);
            expect(state.stats.drink.getValue()).toBe(44);
            expect(state.stats.entertainment.getValue()).toBe(67);
            expect(state.stats.time.getValue()).toBe(96);
        });

        it("Debe incrementar turnsElapsed", () => {
            expect(makeState().applyActionCost().turnsElapsed).toBe(1);
        });

        it("Debe ser inmutable", () => {
            const state = makeState();
            state.applyMoveCost();
            expect(state.stats.gas.getValue()).toBe(100);
        });
    });

    describe("applyActionCost", () => {

        it("No debe restar gas", () => {
            const state = makeState().applyActionCost();
            expect(state.stats.gas.getValue()).toBe(100);
        });
        
        it("Debe restar a food, drink, entertainment y time", () => {
            const state = makeState().applyActionCost();
            expect(state.stats.food.getValue()).toBe(46);
            expect(state.stats.drink.getValue()).toBe(44);
            expect(state.stats.entertainment.getValue()).toBe(67);
            expect(state.stats.time.getValue()).toBe(96);
        });

        it("Debe incrementar turnsElapsed", () => {
            expect(makeState().applyActionCost().turnsElapsed).toBe(1);
        });
    });

    describe("calculateResult - victoria", () => {

        it("Debe detectar victoria cuando time llegue a 0", () => {
            const state = makeState({ time: 4 }).applyMoveCost();
            expect(state.hasWon()).toBe(true);
        })
    });

    describe("calculateResult - derrota", () => {

        it("Debe detectar derrota cuando gas llega a 0", () => {
            const state = makeState({ gas: 10 }).applyMoveCost();
            expect(state.hasLost()).toBe(true);
        })

        it("Debe detectar derrota cuando food llega a 0", () => {
            const state = makeState({ food: 4 }).applyMoveCost();
            expect(state.hasLost()).toBe(true);
        })

        it("Debe detectar derrota cuando drink llega a 0", () => {
            const state = makeState({ drink: 4 }).applyMoveCost();
            expect(state.hasLost()).toBe(true);
        })

        it("Debe detectar derrota cuando entertainment llega a 0", () => {
            const state = makeState({ entertainment: 8 }).applyMoveCost();
            expect(state.hasLost()).toBe(true);
        })
    });

    describe("calculateResult - ongoing", () => {

        it("Debe seguir ongoing si todas las stats estan arriba de 0", () => {
            expect(makeState().applyMoveCost().isOngoing()).toBe(true);
        });
    });

    describe("endEarly", () => {

        it("Debe marcar el estado como early_end", () => {
            const state = makeState().endEarly();
            expect(state.result).toBe(GAME_RESULT.EARLY_END);
        });

        it("Debe ser inmutable", () => {
            const state = makeState();
            state.endEarly();
            expect(state.isOngoing()).toBe(true);
        });
    });

    describe("clone", () => {

        it("Debe producir una copia con los mismos valores", () => {
            const state = makeState();
            const cloned = state.clone();
            expect(cloned.stats.gas.getValue()).toBe(state.stats.gas.getValue());
            expect(cloned.turnsElapsed).toBe(state.turnsElapsed);
            expect(cloned.result).toBe(state.result);
        });

        it("El clon debe de ser independiente del original", () => {
            const state = makeState();
            const cloned = state.clone();
            const modified = cloned.applyMoveCost();

            expect(state.stats.gas.getValue()).toBe(100);
            expect(modified.stats.gas.getValue()).toBe(90);
            expect(modified.stats.gas.getValue()).not.toBe(state.stats.gas.getValue());
        });
    });

    describe("moveTo", () => {

        it("Debe actualizar la posición correctamente", () => {
            const state = makeState();
            const moved = state.moveTo(DIRECTION.UP);
            expect(moved.position.facing).toBe(DIRECTION.UP);
        });

        it("No debe incrementar turnsElaapsed", () => {
            const state = makeState();
            expect(state.moveTo("up").turnsElapsed).toBe(0);
        });
    });

});