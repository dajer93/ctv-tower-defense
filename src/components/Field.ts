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

type FieldType = "empty" | "enemyPath" | "tower";

class Field extends Lightning.Component {
  verticalIndex = 0;
  horizontalIndex = 0;
  fieldType: FieldType = "empty";

  getGridItemColor = (isFocused = false) => {
    switch (this.fieldType) {
      case "tower":
        return isFocused ? GREY : BLACK;
      case "enemyPath":
        return isFocused ? RED : LIGHT_RED;
      case "empty":
      default:
        return isFocused ? GREEN : LIGHT_GREEN;
    }
  };

  static override _template() {
    return {
      h: GRID_ITEM_SIZE,
      w: GRID_ITEM_SIZE,
      rect: true,
      type: "empty",
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
    if (this.fieldType === "enemyPath") {
      return;
    }

    this.signal("handleTower", {
      horizontalIndex: this.horizontalIndex,
      verticalIndex: this.verticalIndex,
    });
  }
}

export default Field;
