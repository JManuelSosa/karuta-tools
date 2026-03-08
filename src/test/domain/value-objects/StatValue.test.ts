import { describe, it, expect } from "vitest";
import { StatValue } from "../../../domain/value-objects";

describe('StatValue', () => {

    describe('constructor', () => {
        
        it("Debe crear un valor válido", () => {
            const stat = new StatValue(50);
            expect(stat.getValue()).toBe(50);
        });

        it("Debe lanzar un error si el valor es negativo", () => {
            expect(() => new StatValue(-1)).toThrow();
        });

        it("Debe lanzar un error si el valor supera 100", () => {
            expect(() => new StatValue(101)).toThrow();
        });
    });

    describe("isAlive / isDepleted", () => {

        it("Debe estar vivo si el valor es mayor a 0", () => {
            expect(new StatValue(1).isAlive()).toBe(true);
        });

        it("Debe esta agotado si el valor es 0", () => {
            expect(new StatValue(0).isDepleted()).toBe(true);
        })
    });

    describe("substract", () => {

        it("Debe restar correctamente", () => {
            const stat = new StatValue(50);
            expect(stat.subtract(10).getValue()).toBe(40);
        });

        it("No debe bajar de 0", () => {
            const stat = new StatValue(5);
            expect(stat.subtract(10).getValue()).toBe(0);
        });

        it("Debe ser inmutable", () => {
            const stat = new StatValue(50);
            stat.subtract(10);
            expect(stat.getValue()).toBe(50);
        });
    });

    describe("add", () => {

        it("Debe sumar correctamente", () => {
            const stat = new StatValue(50);
            expect(stat.add(10).getValue()).toBe(60);
        });

        it("No debe superar los 100", () => {
            const stat = new StatValue(95);
            expect(stat.add(10).getValue()).toBe(100);
        });
    });

});