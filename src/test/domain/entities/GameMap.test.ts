import { describe, it, expect } from "vitest";
import { GameMap } from "../../../domain/entities/GameMap";
import { RegularLocation } from "../../../domain/entities/RegularLocation";
import { SpecialLocation } from "../../../domain/entities/SpecialLocation";
import { Position } from "../../../domain/value-objects";
import { LocationCategory, LocationID } from "../../../domain/enums";
import { LocationType } from "../../../domain/value-objects";
import { Reward } from "../../../domain/value-objects";
import { STAT_KEY } from "../../../domain/types";
import { DIRECTION } from "../../../domain/types";

//? Helpers

function makeRegularLocation(x:number, y:number):RegularLocation {

    const type = new LocationType(LocationID.GAS_STATION, LocationCategory.REGULAR, '⛽');
    const reward = new Reward([{ stat:STAT_KEY.GAS, amount:100 }]);
    const position = new Position(x, y, DIRECTION.RIGHT);

    return new RegularLocation(position, type, reward);
}

function makeSpecialLocation(x:number, y:number):SpecialLocation {

    const type = new LocationType(LocationID.HOME, LocationCategory.SPECIAL, '🏠');
    const position = new Position(x, y, DIRECTION.RIGHT);
    return new SpecialLocation(position, type);
}

function makeMap():GameMap {
    return new GameMap("test-hash", new Position(2, 7, DIRECTION.RIGHT), [
        makeRegularLocation(1, 2),
        makeRegularLocation(3, 4),
        makeSpecialLocation(2, 5),
    ]);
}


//~ Test

describe("Game Map", () => {

    describe("getLocationAt", () => {
        
        it("Debe encontrar una location existente", () => {
            const map = makeMap();
            const loc = map.getLocationAt(new Position(1, 2, DIRECTION.RIGHT));
            expect(loc).toBeDefined();
        });

        it("Debe retornar undefined para una posicion sin locación", () => {
            const map = makeMap();
            expect(map.getLocationAt(new Position(0, 0, DIRECTION.RIGHT))).toBeUndefined();
        });

        it("Debe encontrar la locación independientemente del facing", () => {
            const map = makeMap();
            const loc1 = map.getLocationAt(new Position(1, 2, DIRECTION.RIGHT));
            const loc2 = map.getLocationAt(new Position(1, 2, DIRECTION.UP));
            expect(loc1).toBeDefined();
            expect(loc2).toBeDefined();
        });
    });

    describe("getVisitableLocations", () => {

        it("Debe retornar todas las locaciones visitables inicialmente", () => {
            expect(makeMap().getVisitableLocations()).toHaveLength(3);
        });

        it("Debe excluir locaciones en cooldown", () => {
            const map = makeMap();
            const loc = map.getLocationAt(new Position(1, 2, DIRECTION.RIGHT)) as RegularLocation;
            loc.applyCooldown();
            expect(map.getVisitableLocations()).toHaveLength(2);
        });

        it("Debe excluir locaciones especiales ya usadas", () => {
            const map = makeMap();
            const loc = map.getLocationAt(new Position(2, 5, DIRECTION.RIGHT)) as SpecialLocation;
            loc.markAsUsed();
            expect(map.getVisitableLocations()).toHaveLength(2);
        });
    });

    describe("decrementAllCooldowns", () => {

        it("Debe decrementar el cooldown de todas las locaciones regulares", () => {
            const map = makeMap();
            const loc = map.getLocationAt(new Position(1, 2, DIRECTION.RIGHT)) as RegularLocation;
            loc.applyCooldown();
            map.decrementAllCooldowns();
            expect(loc.getCooldownRemaining()).toBe(9);
        });

        it("Debe hacer visitable una locación cuando cooldown llega a 0", () => {
            const map = makeMap();
            const loc = map.getLocationAt(new Position(1, 2, DIRECTION.RIGHT)) as RegularLocation;
            loc.applyCooldown(1);
            map.decrementAllCooldowns();
            expect(loc.isVisitable()).toBe(true);
        });
    });

    describe("clone", () => {

        it("Debe producir un mapa con el mismo hash", () => {
            const map = makeMap();
            expect(map.clone().imageHash).toBe("test-hash");
        });

        it("El clon debe ser independiente del original", () => {
            const map = makeMap();
            const cloned = map.clone();
            const loc = cloned.getLocationAt(new Position(1, 2, DIRECTION.RIGHT)) as RegularLocation;
            loc.applyCooldown();

            const originalLoc = map.getLocationAt(new Position(1, 2, DIRECTION.RIGHT)) as RegularLocation;
            expect(originalLoc.isVisitable()).toBe(true);
        });

        it("Debe mantener el mismo número de locaciones", () => {
            const map = makeMap();
            expect(map.clone().getVisitableLocations()).toHaveLength(3);
        });
    });

});