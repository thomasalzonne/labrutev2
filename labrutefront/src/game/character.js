import * as PIXI from "pixi.js";

export default class Character {
  constructor(game, direction, player) {
      this.hp = player.hp;
    this.game = game;
    this.player = player;
    this.isKnocked = false;
    this.direction = direction;
    this.spawn =
      this.game.app.view.width / 2 +
      (this.game.app.view.width / 3) * this.direction;
    this.currentAnimation = null;
    this.targetAnimation = "Idle/idle";
    this.targetPosition = this.spawn;
    this.graphics = new PIXI.Graphics();
    this.graphics.drawRect(-50, -150, 100, 150);
    this.graphics.position.x = this.game.app.view.width / 2 +
    (this.game.app.view.width / 2) * this.direction;;
    this.sprite = new PIXI.AnimatedSprite(
      this.game.loader.resources[
        "/assets/character.json"
      ].spritesheet.animations["Idle/idle"]
    );
    this.sprite.updateAnchor = true;
    this.sprite.animationSpeed = 0.167;
    this.sprite.anchor.y = 0.87;
    this.sprite.anchor.x = 0.35;
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;
    this.sprite.play();
    this.graphics.addChild(this.sprite);
    this.acceleration = new PIXI.Point(0, 0);
    this.velocity = new PIXI.Point(-10 * this.direction, 10);
    PIXI.Ticker.shared.add(this.loop.bind(this));
  }
  loop(delta) {
    if (Math.abs(this.graphics.position.x - this.targetPosition) > 15 && !this.isKnocked) {
      let direction =
        this.graphics.position.x > this.targetPosition ? -1.4 : 1.4;
      this.acceleration.x = direction;
    } else this.acceleration.x = 0;
    this.acceleration.y = 0.8;
    this.velocity.y = this.velocity.y + this.acceleration.y;
    this.velocity.x = this.velocity.x + this.acceleration.x;
    this.graphics.position.x += this.velocity.x;
    this.graphics.position.y += this.velocity.y;
    this.velocity.y = this.velocity.y * 0.95;
    this.velocity.x = this.velocity.x * 0.8;
    if (Math.abs(this.velocity.x) > 1 && this.targetAnimation)
      this.animation("Run/run");
    if (Math.abs(this.velocity.x) <= 1 && this.targetAnimation)
      this.animation(this.targetAnimation);
    if(this.velocity.x < -1)this.graphics.scale.x = -1;
    if(this.velocity.x > 1)this.graphics.scale.x = 1;
    //colision sol tete missile sol air
    if (this.graphics.position.y > this.game.floorHeight)
      this.graphics.position.y = this.game.floorHeight;
    }

  animation(name) {
    if (!name) return;
    if (this.currentAnimation === name) return;
    this.currentAnimation = name;
    this.sprite.textures =
      this.game.loader.resources[
        "/assets/character.json"
      ].spritesheet.animations[name];
    this.sprite.play();
  }

  async goToAndAttack(target, event) {
    await this.goToPlayer(target);
    await this.attack(target, event);
    await this.goToX(this.spawn);
    return true;
  }

  goToPlayer(target) {
    this.targetPosition = target.targetPosition - target.direction * 140;
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (Math.abs(this.graphics.position.x - this.targetPosition) < 15) {
          resolve();
          clearInterval(interval);
        }
      }, 8);
    });
  }

  goToX(target) {
    this.targetPosition = target;
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (Math.abs(this.graphics.position.x - this.targetPosition) < 15) {
          resolve();
          clearInterval(interval);
        }
      }, 8);
    });
  }
  async playOnce(name) {
    return new Promise((resolve) => {
        this.sprite.stop();
        const currentAnimation = this.targetAnimation;
        this.targetAnimation = null;
        this.animation(name);
        this.sprite.loop = false;
        this.sprite.onComplete = () => {
          this.targetAnimation = currentAnimation;
          this.sprite.loop = true;
          resolve();
        };
      });
  }
  async attack(target, event) {
      target.hp -= event.damage;
      setTimeout(() => {
        target.knock()
        target.velocity.x -= 20 * this.direction
        target.velocity.y -= 30
      }, 200)
    await Promise.all([this.playOnce('Attack/attack'), target.playOnce('Hurt/hurt')]);
    if(target.hp <= 0) {
        target.targetAnimation = null;
        target.playOnce("Death/death");
    }

  }
  knock() {
      this.isKnocked = true;
      setTimeout(() => this.isKnocked = false , 450);
  }
}
