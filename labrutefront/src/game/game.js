import * as PIXI from "pixi.js";
import Fight from "./fight";

export default class Game {
    constructor(htmlElement, timeLine) {
        this.htmlElement = htmlElement;
        this.timeLine = timeLine;
        this.loader = new PIXI.Loader()
        .add("/assets/character.json")
        .load(this.setup.bind(this));
    }
    setup() {
        this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight - document.querySelector("nav.navbar.shadow-1").offsetHeight});
        this.htmlElement.appendChild(this.app.view);
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
        this.container = new PIXI.Container();
        this.texture = new PIXI.Texture.from('/assets/background.jpg');
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.height = this.app.view.height;
        this.sprite.width = this.app.view.width;
        this.app.stage.addChild(this.container);
        this.app.stage.addChild(this.sprite);
        this.floorHeight = this.app.view.height - 40;
        new Fight(this);
    }
}