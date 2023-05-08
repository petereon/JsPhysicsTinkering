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
        this.anchor.set(0.5);
        this.update()
    }

    update() {
        this.position.set(this.physicsBody.position.x, this.physicsBody.position.y);
        console.log(this.physicsBody.angle)
        this.rotation = Math.round(this.physicsBody.angle * 100)/100;
    }
}