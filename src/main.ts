import './style.css'
import typescriptLogo from './typescript.svg'
import wall from './wall.jpg'


import { Assets } from 'pixi.js';
import { PhysicsBody, RectangleBody } from './Body';
import { PhysicsApp } from './PhysicsApp';
import Matter from 'matter-js';

const app = new PhysicsApp({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000
});

document.querySelector<HTMLDivElement>('#app')?.appendChild(app.view as HTMLCanvasElement);

const typescriptTexture = await Assets.load(typescriptLogo);
const wallTexture = await Assets.load(wall);

const logo = new RectangleBody({x: 300, y: 100, height: 50, width: 50, properties: {restitution: 0.9}, texture: typescriptTexture});
const ground = new RectangleBody({x: window.innerWidth / 2, y: window.innerHeight - 100, width: window.innerWidth, height: 200, properties: { isStatic: true }, texture: wallTexture});
const leftWall = new RectangleBody({x: 0, y: window.innerHeight / 2, width: 20, height: window.innerHeight, properties: { isStatic: true }, texture: wallTexture}); 
const rightWall = new RectangleBody({x: window.innerWidth, y: window.innerHeight / 2, width: 20, height: window.innerHeight, properties: { isStatic: true }, texture: wallTexture});
const topWall = new RectangleBody({x: window.innerWidth / 2, y: 0, width: window.innerWidth, height: 20, properties: { isStatic: true }, texture: wallTexture});


const keys: { [key: string]: boolean } = {};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});


const keyboardMovement = (movedBody: PhysicsBody) => {
  const speed = 0.005;

  const x = movedBody.physicsBody.position.x
  const y = movedBody.physicsBody.position.y

    if (keys['ArrowLeft'] || keys['a']) {
      Matter.Body.applyForce(movedBody.physicsBody, {x: x, y: y}, { x: -speed, y: 0 });
    }
    if (keys['ArrowUp'] || keys['w']) {
      Matter.Body.applyForce(movedBody.physicsBody, {x: x, y: y}, { x: 0, y: -speed });
    }
    if (keys['ArrowRight'] || keys['d']) {
      Matter.Body.applyForce(movedBody.physicsBody, {x: x, y: y}, { x: speed, y: 0 });
    }
    if (keys['ArrowDown'] || keys['s']) {
      Matter.Body.applyForce(movedBody.physicsBody, {x: x, y: y}, { x: 0, y: speed });
    }
}

app.addBodies(ground, logo, leftWall, rightWall, topWall);

app.ticker.add(() => {
  app.update();
  keyboardMovement(logo)
});
