export const DIRECTION = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
} as const;

export const ORIENTATION = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal"
} as const;


export type Direction = typeof DIRECTION[keyof typeof DIRECTION];
export type Orientation = typeof ORIENTATION[keyof typeof ORIENTATION]

export type OppositeDirection = {
    [K in Direction]:Direction
};

export const OPPOSITE_DIRECTION: OppositeDirection = {
    [DIRECTION.UP]: DIRECTION.DOWN,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.LEFT]: DIRECTION.RIGHT
} as const;