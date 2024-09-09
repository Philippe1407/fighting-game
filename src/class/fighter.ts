import { groundRatio } from "../utils/constant";

const gravity = 0.3;

export class Fighter {
  public position: { x: number; y: number };
  private velocity: { x: number; y: number };
  public height: number;
  public width: number;
  private isJumping: boolean;
  public hitBox: {
    position: { x: number; y: number };
    width: number;
    height: number;
  };
  private color: string;
  public isAttacking: boolean;
  private facingRight: boolean;
  public getHitTiming: number;
  constructor(
    position: { x: number; y: number },
    velocity: { x: number; y: number },
    color: string,
    facingRight: boolean
  ) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.isJumping = false;
    this.hitBox = {
      position: facingRight
        ? this.position
        : { x: this.position.x + this.width - 100, y: this.position.y },
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
    this.facingRight = facingRight;
    this.getHitTiming = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y > 480) {
      this.velocity.y = 0;
      this.isJumping = false;
    } else {
      this.velocity.y += gravity;
    }
    if (this.isAttacking) {
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.facingRight
          ? this.hitBox.position.x
          : this.hitBox.position.x + this.width - this.hitBox.width,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      );
    }
  }

  moveX(x: number) {
    this.velocity.x = x;
    if (x > 0) this.facingRight = true;
    if (x < 0) this.facingRight = false;
  }
  moveY(y: number) {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocity.y = y;
    }
  }

  stopX() {
    if (this.velocity.x > 0) this.velocity.x -= 0.5;
    else if (this.velocity.x < 0) this.velocity.x += 0.5;
  }

  attack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
