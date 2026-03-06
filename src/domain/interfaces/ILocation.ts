import { Position } from "../value-objects";
import { LocationType } from "../value-objects";

export interface ILocation {
    readonly position:Position;
    readonly type:LocationType;
    isVisitable():boolean;
    clone():ILocation;
}