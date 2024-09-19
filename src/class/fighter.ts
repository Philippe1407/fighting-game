import { background } from "../component/background";
import { Sprite } from "./sprite";

const gravity = 0.5;

type TSprite = {
  imgSrc: string;
  maxFrame: number;
};

type TFighter = {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  color: string;
  imageSrc: string;
  framesMax: number;
  scale?: number;
  offset?: { x: number; y: number };
  isFacingRight?: boolean;
  sprites: {
    idle?: TSprite;
    run?: TSprite;
    jump?: TSprite;
    fall?: TSprite;
    attack?: TSprite[];
    damaged?: TSprite;
    death?: TSprite;
  };
};

export class Fighter extends Sprite {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  isJumping: boolean;
  hitBox: {
    position: { x: number; y: number };
    width: number;
    height: number;
  };
  color: string;
  isAttacking: boolean;
  attackFrame: number;
  getHitTiming: number;
  isTakingDamage: boolean;
  isFacingRight: boolean;
  isDeath: boolean;
  sprites: {
    idle?: TSprite;
    run?: TSprite;
    jump?: TSprite;
    fall?: TSprite;
    attack?: TSprite[];
    damaged?: TSprite;
    death?: TSprite;
  };
  constructor({
    position,
    velocity,
    color,
    framesMax,
    imageSrc,
    scale,
    offset,
    sprites,
    isFacingRight = true,
  }: TFighter) {
    super({ position, imageSrc, framesMax, scale, offset });
    this.position = position;
    this.velocity = velocity;
    this.isJumping = true;
    this.hitBox = {
      position: { x: this.position.x, y: this.position.y },
      width: 75 * this.scale,
      height: 50 * this.scale,
    };
    this.color = color;
    this.isAttacking = false;
    this.getHitTiming = 0;
    this.sprites = sprites;
    this.attackFrame = 0;
    this.isTakingDamage = false;
    this.isFacingRight = isFacingRight;
    this.isDeath = false;
  }

  currentSprites() {
    if (this.isDeath) return this.sprites?.death;
    if (this.isTakingDamage) return this.sprites?.damaged;
    if (this.isAttacking) return this.sprites.attack?.[this.attackFrame];
    if (this.velocity.y < 0) return this.sprites?.jump;
    if (this.velocity.y > 0) return this.sprites?.fall;
    if (this.velocity.x !== 0) return this.sprites?.run;
    return this.sprites?.idle;
  }
  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);

    const currentSprite = this.currentSprites();

    if (
      currentSprite?.imgSrc &&
      !this.image.src.includes(currentSprite?.imgSrc)
    ) {
      this.image.src = currentSprite?.imgSrc;
      this.framesMax = currentSprite?.maxFrame;
    }
    if (
      this.position.y + this.image.height * this.scale + this.velocity.y >
      background.image.height
    ) {
      this.velocity.y = 0;
      this.isJumping = false;
    } else {
      this.velocity.y += gravity;
    }

    if (
      this.position.x +
        (this.offset.x + this.width) * this.scale +
        this.velocity.x >
        background.image.width ||
      this.position.x + this.offset.x * this.scale + this.velocity.x < 0
    ) {
      this.velocity.x = 0;
    }

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    this.hitBox.position = {
      x:
        this.reverse !== !this.isFacingRight
          ? this.position.x + this.offset.x * this.scale - this.hitBox.width
          : this.position.x + (this.offset.x + this.width) * this.scale,
      y: this.position.y + this.offset.y * this.scale,
    };

    // if (this.isAttacking) {
    // ctx.fillStyle = "green";
    // ctx.fillRect(
    //   this.hitBox.position.x,
    //   this.hitBox.position.y,
    //   this.hitBox.width,
    //   this.hitBox.height
    // );
    // }
    if (this.currentSprites()?.imgSrc === this.sprites?.death?.imgSrc) {
      this.animateOnce();
    } else this.animateFrames();
  }

  moveX(x: number) {
    this.velocity.x = x;
    if (x > 0) this.reverse = true;
    if (x < 0) this.reverse = false;
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
    this.currentFrame = 0;
    this.frameHold = 5;
    setTimeout(() => {
      this.isAttacking = false;
      this.frameHold = 20;
      this.attackFrame =
        (this.attackFrame + 1) % (this.sprites.attack?.length || 1);
    }, 375);
  }

  takeDamage() {
    this.isTakingDamage = true;
    setTimeout(() => {
      this.isTakingDamage = false;
    }, 300);
  }

  death() {
    this.isDeath = true;
  }
}
