import { ILocation } from "./ILocation";

export interface ISpecialLocation extends ILocation {
    readonly hasBeenUsed:boolean;
    markAsUsed():void;
}