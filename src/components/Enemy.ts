import Lightning from "@lightningjs/sdk/src/Lightning";
import {
  ENEMY_PATH_VERTICAL_IDX,
  GRID_ITEM_SIZE,
  GRID_SIZE_HORIZONTAL,
  towerPositions,
} from "../utils/constants";

class Enemy extends Lightning.Component {
  _enemyAnim;
  _enemyHealth = 100;
  _damageInterval;
  enemyDelay = 0;

  static override _template() {
    return {
      Enemy: {
        w: 30,
        h: 30,
        x: -GRID_ITEM_SIZE,
        rect: true,
        color: `0xffff0000`,
      },
    };
  }

  applyDamage() {
    const hundredPercent = GRID_SIZE_HORIZONTAL * GRID_ITEM_SIZE;
    const currentPos = hundredPercent * this._enemyAnim._p;
    const radius = 2 * GRID_ITEM_SIZE;
    let sumDamage = 0;

    this.parent.towers.forEach((tower) => {
      if (!tower && !tower?.horizontalIndex) {
        return;
      }

      const min = tower.horizontalIndex * GRID_ITEM_SIZE - radius;
      const max =
        tower.horizontalIndex * GRID_ITEM_SIZE + GRID_ITEM_SIZE + radius;

      if (currentPos < max && currentPos > min) {
        sumDamage += 5;
      }
    });

    this._enemyHealth -= sumDamage;

    this.patch({
      alpha: this._enemyHealth / 100,
    });

    if (this._enemyHealth < 0) {
      this._enemyAnim.stop();
      clearInterval(this._damageInterval);
    }
  }

  override _init() {
    this._enemyHealth = 100;
    this._enemyAnim = this.tag("Enemy").animation({
      duration: 30 - Math.random() * 10,
      repeat: 0,
      stopMethod: "immediate",
      actions: [
        {
          p: "x",
          v: {
            sm: 0,
            0: -GRID_ITEM_SIZE,
            1: GRID_SIZE_HORIZONTAL * GRID_ITEM_SIZE + 10,
          },
        },
      ],
    });

    this.patch({
      y: ENEMY_PATH_VERTICAL_IDX * GRID_ITEM_SIZE + 10 + Math.random() * 60,
    });

    this._enemyAnim.on("finish", () => {
      console.error("enemy finished");
    });

    this._damageInterval = setInterval(this.applyDamage.bind(this), 1000);

    setTimeout(() => {
      this._enemyAnim.start();
    }, this.enemyDelay * 1000);
  }
}

export default Enemy;
