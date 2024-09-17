type TSprite = {
  position: { x: number; y: number };
  imageSrc: string;
  height?: number;
  width?: number;
  scale?: number;
  framesMax?: number;
  offset?: { x: number; y: number };
  reverse?: boolean;
};

export class Sprite {
  position: { x: number; y: number };
  image: HTMLImageElement;
  height: number;
  width: number;
  scale: number;
  framesMax: number;
  currentFrame: number;
  frameElapsed: number;
  frameHold: number;
  offset: { x: number; y: number };
  reverse?: boolean;
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    reverse,
  }: TSprite) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = (this.image.width / framesMax - 2 * offset.x) * scale;
    this.height = (this.image.height - 2 * offset.y) * scale;
    this.scale = scale;
    this.currentFrame = 0;
    this.framesMax = framesMax;
    this.frameElapsed = 0;
    this.frameHold = 20;
    this.offset = offset;
    this.reverse = reverse;
  }

  animateFrames() {
    this.frameElapsed++;
    if (this.frameElapsed % this.frameHold === 0)
      this.currentFrame = (this.currentFrame + 1) % this.framesMax;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = "white";
    // ctx.fillRect(
    //   this.position.x + this.offset.x * this.scale,
    //   this.position.y + this.offset.y * this.scale,
    //   this.width * this.scale,
    //   this.height * this.scale
    // );
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   (this.image.width / this.framesMax) * this.scale,
    //   this.image.height * this.scale
    // );
    if (this.reverse) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate((-this.image.width / this.framesMax) * this.scale, 0);
    }
    ctx.drawImage(
      this.image,
      (this.currentFrame * this.image.width) / this.framesMax,
      0,
      this.image.width / this.framesMax,
      this.image.height,
      (this.reverse ? -1 : 1) * this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );

    if (this.reverse) ctx.restore();
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.animateFrames();
  }
}
