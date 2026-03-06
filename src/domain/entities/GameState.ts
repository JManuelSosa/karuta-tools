import { GameMap } from "./GameMap"
import { GameResult, Stats, GAME_RESULT, Direction } from "../types"
import { Position } from "../value-objects"
import { GAME_CONSTANTS } from "../constants";

export class GameState {

    private _result: GameResult = GAME_RESULT.ONGOING;
    public readonly stats: Stats;
    public readonly position: Position;
    public readonly map: GameMap;
    public readonly turnsElapsed:number;

    constructor(stats:Stats, position:Position, map:GameMap, turnsElapsed:number = 0) {
        this.stats = stats;
        this.position = position;
        this.map = map;
        this.turnsElapsed = turnsElapsed;
    }

    get result(): GameResult {
        return this._result;
    }

    isOngoing(): boolean {
        return this._result === GAME_RESULT.ONGOING;
    }

    hasLost(): boolean {
        return this._result === GAME_RESULT.DEFEAT;
    }

    hasWon(): boolean {
        return this._result === GAME_RESULT.VICTORY;
    }

    applyMoveCost(): GameState {

        const newStats: Stats = {
            gas: this.stats.gas.subtract(GAME_CONSTANTS.MOVE.GAS),
            food: this.stats.food.subtract(GAME_CONSTANTS.MOVE.FOOD),
            drink: this.stats.drink.subtract(GAME_CONSTANTS.MOVE.DRINK),
            entertainment:this.stats.entertainment.subtract(GAME_CONSTANTS.MOVE.ENTERTAINMENT),
            time: this.stats.time.subtract(GAME_CONSTANTS.MOVE.TIME)
        };

        const newState = new GameState(newStats,this.position,this.map,this.turnsElapsed + 1);
        newState._result = newState.calculateResult();
        
        return newState;
    }

    applyActionCost(): GameState {
        const newStats: Stats = {
            gas:  this.stats.gas,
            food: this.stats.food.subtract(GAME_CONSTANTS.ACTION.FOOD),
            drink: this.stats.drink.subtract(GAME_CONSTANTS.ACTION.DRINK),
            entertainment: this.stats.entertainment.subtract(GAME_CONSTANTS.ACTION.ENTERTAINMENT),
            time: this.stats.time.subtract(GAME_CONSTANTS.ACTION.TIME)
        };

        const newState = new GameState(newStats,this.position,this.map,this.turnsElapsed + 1);
        newState._result = newState.calculateResult()
        
        return newState
    }

    moveTo(direction: Direction): GameState {

        const newPosition = this.position.moveTo(direction);
        const newMap = this.map.clone();
        newMap.decrementAllCooldowns();

        return new GameState(this.stats, newPosition, newMap, this.turnsElapsed);
    }

    endEarly(): GameState {
        const newState = this.clone();
        newState._result = GAME_RESULT.EARLY_END;
        return newState;
    }

    private calculateResult(): GameResult {
        if (this.stats.time.isDepleted()) return GAME_RESULT.VICTORY;
        if (this.stats.gas.isDepleted() || this.stats.food.isDepleted() || this.stats.drink.isDepleted() || this.stats.entertainment.isDepleted()) return GAME_RESULT.DEFEAT;

        return GAME_RESULT.ONGOING;
    }

    clone(): GameState {
        const newState = new GameState({ ...this.stats }, this.position, this.map.clone(), this.turnsElapsed);
        newState._result = this._result;

        return newState;
    }
}