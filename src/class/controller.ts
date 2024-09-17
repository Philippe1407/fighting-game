type TPlayerKey = {
  leftKey: string;
  rightKey: string;
  jumpKey: string;
  attackKey: string;
};

type TKeysPress = {
  player1: {
    left: boolean;
    right: boolean;
    jump: boolean;
    attack: boolean;
  };
  player2: {
    left: boolean;
    right: boolean;
    jump: boolean;
    attack: boolean;
  };
};

type TMode = "single" | "multiplayer";

class Controller {
  private static instance: Controller;
  player1Keys: TPlayerKey;
  player2Keys: TPlayerKey;
  playMode: TMode;
  keysPress: TKeysPress;
  constructor(playMode: TMode = "single") {
    this.player1Keys = {
      leftKey: "a",
      rightKey: "d",
      jumpKey: "w",
      attackKey: "g",
    };
    this.player2Keys = {
      leftKey: "ArrowLeft",
      rightKey: "ArrowRight",
      jumpKey: "ArrowUp",
      attackKey: "l",
    };
    this.playMode = playMode;
    this.keysPress = {
      player1: {
        left: false,
        right: false,
        jump: false,
        attack: false,
      },
      player2: {
        left: false,
        right: false,
        jump: false,
        attack: false,
      },
    };
    if (Controller.instance) {
      return Controller.instance;
    }
  }

  static getInstance() {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }
    return Controller.instance;
  }

  getKeys() {
    return { player1: this.player1Keys, player2: this.player2Keys };
  }

  setKeys(player1Keys: TPlayerKey, player2Keys: TPlayerKey) {
    this.player1Keys = player1Keys;
    this.player2Keys = player2Keys;
  }

  resetKeys() {
    this.player1Keys = {
      leftKey: "a",
      rightKey: "d",
      jumpKey: "w",
      attackKey: "g",
    };
    this.player2Keys = {
      leftKey: "ArrowLeft",
      rightKey: "ArrowRight",
      jumpKey: "ArrowUp",
      attackKey: "l",
    };
  }

  configKeys() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case this.player1Keys.leftKey:
          this.keysPress.player1.left = true;
          break;
        case this.player1Keys.rightKey:
          console.log("gogo");
          this.keysPress.player1.right = true;
          break;
        case this.player1Keys.jumpKey:
          this.keysPress.player1.jump = true;
          break;
        case this.player1Keys.attackKey:
          this.keysPress.player1.attack = true;
          break;
        case this.player2Keys.leftKey:
          this.keysPress.player2.left = true;
          break;
        case this.player2Keys.rightKey:
          this.keysPress.player2.right = true;
          break;
        case this.player2Keys.jumpKey:
          this.keysPress.player2.jump = true;
          break;
        case this.player2Keys.attackKey:
          this.keysPress.player2.attack = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case this.player1Keys.leftKey:
          this.keysPress.player1.left = false;
          break;
        case this.player1Keys.rightKey:
          this.keysPress.player1.right = false;
          break;
        case this.player1Keys.jumpKey:
          this.keysPress.player1.jump = false;
          break;
        case this.player1Keys.attackKey:
          this.keysPress.player1.attack = false;
          break;
        case this.player2Keys.leftKey:
          this.keysPress.player2.left = false;
          break;
        case this.player2Keys.rightKey:
          this.keysPress.player2.right = false;
          break;
        case this.player2Keys.jumpKey:
          this.keysPress.player2.jump = false;
          break;
        case this.player2Keys.attackKey:
          this.keysPress.player2.attack = false;
          break;
      }
    });
  }

  removeConfigKeys() {
    window.removeEventListener("keydown", (e) => {
      switch (e.key) {
        case this.player1Keys.leftKey:
          this.keysPress.player1.left = true;
          break;
        case this.player1Keys.rightKey:
          console.log("gogo");
          this.keysPress.player1.right = true;
          break;
        case this.player1Keys.jumpKey:
          this.keysPress.player1.jump = true;
          break;
        case this.player1Keys.attackKey:
          this.keysPress.player1.attack = true;
          break;
        case this.player2Keys.leftKey:
          this.keysPress.player2.left = true;
          break;
        case this.player2Keys.rightKey:
          this.keysPress.player2.right = true;
          break;
        case this.player2Keys.jumpKey:
          this.keysPress.player2.jump = true;
          break;
        case this.player2Keys.attackKey:
          this.keysPress.player2.attack = true;
          break;
      }
    });

    window.removeEventListener("keyup", (e) => {
      switch (e.key) {
        case this.player1Keys.leftKey:
          this.keysPress.player1.left = false;
          break;
        case this.player1Keys.rightKey:
          this.keysPress.player1.right = false;
          break;
        case this.player1Keys.jumpKey:
          this.keysPress.player1.jump = false;
          break;
        case this.player1Keys.attackKey:
          this.keysPress.player1.attack = false;
          break;
        case this.player2Keys.leftKey:
          this.keysPress.player2.left = false;
          break;
        case this.player2Keys.rightKey:
          this.keysPress.player2.right = false;
          break;
        case this.player2Keys.jumpKey:
          this.keysPress.player2.jump = false;
          break;
        case this.player2Keys.attackKey:
          this.keysPress.player2.attack = false;
          break;
      }
    });
  }
}
const gameController = Object.freeze(new Controller());

export default gameController;
