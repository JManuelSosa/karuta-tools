import { Position } from "../value-objects";
import { Reward } from "../value-objects";
import { LocationType } from "../value-objects";
import { ILocation, IRegularLocation } from "../interfaces";

export class RegularLocation implements IRegularLocation {

    private cooldownTurnsRemaining:number = 0;
    public readonly position: Position;
    public readonly type: LocationType;
    public readonly reward: Reward;

    constructor(position:Position, type:LocationType, reward:Reward){
        this.position = position;
        this.type = type;
        this.reward = reward;
    }

    isVisitable(): boolean {
        return this.cooldownTurnsRemaining === 0;
    }

    isOnCooldown(): boolean {
        return this.cooldownTurnsRemaining > 0;
    }

    applyCooldown(turns:number = 10): void {
        this.cooldownTurnsRemaining = turns;
    }

    decrementCooldown(): void {
        if(this.cooldownTurnsRemaining > 0) this.cooldownTurnsRemaining--;
    }

    getCooldownRemaining(): number {
        return this.cooldownTurnsRemaining;
    }


    clone(): ILocation {
        const cloned = new RegularLocation(this.position, this.type, this.reward);
        cloned.cooldownTurnsRemaining = this.cooldownTurnsRemaining;

        return cloned;
    }

}