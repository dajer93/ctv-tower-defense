import { Lightning } from "@lightningjs/sdk";

const GRID_ITEM_SIZE = 50;
const GRID_SIZE_HORIZONTAL = 16;
const GRID_SIZE_VERTICAL = 7;
const ENEMY_PATH_VERTICAL_IDX = 3;

const generateGrid = () => {
  let out = {};

  for (let i = 0; i < GRID_SIZE_HORIZONTAL; i++) {
    for (let j = 0; j < GRID_SIZE_VERTICAL; j++) {
      out = {
        ...out,
        [`Grid_${i}_${j}`]: {
          x: i * GRID_ITEM_SIZE,
          y: j * GRID_ITEM_SIZE,
          mount: 0,
          type: Button,
          label: j === ENEMY_PATH_VERTICAL_IDX ? "enemyPath" : `Grid_${i}_${j}`,
          horizontalIndex: i,
          verticalIndex: j,
        },
      };
    }
  }

  return out;
};

class ExampleApp extends Lightning.Application {
  verticalIndex = 0;
  horizontalIndex = 0;

  static override _template() {
    return {
      Grid: {
        w: 800,
        h: 800,
        x: 0,
        y: 0,
        mount: 0,
      },
    };
  }

  override _init() {
    const buttons = generateGrid();

    this.verticalIndex = 0;
    this.horizontalIndex = 0;
    this.tag("Grid").children = buttons;
  }

  override _handleLeft() {
    if (this.horizontalIndex === 0) {
      this.horizontalIndex = GRID_SIZE_HORIZONTAL - 1;
    } else {
      this.horizontalIndex -= 1;
    }
  }

  override _handleRight() {
    if (this.horizontalIndex === GRID_SIZE_HORIZONTAL - 1) {
      this.horizontalIndex = 0;
    } else {
      this.horizontalIndex += 1;
    }
  }

  override _handleUp() {
    if (this.verticalIndex === 0) {
      this.verticalIndex = GRID_SIZE_VERTICAL - 1;
    } else {
      this.verticalIndex -= 1;
    }
  }

  override _handleDown() {
    if (this.verticalIndex === GRID_SIZE_VERTICAL - 1) {
      this.verticalIndex = 0;
    } else {
      this.verticalIndex += 1;
    }
  }

  override _getFocused() {
    return this.tag("Grid").children[
      this.horizontalIndex * GRID_SIZE_VERTICAL + this.verticalIndex
    ];
  }
}

class Button extends Lightning.Component {
  verticalIndex = 0;
  static override _template() {
    return {
      h: GRID_ITEM_SIZE,
      w: GRID_ITEM_SIZE,
      rect: true,
      Label: {
        x: 10,
        color: 0xff000000,
        text: { fontSize: 10, text: "Label" },
      },
    };
  }

  override _init() {
    this.patch({
      color:
        this.verticalIndex !== ENEMY_PATH_VERTICAL_IDX
          ? 0xff00ff00
          : 0xaaff0000,
    });
  }

  set label(value: string) {
    this.tag("Label").text = value.toString();
  }

  override _focus() {
    this.patch({
      smooth: {
        color:
          this.verticalIndex !== ENEMY_PATH_VERTICAL_IDX
            ? 0xff763ffc
            : 0xaaff0000,
      },
      Label: {
        smooth: { color: 0xffffffff },
      },
    });
  }

  override _unfocus() {
    this.patch({
      smooth: {
        color:
          this.verticalIndex !== ENEMY_PATH_VERTICAL_IDX
            ? 0xff00ff00
            : 0xaaff0000,
      },
      Label: {
        smooth: { color: 0xff000000 },
      },
    });
  }
}

const options = {
  stage: {
    w: window.innerWidth,
    h: window.innerHeight,
    clearColor: 0x00000000,
  },
};
const app = new ExampleApp(options);

document.body.appendChild(app.stage.getCanvas());
