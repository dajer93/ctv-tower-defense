import { EnemyController } from "./enemyController";

export const initGame = () => {
  const enemyController = new EnemyController();
  let isGameRunning = true;

  while (isGameRunning) {
    if (enemyController.waveIndex > 0) {
      enemyController.spawnEnemies();
    }

    enemyController.removeDeadEnemies();

    if (enemyController.waveIndex <= 0) {
      isGameRunning = false;
    }
  }
};
