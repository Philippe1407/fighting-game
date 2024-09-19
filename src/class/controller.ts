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
  keydownEvent1: (event: KeyboardEvent) => void;
  keyupEvent1: (event: KeyboardEvent) => void;
  keydownEvent2: (event: KeyboardEvent) => void;
  keyupEvent2: (event: KeyboardEvent) => void;
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
    this.keydownEvent1 = this.keyEnablePlayer1.bind(this);
    this.keyupEvent1 = this.keyDisablePlayer1.bind(this);
    this.keydownEvent2 = this.keyEnablePlayer2.bind(this);
    this.keyupEvent2 = this.keyDisablePlayer2.bind(this);

    if (Controller.instance) {
      return Controller.instance;
    } else {
      Controller.instance = this;
    }
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

  private keyEnablePlayer1(e: globalThis.KeyboardEvent) {
    switch (e.key) {
      case this.player1Keys.leftKey:
        this.keysPress.player1.left = true;
        break;
      case this.player1Keys.rightKey:
        this.keysPress.player1.right = true;
        break;
      case this.player1Keys.jumpKey:
        this.keysPress.player1.jump = true;
        break;
      case this.player1Keys.attackKey:
        this.keysPress.player1.attack = true;
        break;
    }
  }

  private keyEnablePlayer2(e: globalThis.KeyboardEvent) {
    switch (e.key) {
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
  }

  private keyDisablePlayer1(e: globalThis.KeyboardEvent) {
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
    }
  }

  private keyDisablePlayer2(e: globalThis.KeyboardEvent) {
    switch (e.key) {
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
  }

  configKeys() {
    this.keydownEvent1 = this.keyEnablePlayer1.bind(this);
    this.keydownEvent2 = this.keyEnablePlayer2.bind(this);
    this.keyupEvent1 = this.keyDisablePlayer1.bind(this);
    this.keyupEvent2 = this.keyDisablePlayer2.bind(this);
    window.addEventListener("keydown", this.keydownEvent1);
    window.addEventListener("keydown", this.keydownEvent2);
    window.addEventListener("keyup", this.keyupEvent1);
    window.addEventListener("keyup", this.keyupEvent2);
  }

  removeConfigKeys() {
    window.removeEventListener("keydown", this.keydownEvent1);
    window.removeEventListener("keyup", this.keyupEvent2);
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
  }
}
const gameController = new Controller();

export default gameController;
