import { Lightning } from "@lightningjs/sdk";
import Field from "./Field";

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
          type: Field,
          label: j === ENEMY_PATH_VERTICAL_IDX ? "enemyPath" : `Grid_${i}_${j}`,
          horizontalIndex: i,
          verticalIndex: j,
          w: GRID_ITEM_SIZE,
          h: GRID_ITEM_SIZE,
        },
      };
    }
  }

  return out;
};

class Grid extends Lightning.Component {
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
    const fields = generateGrid();

    this.verticalIndex = 0;
    this.horizontalIndex = 0;
    this.tag("Grid").children = fields;
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

export default Grid;
