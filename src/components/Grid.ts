import { Lightning } from "@lightningjs/sdk";
import Field from "./Field";
import {
  GRID_ITEM_SIZE,
  GRID_SIZE_HORIZONTAL,
  GRID_SIZE_VERTICAL,
  ENEMY_PATH_VERTICAL_IDX,
  maxNumberOfTowers,
  GREEN,
  BLACK,
} from "../utils/constants";
import Enemy from "./Enemy";

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
          horizontalIndex: i,
          verticalIndex: j,
          fieldType: j === ENEMY_PATH_VERTICAL_IDX ? "enemyPath" : "empty",
          signals: {
            handleTower: "_handleTower",
          },
        },
      };
    }
  }

  return out;
};

type Tower = {
  horizontalIndex: number;
  verticalIndex: number;
};

class Grid extends Lightning.Component {
  verticalIndex = 0;
  horizontalIndex = 0;
  towers: Tower[] = [];

  static override _template() {
    return {
      Grid: {
        w: window.innerWidth,
        h: window.innerHeight,
        x: 0,
        y: 0,
        mount: 0,
      },
      Enemy: {
        type: Enemy,
        towers: this.towers,
      },
    };
  }

  override _init() {
    const fields = generateGrid();

    this.verticalIndex = 2;
    this.horizontalIndex = 8;
    this.towers = [];
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
    return this.getCurrentField();
  }

  getCurrentField = () => {
    return this.tag("Grid").children[
      this.horizontalIndex * GRID_SIZE_VERTICAL + this.verticalIndex
    ];
  };

  _handleTower(tower: Tower) {
    const isAdded = this.towers.some(
      (t: Tower) =>
        t.horizontalIndex === tower.horizontalIndex &&
        t.verticalIndex === tower.verticalIndex
    );

    if (isAdded) {
      this.towers = [
        ...this.towers.filter(
          (t: Tower) =>
            t.horizontalIndex !== tower.horizontalIndex &&
            t.verticalIndex !== tower.verticalIndex
        ),
      ];

      this.getCurrentField().patch({
        smooth: {
          color: GREEN,
        },
        fieldType: "empty",
      });

      return;
    }

    if (this.towers.length >= maxNumberOfTowers) {
      return;
    }

    this.towers = [...this.towers, tower];

    this.getCurrentField().patch({
      smooth: {
        color: BLACK,
      },
      fieldType: "tower",
    });
  }
}

export default Grid;
