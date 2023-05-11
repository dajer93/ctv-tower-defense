import { App } from "./App.js";

const DEFAULT_HEIGHT = 1080;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// scale size values to resolution
const precision = HEIGHT / DEFAULT_HEIGHT;

const options = {
  debug: true,
  stage: {
    w: WIDTH,
    h: HEIGHT,
    clearColor: 0x00000000,
    precision,
  },
};

const app = new App(options);

document.body.appendChild(app.stage.getCanvas());
