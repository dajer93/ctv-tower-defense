export class Enemy {
  health: number;

  constructor(health = 100) {
    this.health = health;
  }

  reduceHealth(amount = 10): void {
    this.health -= amount;
  }

  isAlive(): boolean {
    return this.health > 0 ? true : false;
  }
}
