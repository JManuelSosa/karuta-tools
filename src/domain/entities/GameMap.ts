import { Position } from "../value-objects";
import { ILocation } from "../interfaces";
import { IRegularLocation } from "../interfaces";
import { ISpecialLocation } from "../interfaces";

export class GameMap {

    private readonly locations: Map<string, ILocation>;
    public readonly imageHash:string;
    public readonly initialPosition: Position;

    constructor(imgHash:string, initialPosition:Position, locations:ILocation[]){

        this.imageHash = imgHash;
        this.initialPosition = initialPosition;
        this.locations = new Map(locations.map( loc => [this.positionKey(loc.position), loc]));
    }

    private positionKey(position:Position):string {
        return `${position.x},${position.y}`;
    }

    getLocationAt(position:Position): ILocation | undefined {
        return this.locations.get(this.positionKey(position));
    }

    hasLocationAt(position:Position):boolean {
        return this.locations.has(this.positionKey(position));
    }

    getVisitableLocations(): ILocation[] {
        return [...this.locations.values()].filter( loc => loc.isVisitable());
    }

    getRegularLocations(): IRegularLocation[] {
        return [...this.locations.values()].filter((loc):loc is IRegularLocation => loc.type.isRegular());
    }

    getSpecialLocations(): ISpecialLocation[] {
        return [...this.locations.values()].filter( (loc): loc is ISpecialLocation => loc.type.isSpecial());
    }

    decrementAllCooldowns(): void {
        this.getRegularLocations().forEach( loc => loc.decrementCooldown());
    }

    clone(): GameMap {
        const clonedLocations = [... this.locations.values()].map(loc => loc.clone());
        
        return new GameMap(this.imageHash, this.initialPosition, clonedLocations);
    }

}