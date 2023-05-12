import { Enemy } from "../models/enemy";

const ALL_NUMBER_OF_ENEMIES = 100;
const ALL_NUMBER_OF_WAVES = 5;

export class EnemyController {
  waveIndex: number;
  numberOfEnemies: number;
  enemiesArray: [Enemy?];

  constructor() {
    (this.waveIndex = ALL_NUMBER_OF_WAVES),
      (this.numberOfEnemies = ALL_NUMBER_OF_ENEMIES),
      (this.enemiesArray = []);
  }

  removeDeadEnemies(): void {
    this.enemiesArray.filter((enemy) => enemy?.isAlive);
  }

  spawnEnemies(): void {
    if (this.enemiesArray.length > 0) {
      return;
    }

    const spawnedEnemy = ALL_NUMBER_OF_ENEMIES / ALL_NUMBER_OF_WAVES;

    for (let i = 0; i < spawnedEnemy; i++) {
      this.enemiesArray.push(new Enemy());
    }

    this.waveIndex -= 1;
  }
}
