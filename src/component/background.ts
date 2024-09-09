import { Sprite } from "../class/sprite";
import backgroundSrc from "../assets/background.png";

export const background = new Sprite(
  { x: 0, y: 0 },
  backgroundSrc,
  window.innerWidth,
  window.innerHeight
);
