export class StatValue {

    private readonly value:number;

    constructor(value:number){

        if(value < 0) throw new Error("StatValue no puede ser negativo");
        if(value > 100) throw new Error("StatValue no puede superar 100");

        this.value = value;
    }

    getValue():number {
        return this.value;
    }

    isAlive():boolean {
        return this.value > 0;
    }

    isDepleted():boolean {
        return this.value === 0;
    }

    subtract(amount:number):StatValue {
        const result = Math.max(0, this.value - amount);
        return new StatValue(result);
    }

    add(amount:number):StatValue {
        const result = Math.min(100, this.value + amount);
        return new StatValue(result);
    }


}