import { Direction, OPPOSITE_DIRECTION, Orientation, DIRECTION, ORIENTATION } from "../types";

export class Position {

    public readonly x:number;
    public readonly y:number;
    public readonly facing:Direction;
    public readonly orientation:Orientation;

    constructor(x:number, y:number, facing:Direction) {
        if(x < 0) throw new Error('Position X no puede ser negativo');
        if(y < 0) throw new Error('Position Y no puede ser negativo');
        
        this.x = x;
        this.y = y;
        this.facing = facing;

        const isInHorizontal:boolean = facing === DIRECTION.RIGHT || facing === DIRECTION.LEFT;
        this.orientation = isInHorizontal ? ORIENTATION.HORIZONTAL : ORIENTATION.VERTICAL
    }

    isHorizontal():boolean {
        return this.orientation === ORIENTATION.HORIZONTAL;
    }

    isVertical():boolean {
        return this.orientation === ORIENTATION.VERTICAL;
    }

    canMoveTo(direction:Direction):boolean {
        return direction !== OPPOSITE_DIRECTION[this.facing];
    }

    moveTo(direction:Direction): Position {

        if(!this.canMoveTo(direction)) throw new Error(`Movimiento inválido: no puedes ir ${direction} desde facing ${this.facing}`);

        if(direction === this.facing) return this.moveStraight(direction);
        
        return this.moveTurn(direction)
    }

    private moveStraight(direction:Direction):Position {

        const { x,y } = this;

        const movements:Record<Direction, Position> = {
            [DIRECTION.RIGHT]: new Position(x + 1, y,DIRECTION.RIGHT),
            [DIRECTION.LEFT]: new Position(x - 1, y, DIRECTION.LEFT),
            [DIRECTION.UP]: new Position(x, y - 1, DIRECTION.UP),
            [DIRECTION.DOWN]: new Position(x, y + 1, DIRECTION.DOWN)
        }

        return movements[direction];
    }

    private moveTurn(direction:Direction): Position {
        const { x, y, facing } = this;
        
        if(this.isHorizontal()) return this.moveTurnFromHorizontal(x, y, facing, direction);

        return this.moveTurnFromVertical(x, y, facing, direction);
    }

    private moveTurnFromHorizontal(x:number, y:number, facing:Direction, direction:Direction):Position {
        const lx = facing === DIRECTION.RIGHT ? x + 1 : x;

        if(direction === DIRECTION.UP) return new Position(lx, y - 1, DIRECTION.UP);

        return new Position(lx, y, DIRECTION.DOWN);
    }

    private moveTurnFromVertical(x:number, y:number, facing:Direction, direction:Direction):Position {
        const ly = facing === DIRECTION.UP ? y : y + 1;

        if(direction === DIRECTION.LEFT) return new Position(x - 1, ly, DIRECTION.LEFT);

        return new Position(x, ly, DIRECTION.RIGHT);
    }

    toString():String {
        return `(${this.x},${this.y}) ${this.orientation} facing:${this.facing}`;
    }
}