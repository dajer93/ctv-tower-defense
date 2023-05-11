import { Lightning } from "@lightningjs/sdk";

const ENEMY_PATH_VERTICAL_IDX = 3;

class Field extends Lightning.Component {
  verticalIndex = 0;
  static override _template() {
    return {
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

export default Field;
