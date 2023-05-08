import { Bodies, Body } from "matter-js";
import { Sprite } from "pixi.js";

export abstract class PhysicsBody extends Sprite {
    abstract physicsBody: Body
    abstract update(): void
}


export class RectangleBody extends PhysicsBody {
    physicsBody: Body

    constructor(options: {x: number, y: number, height: number, width: number, properties?: object, texture?: any}) {
        super(options.texture)
        this.physicsBody = Bodies.rectangle(options.x, options.y, options.width, options.height, options.properties);
        this.width = options.width;
        this.height = options.height;
        this.update()
    }

    update() {
        this.x = this.physicsBody.position.x;
        this.y = this.physicsBody.position.y;
        this.rotation = this.physicsBody.angle;
    }
}