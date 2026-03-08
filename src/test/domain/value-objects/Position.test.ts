import { describe, it, expect } from "vitest";
import { Position } from "../../../domain/value-objects";
import { DIRECTION, ORIENTATION } from "../../../domain/types";

describe("Position", () => {

    describe("constructor", () => {
        
        it("Debe crear una posición horizontal con facing right", () => {
            const pos = new Position(2, 7, DIRECTION.RIGHT);
            expect(pos.x).toBe(2);
            expect(pos.y).toBe(7);
            expect(pos.facing).toBe(DIRECTION.RIGHT);
            expect(pos.orientation).toBe(ORIENTATION.HORIZONTAL);
        });

        it("Debe crear una posición vertical con facing up", () => {
            const pos = new Position(3, 4, DIRECTION.UP);
            expect(pos.orientation).toBe(ORIENTATION.VERTICAL);
        });

        it("Debe lanzar error si x es negativo", () => {
            expect(() => new Position(-1, 0, DIRECTION.RIGHT)).toThrow();
        });

        it("Debe lanzar error si y es negativo", () => {
            expect(() => new Position(0, -1, DIRECTION.RIGHT)).toThrow();
        });
    });

    describe("canMoveTo", () => {

        it("No debe poder ir en una dirección opuesta al facing", () => {
            expect(new Position(2, 7, DIRECTION.RIGHT).canMoveTo(DIRECTION.LEFT)).toBe(false);
            expect(new Position(2, 7, DIRECTION.LEFT).canMoveTo(DIRECTION.RIGHT)).toBe(false);
            expect(new Position(2, 4, DIRECTION.UP).canMoveTo(DIRECTION.DOWN)).toBe(false);
            expect(new Position(2, 4, DIRECTION.DOWN).canMoveTo(DIRECTION.UP)).toBe(false);
        });

        it("Debe poder ir a la misma dirección del facing", () => {
            expect(new Position(2, 7, DIRECTION.RIGHT).canMoveTo(DIRECTION.RIGHT)).toBe(true);
            expect(new Position(2, 7, DIRECTION.LEFT).canMoveTo(DIRECTION.LEFT)).toBe(true);
        });

        it("Debe poder girar 90 grados", () => {
            expect(new Position(2, 7, DIRECTION.RIGHT).canMoveTo(DIRECTION.UP)).toBe(true);
            expect(new Position(2, 7, DIRECTION.RIGHT).canMoveTo(DIRECTION.DOWN)).toBe(true);
        });
    });

    describe("moveTo - recto", () => {

        it("facing right moviéndose a la derecha", () => {

            const pos = new Position(2, 7, DIRECTION.RIGHT).moveTo(DIRECTION.RIGHT);
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(7);
            expect(pos.facing).toBe(DIRECTION.RIGHT);
            expect(pos.orientation).toBe(ORIENTATION.HORIZONTAL);
        });

        it("facing left moviéndose a la izquierda", () => {

            const pos = new Position(2, 7, DIRECTION.LEFT).moveTo(DIRECTION.LEFT);
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(7);
            expect(pos.facing).toBe(DIRECTION.LEFT);
            expect(pos.orientation).toBe(ORIENTATION.HORIZONTAL);
        });

        it("facing up moviéndose hacia arriba", () => {

            const pos = new Position(3, 4, DIRECTION.UP).moveTo(DIRECTION.UP);
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(3);
            expect(pos.facing).toBe(DIRECTION.UP);
            expect(pos.orientation).toBe(ORIENTATION.VERTICAL);
        });

        it("facing down moviéndose hacia abajo", () => {
            
            const pos = new Position(3, 4, DIRECTION.DOWN).moveTo(DIRECTION.DOWN);
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(5);
            expect(pos.facing).toBe(DIRECTION.DOWN);
            expect(pos.orientation).toBe(ORIENTATION.VERTICAL);
        })
    });

    describe("moveTo - giros de 90°", () => {

        it("facing right girando arriba usa vértice derecho", () => {
            
            const pos = new Position(2, 7, DIRECTION.RIGHT).moveTo(DIRECTION.UP);
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(6);
            expect(pos.facing).toBe(DIRECTION.UP);
            expect(pos.orientation).toBe(ORIENTATION.VERTICAL);
        });

        it("facing right girando abajo usa vértice derecho", () => {
            
            const pos = new Position(2, 7, DIRECTION.RIGHT).moveTo(DIRECTION.DOWN);
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(7);
            expect(pos.facing).toBe(DIRECTION.DOWN);
            expect(pos.orientation).toBe(ORIENTATION.VERTICAL);
        });

        it("facing left girando arriba usa vértice izquierdo", () => {
            
            const pos = new Position(2, 7, DIRECTION.LEFT).moveTo(DIRECTION.UP);
            expect(pos.x).toBe(2);
            expect(pos.y).toBe(6);
            expect(pos.facing).toBe(DIRECTION.UP);
            expect(pos.orientation).toBe(ORIENTATION.VERTICAL);
        });

        it("facing left girando abajo usa vértice izquierdo", () => {
            
            const pos = new Position(2, 7, DIRECTION.LEFT).moveTo(DIRECTION.DOWN);
            expect(pos.x).toBe(2);
            expect(pos.y).toBe(7);
            expect(pos.facing).toBe(DIRECTION.DOWN);
            expect(pos.orientation).toBe(ORIENTATION.VERTICAL);
        });

        it("facing up girando a la derecha usa vértice superior", () => {

            const pos = new Position(3, 4, DIRECTION.UP).moveTo(DIRECTION.RIGHT);
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(4);
            expect(pos.facing).toBe(DIRECTION.RIGHT);
            expect(pos.orientation).toBe(ORIENTATION.HORIZONTAL);
        });

        it("facing up girando a la izquierda usa vértice superior", () => {

            const pos = new Position(3, 4, DIRECTION.UP).moveTo(DIRECTION.LEFT);
            expect(pos.x).toBe(2);
            expect(pos.y).toBe(4);
            expect(pos.facing).toBe(DIRECTION.LEFT);
            expect(pos.orientation).toBe(ORIENTATION.HORIZONTAL);
        });

        it("facing down girando a la derecha usa vértice inferior", () => {

            const pos = new Position(3, 4, DIRECTION.DOWN).moveTo(DIRECTION.RIGHT);
            expect(pos.x).toBe(3);
            expect(pos.y).toBe(5);
            expect(pos.facing).toBe(DIRECTION.RIGHT);
            expect(pos.orientation).toBe(ORIENTATION.HORIZONTAL);
        });

        it("facing down girando a la izquierda usa vértice inferior", () => {

            const pos =  new Position(3, 4, DIRECTION.DOWN).moveTo(DIRECTION.LEFT);
            expect(pos.x).toBe(2);
            expect(pos.y).toBe(5);
            expect(pos.facing).toBe(DIRECTION.LEFT);
            expect(pos.orientation).toBe(ORIENTATION.HORIZONTAL);
        });
    });

    describe("moveTo - movimiento inválido", () => {
        
        it("Debe lanzar error al intentar ir en dirección opuesta", () => {
            expect(() => new Position(2, 7, DIRECTION.RIGHT).moveTo(DIRECTION.LEFT)).toThrow();
        });
    });
    
});