export class Sprite {
  private position: { x: number; y: number };
  private image: HTMLImageElement;
  private height: number;
  private width: number;
  private scale: number;

  constructor(
    position: { x: number; y: number },
    imageSrc: string,
    width: number,
    height: number,
    scale = 1
  ) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = width;
    this.height = height;
    this.scale = scale;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width * this.scale,
      this.height * this.scale
    );
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
  }
}
