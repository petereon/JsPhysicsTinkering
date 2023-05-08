import { Composite, Engine, Runner } from "matter-js";
import { Application } from "pixi.js";
import { PhysicsBody, RectangleBody } from "./Body";

export class PhysicsApp extends Application{

    engine: Engine
    runner: Runner
    bodies: PhysicsBody[]

    constructor(options?: object, bodies: PhysicsBody[] = []){
        super(options)
        this.engine = Engine.create();
        this.bodies = bodies;
        Composite.add(this.engine.world, bodies.map(body => body.physicsBody));
        bodies.forEach(body => this.stage.addChild(body));
        this.runner = Runner.create();
    }

    update(){
        Runner.tick(this.runner, this.engine, 1000 / 60);
        this.bodies.forEach(body => body.update());
    }

    addBody(body: RectangleBody){
        this.bodies.push(body);
        Composite.add(this.engine.world, body.physicsBody);
        this.stage.addChild(body);
    }


}