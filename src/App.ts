import { Lightning } from "@lightningjs/sdk";
import Grid from "./components/Grid";

export class App extends Lightning.Application {
  verticalIndex = 0;
  horizontalIndex = 0;

  static override _template() {
    return {
      Grid: {
        w: window.innerWidth,
        h: window.innerHeight,
        x: 0,
        y: 0,
        mount: 0,
        type: Grid,
      },
    };
  }

  override _getFocused() {
    return this.tag("Grid");
  }
}
