import { Fighter } from "../class/fighter";
import enemyAttack1 from "../assets/kenji/Attack1.png";
import enemyAttack2 from "../assets/kenji/Attack2.png";
import enemyIdle from "../assets/kenji/Idle.png";
import enemyRun from "../assets/kenji/Run.png";
import enemyJump from "../assets/kenji/Jump.png";
import enemyFall from "../assets/kenji/Fall.png";
import enemyHit from "../assets/kenji/Take hit.png";

export const enemy = new Fighter({
  position: { x: 400, y: 0 },
  velocity: { x: 0, y: 0 },
  color: "red",
  framesMax: 4,
  imageSrc: enemyIdle,
  scale: 1.25,
  offset: { x: 90, y: 75 },
  isFacingRight: false,
  sprites: {
    attack: [
      {
        imgSrc: enemyAttack1,
        maxFrame: 4,
      },
      {
        imgSrc: enemyAttack2,
        maxFrame: 4,
      },
    ],
    idle: {
      imgSrc: enemyIdle,
      maxFrame: 4,
    },
    run: {
      imgSrc: enemyRun,
      maxFrame: 8,
    },
    jump: {
      imgSrc: enemyJump,
      maxFrame: 2,
    },
    fall: {
      imgSrc: enemyFall,
      maxFrame: 2,
    },
    damaged: {
      imgSrc: enemyHit,
      maxFrame: 3,
    },
  },
});
