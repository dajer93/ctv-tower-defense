import { EnemyController } from "./enemyController";

export const initGame = () => {
  const enemyController = new EnemyController();
  let isGameRunning = true;

  while (isGameRunning) {
    if (enemyController.enemiesArray.length) {
      enemyController.spawnEnemies();
    }

    if (enemyController.numberOfEnemies) {
      isGameRunning = false;
    }
  }
};
