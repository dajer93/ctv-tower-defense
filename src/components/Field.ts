import { Lightning } from "@lightningjs/sdk";
import {
  GRID_ITEM_SIZE,
  ENEMY_PATH_VERTICAL_IDX,
  GREEN,
  LIGHT_GREEN,
  RED,
  LIGHT_RED,
  BLACK,
  GREY,
  towerPositions,
  maxNumberOfTowers,
} from "../utils/constants";

class Field extends Lightning.Component {
  verticalIndex = 0;
  horizontalIndex = 0;

  getGridItemColor = (isFocused = false) => {
    const isTower = !!towerPositions.find(
      ({ x, y } = {}) => this.horizontalIndex === x && this.verticalIndex === y
    );

    if (isTower) {
      return isFocused ? GREY : BLACK;
    }

    if (!isFocused) {
      return this.verticalIndex !== ENEMY_PATH_VERTICAL_IDX
        ? LIGHT_GREEN
        : LIGHT_RED;
    }

    return this.verticalIndex !== ENEMY_PATH_VERTICAL_IDX ? GREEN : RED;
  };

  static override _template() {
    return {
      h: GRID_ITEM_SIZE,
      w: GRID_ITEM_SIZE,
      rect: true,
    };
  }

  override _init() {
    this.patch({
      color: this.getGridItemColor(),
    });
  }

  set label(value: string) {
    this.tag("Label").text = value.toString();
  }

  override _focus() {
    this.patch({
      smooth: {
        color: this.getGridItemColor(true),
      },
      Label: {
        smooth: { color: 0xffffffff },
      },
    });
  }

  override _unfocus() {
    this.patch({
      smooth: {
        color: this.getGridItemColor(),
      },
      Label: {
        smooth: { color: 0xff000000 },
      },
    });
  }

  override _handleEnter() {
    if (
      this.verticalIndex === ENEMY_PATH_VERTICAL_IDX ||
      towerPositions.find(
        ({ x, y }) => this.verticalIndex === y && this.horizontalIndex === x
      ) ||
      towerPositions.length >= maxNumberOfTowers
    ) {
      return;
    }

    towerPositions.push({
      x: this.horizontalIndex,
      y: this.verticalIndex,
    });

    this.patch({
      smooth: {
        color: GREY,
      },
    });
  }
}

export default Field;
