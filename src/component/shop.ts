import { Sprite } from "../class/sprite";
import shopSrc from "../assets/shop.png";

export const shop = new Sprite({
  position: {
    x: 625,
    y: 125,
  },
  imageSrc: shopSrc,
  width: 600,
  height: 200,
  scale: 2.75,
  framesMax: 6,
});
