import { LocationID, LocationCategory } from "../enums";

export class LocationType {

    public readonly id:LocationID;
    public readonly category:LocationCategory;
    public readonly emoji:string;

    constructor(id:LocationID, category:LocationCategory, emoji:string){
        this.id = id;
        this.category = category;
        this.emoji = emoji;
    }

    isRegular():boolean {
        return this.category === LocationCategory.REGULAR;
    }

    isObstacle():boolean {
        return this.category === LocationCategory.OBSTACLE;
    }

    isSpecial():boolean {
        return this.category === LocationCategory.SPECIAL;
    }

    isHome():boolean {
        return this.id === LocationID.HOME;
    }

    isMall():boolean {
        return this.id === LocationID.SHOPPING_MALL;
    }

    isJewerlyStore():boolean {
        return this.id === LocationID.JEWELRY_STORE;
    }

    isAirport():boolean {
        return this.id === LocationID.AIRPORT;
    }

    toString():string {
        return `${this.emoji} ${this.id}`;
    }
}