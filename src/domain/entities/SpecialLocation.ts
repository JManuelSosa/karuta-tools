import { Position } from "../value-objects";
import { LocationType } from "../value-objects";
import { ILocation, ISpecialLocation } from "../interfaces";

export class SpecialLocation implements ISpecialLocation {
    
    private _hasBeenUsed:boolean = false;
    public readonly position: Position;
    public readonly type: LocationType;

    constructor(position:Position, type:LocationType) {
        this.position = position;
        this.type = type;
    }

    get hasBeenUsed():boolean {
        return this._hasBeenUsed;
    }

    isVisitable(): boolean {
        return !this._hasBeenUsed;
    }
    
    markAsUsed(): void {
        this._hasBeenUsed = true;
    }

    clone(): ILocation {
        
        const cloned = new SpecialLocation(this.position, this.type);
        cloned._hasBeenUsed = this._hasBeenUsed;

        return cloned;
    }

}