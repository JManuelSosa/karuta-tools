import { StatEffect, StatKey } from "../types";

export class Reward {
    
    private readonly effects:StatEffect[];

    constructor(effects:StatEffect[]){
        this.effects = effects;
    }

    getEffects():StatEffect[] {
        return [...this.effects];
    }

    getEffectFor(stat:StatKey):number {

        const effect = this.effects.find(e => e.stat === stat);
        return effect ? effect.amount : 0;
    }

    hasEffect(stat:StatKey):boolean {
        return this.effects.some( e => e.stat === stat);
    }

    isPositiveOnly():boolean {
        return this.effects.every(e => e.amount > 0);
    }

    toString():string {
        return this.effects.map(e => `${e.amount > 0 ? "+" : ""}${e.amount} ${e.stat}`).join(', ');
    }

}