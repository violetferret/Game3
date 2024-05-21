class HUD extends Phaser.Scene {
    preload() {
        this.textConfig = {
            fontFamily: 'kenney-mini',
            fontSize: 50,
            color: white,
        }  
    }

    constructor() {
        super("hudScene");
    }

    create() {
        this.text = this.add.text(0, 0, 'Score: 0', this.textConfig);
        console.log(this.text)
        this.text.visible = true;
    }

    update(coins) {
        //this.text.setText("Score: " + coins);
        //this.text.visible = true;
    }

}