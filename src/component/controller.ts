export const keysPress = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
};

export const controller = () => {
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        keysPress.up = true;
        break;
      case "ArrowDown":
        keysPress.down = true;
        break;
      case "ArrowLeft":
        keysPress.left = true;
        break;
      case "ArrowRight":
        keysPress.right = true;
        break;
      case "Space": {
        keysPress.space = true;
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "ArrowUp":
        keysPress.up = false;
        break;
      case "ArrowDown":
        keysPress.down = false;
        break;
      case "ArrowLeft":
        keysPress.left = false;
        break;
      case "ArrowRight":
        keysPress.right = false;
        break;
      case "Space": {
        keysPress.space = false;
      }
    }
  });
};
