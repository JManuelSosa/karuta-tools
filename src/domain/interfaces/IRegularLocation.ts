import { Reward } from "../value-objects";
import { ILocation } from "./ILocation";

export interface IRegularLocation extends ILocation {
    readonly reward:Reward;
    isOnCooldown():boolean;
    applyCooldown(turns?:number):void;
    decrementCooldown():void;
    getCooldownRemaining():number;
}
