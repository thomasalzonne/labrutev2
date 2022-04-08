import * as PIXI from "pixi.js";

export default class Game {
    constructor(htmlElement) {
        this.app = new PIXI.Application({width: 256, height: 256});
        htmlElement.appendChild(this.app.view);
        // this.app.renderer.view.style.display = "block";
        // this.app.renderer.autoResize = true;
        // this.app.renderer.resize(window.innerWidth, window.innerHeight);
        // const container = new PIXI.Container();
        // this.app.stage.addChild(container);
        // const texture = PIXI.Texture.from('/assets/bunny.png');
        // for (let i = 0; i < 25; i++) {
        //     const bunny = new PIXI.Sprite(texture);
        //     bunny.anchor.set(0.5);
        //     bunny.x = (i % 5) * 40;
        //     bunny.y = Math.floor(i / 5) * 40;
        //     bunny.scale.x = 0.02;
        //     bunny.scale.y = 0.02;
        //     container.addChild(bunny);
        // }

        // // Move container to the center
        // container.x = this.app.screen.width / 2;
        // container.y = this.app.screen.height / 2;

        // // Center bunny sprite in local container coordinates
        // container.pivot.x = container.width / 2;
        // container.pivot.y = container.height / 2;

        // // Listen for animate update
        // this.app.ticker.add((delta) => {
        //     // rotate the container!
        //     // use delta to create frame-independent transform
        //     container.rotation -= 0.01 * delta;
        // });

    }
}