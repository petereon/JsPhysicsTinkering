import './style.css'
import typescriptLogo from './typescript.svg'


import { Assets } from 'pixi.js';
import { RectangleBody } from './Body';
import { PhysicsApp } from './PhysicsApp';

const app = new PhysicsApp({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000
});

document.querySelector<HTMLDivElement>('#app')?.appendChild(app.view as HTMLCanvasElement);

const texture = await Assets.load(typescriptLogo);

const logo = new RectangleBody({x: 100, y: 100, height: 100, width: 100, texture: texture});
const ground = new RectangleBody({x: window.innerHeight - 100, y: window.innerHeight - 100, width: window.innerWidth, height: 10, properties: { isStatic: true }});

app.addBody(logo);
app.addBody(ground);

app.ticker.add(() => {
  app.update();
});
