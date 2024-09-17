import { useEffect, useRef, useState } from "react";
import "./App.css";
import { background } from "./component/background";
import { enemy } from "./component/enemy";
import { player } from "./component/player";
import { shop } from "./component/shop";
import { RectangularCollision } from "./utils/rectangularCollision";
import gameController from "./class/controller";

const maxHealth = 600;
const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [playerHealth, setPlayerHealth] = useState(600);
  const [enemyHealth, setEnemyHealth] = useState(600);
  const [timer, setTimer] = useState(90);

  const gameOver = () => {
    if (playerHealth === 0) player.death();
    if (enemyHealth === 0) enemy.death();
    gameController.removeConfigKeys();
    return playerHealth === 0 || enemyHealth === 0 || timer === 0;
  };

  const gameInterval = useRef<number>();
  const playerWin = () => {
    if (playerHealth === 0 || enemyHealth > playerHealth) {
      return "YOU LOSE";
    }
    if (enemyHealth === 0 || playerHealth > enemyHealth) {
      return "YOU WIN";
    }
    if (playerHealth === enemyHealth) {
      return "DRAW";
    }
  };

  const animate = () => {
    window.requestAnimationFrame(animate);
    const ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
    ctx.save();
    ctx.scale(
      window.innerWidth / background.image.width,
      window.innerHeight / background.image.height
    );
    if (ctx)
      ctx.clearRect(0, 0, background.image.width, background.image.height);

    background.update(ctx);
    shop.update(ctx);
    player.reverse =
      (player.position.x + player.image.width / player.framesMax) / 2 -
        (enemy.position.x + enemy.image.width / enemy.framesMax) / 2 >
      0;
    enemy.reverse = player.reverse;
    player.update(ctx);
    enemy.update(ctx);

    player.getHitTiming = Math.max(0, player.getHitTiming - 10);
    enemy.getHitTiming = Math.max(0, enemy.getHitTiming - 10);

    if (gameController.keysPress.player1.left) player.moveX(-5);
    else if (gameController.keysPress.player1.right) player.moveX(5);
    else player.stopX();
    if (gameController.keysPress.player1.jump) player.moveY(-10);
    if (gameController.keysPress.player1.attack) player.attack();

    if (gameController.keysPress.player2.left) enemy.moveX(-5);
    else if (gameController.keysPress.player2.right) enemy.moveX(5);
    else enemy.stopX();
    if (gameController.keysPress.player2.jump) enemy.moveY(-10);
    if (gameController.keysPress.player2.attack) {
      enemy.attack();
      console.log(enemy.hitBox, {
        position: {
          x: player.position.x + player.offset.x,
          y: player.position.y + player.offset.y,
        },
        width: player.width,
        height: player.height,
      });
    }

    if (
      RectangularCollision(player.hitBox, {
        position: {
          x: enemy.position.x + enemy.offset.x,
          y: enemy.position.y + enemy.offset.y,
        },
        width: enemy.width,
        height: enemy.height,
      }) &&
      player.isAttacking &&
      enemy.getHitTiming === 0
    ) {
      enemy.getHitTiming = 250;
      enemy.takeDamage();
      setEnemyHealth((prev) => prev - 10);
    }

    if (
      RectangularCollision(enemy.hitBox, {
        position: {
          x: player.position.x + player.offset.x,
          y: player.position.y + player.offset.y,
        },
        width: player.width,
        height: player.height,
      }) &&
      enemy.isAttacking &&
      player.getHitTiming === 0
    ) {
      player.getHitTiming = 250;
      player.takeDamage();
      setPlayerHealth((prev) => prev - 10);
    }

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, background.image.width, background.image.height);
    player.draw(ctx);
    enemy.draw(ctx);
    gameController.configKeys();
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
            style={{ width: `${(playerHealth / maxHealth) * 100}%` }}
          />
        </div>
        <div className="timer">{timer}</div>
        <div className="healthWrapper">
          <div
            className="healthBar"
            style={{ width: `${(enemyHealth / maxHealth) * 100}%` }}
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
