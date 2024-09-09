import { Sprite } from "../class/sprite";
import backgroundSrc from "../assets/background.png";

export const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: backgroundSrc,
  width: window.innerWidth,
  height: window.innerHeight,
});
