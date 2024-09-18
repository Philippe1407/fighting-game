import { Fighter } from "../class/fighter";
import playerIdle from "../assets/samuraiMack/Idle.png";
import playerRun from "../assets/samuraiMack/Run.png";
import playerJump from "../assets/samuraiMack/Jump.png";
import playerFall from "../assets/samuraiMack/Fall.png";
import playerAttack1 from "../assets/samuraiMack/Attack1.png";
import playerAttack2 from "../assets/samuraiMack/Attack2.png";
import playerDamaged from "../assets/samuraiMack/Take Hit.png";
import playerDeath from "../assets/samuraiMack/Death.png";

export const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: "red",
  framesMax: 8,
  imageSrc: playerIdle,
  scale: 1.25,
  sprites: {
    idle: {
      imgSrc: playerIdle,
      maxFrame: 8,
    },
    run: {
      imgSrc: playerRun,
      maxFrame: 8,
    },
    jump: {
      imgSrc: playerJump,
      maxFrame: 2,
    },
    fall: {
      imgSrc: playerFall,
      maxFrame: 2,
    },
    attack: [
      {
        imgSrc: playerAttack1,
        maxFrame: 6,
      },
      {
        imgSrc: playerAttack2,
        maxFrame: 6,
      },
    ],
    damaged: {
      imgSrc: playerDamaged,
      maxFrame: 4,
    },
    death: {
      imgSrc: playerDeath,
      maxFrame: 6,
    },
  },
  offset: { x: 90, y: 75 },
});
