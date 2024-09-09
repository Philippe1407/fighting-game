type TSprite = {
  position: { x: number; y: number };
  imageSrc: string;
  height: number;
  width: number;
  scale?: number;
  framesMax?: number;
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
  constructor({
    position,
    imageSrc,
    width,
    height,
    scale = 1,
    framesMax = 1,
  }: TSprite) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.framesMax = framesMax;
    this.currentFrame = 0;
    this.frameElapsed = 0;
    this.frameHold = 10;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      (this.currentFrame * this.image.width) / this.framesMax,
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.frameElapsed++;
    if (this.frameElapsed % this.frameHold === 0)
      this.currentFrame = (this.currentFrame + 1) % this.framesMax;
  }
}
