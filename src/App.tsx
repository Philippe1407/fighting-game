import { useEffect, useRef, useState } from "react";
import "./App.css";
import { background } from "./component/background";
import { controller, keysPress } from "./component/controller";
import { enemy } from "./component/enemy";
import { player } from "./component/player";
import { shop } from "./component/shop";
import { RectangularCollision } from "./utils/rectangularCollision";
const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  const [playerHealthPercent, setPlayerHealthPercent] = useState(100);
  const [enemyHealthPercent, setEnemyHealthPercent] = useState(100);
  const [timer, setTimer] = useState(90);

  const gameOver = () => {
    return playerHealthPercent === 0 || enemyHealthPercent === 0 || timer === 0
  };

  const gameInterval = useRef<number>();

  const playerWin = () => {
    if (playerHealthPercent === 0 || enemyHealthPercent > playerHealthPercent) {
      return "YOU LOSE";
    }
    if (enemyHealthPercent === 0 || playerHealthPercent > enemyHealthPercent) {
      return "YOU WIN";
    }
    if (playerHealthPercent === enemyHealthPercent) {
      return "DRAW";
    }
  };

  const animate = () => {
    window.requestAnimationFrame(animate);

    const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    background.update(ctx);
    shop.update(ctx);
    player.update(ctx);
    enemy.update(ctx);

    enemy.getHitTiming = Math.max(0, enemy.getHitTiming - 10);

    if (keysPress.left) {
      player.moveX(-5);
    } else if (keysPress.right) {
      player.moveX(5);
    } else {
      player.stopX();
    }

    if (keysPress.up) {
      player.moveY(-10);
    }

    if (keysPress.space) {
      player.attack();
    }
    if (
      RectangularCollision(player.hitBox, enemy) &&
      player.isAttacking &&
      enemy.getHitTiming === 0
    ) {
      enemy.getHitTiming = 2000;
      setEnemyHealthPercent((prev) => prev - 10);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    player.draw(ctx);
    enemy.draw(ctx);
    controller();
    animate();
    gameInterval.current = setInterval(() => {
      setTimer((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
    }, 1000);

    return () => clearInterval(gameInterval.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gameScreen">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="canvas"
      />
      <div className="gameBar">
        <div className="healthWrapper">
          <div
            className="healthBar reverse"
            style={{ width: `${playerHealthPercent}%` }}
          />
        </div>
        <div className="timer">{timer}</div>
        <div className="healthWrapper">
          <div
            className="healthBar"
            style={{ width: `${enemyHealthPercent}%` }}
          />
        </div>
      </div>
      {gameOver() && (
        <div className="gameOver">
          <p>GAME OVER</p>
          <p>{playerWin()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
