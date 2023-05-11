import { Lightning } from "@lightningjs/sdk";

class ExampleApp extends Lightning.Application {
  static override _template() {
    return {
      LeftButton: { mount: 0.5, x: 340, y: 270, type: Button, label: "Left" },
      RightButton: { mount: 0.5, x: 620, y: 270, type: Button, label: "Right" },
    };
  }

  override _init() {
    this._setState("LeftButton");
  }

  static override _states() {
    return [
      class LeftButton extends this {
        override _getFocused() {
          return this.tag("LeftButton");
        }
        override _handleRight() {
          this._setState("RightButton");
        }
      },
      class RightButton extends this {
        override _getFocused() {
          return this.tag("RightButton");
        }
        override _handleLeft() {
          this._setState("LeftButton");
        }
      },
    ];
  }
}

class Button extends Lightning.Component {
  static override _template() {
    return {
      h: 50,
      w: 200,
      rect: true,
      Label: {
        x: 10,
        color: 0xff000000,
        text: { fontSize: 32, text: "Label" },
      },
    };
  }

  set label(value: string) {
    this.tag("Label").text = value.toString();
  }

  override _focus() {
    this.patch({
      smooth: { color: 0xff763ffc },
      Label: {
        smooth: { color: 0xffffffff },
      },
    });
  }

  override _unfocus() {
    this.patch({
      smooth: { color: 0xffffffff },
      Label: {
        smooth: { color: 0xff000000 },
      },
    });
  }
}

// export default ExampleApp;

const options = { stage: { w: 960, h: 540, clearColor: 0x00000000 } };
const app = new ExampleApp(options);

document.body.appendChild(app.stage.getCanvas());
