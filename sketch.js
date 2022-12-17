let img1 = [];
let currentFrame1 = 0;
let img2 = [];
let currentFrame2 = 0;
let firewood;
let match;
let water;
let fext;
let button1 = true;
let button2;
let button3;
let button4;
let selectedButton = 0;
let obj;
let objs = [];
let toolbarWidth = 170;

function preload() {
    for (let i = 0; i < 7; i++) {
        img1[i] = loadImage('fire/' + nf(i, 2) + '.PNG');
    }
    for (let i = 0; i < 8; i++) {
        img2[i] = loadImage('not fire/' + nf(i, 2) + '.PNG');
    }
    firewood = loadImage('firewood.PNG');
    match = loadImage('match.PNG');
    water = loadImage('water.PNG');
    fext = loadImage('fext.PNG');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    obj = new campFire();
    frameRate(16);
}

function draw() {
    background(255);
    fill(200);
    noStroke();
    rect(0, 0, toolbarWidth, height);

    imageMode(CORNER);
    image(match, 10, 10, 150, 150);
    image(firewood, 10, 160, 150, 150);
    image(water, 10, 320, 150, 150);
    image(fext, 10, 500, 150, 150);
    fill(255);

    imageMode(CENTER);

    if (mouseX < 150 && mouseY < 160) {
        //match=button1
        if (mouseIsPressed) {
            button1 = true;
            button2 = false;
            button3 = false;
            button4 = false;
            selectedButton = 0;
        }
    } else if (mouseX < 150 && mouseY < 310) {
        //firewood=button2
        if (mouseIsPressed) {
            button1 = false;
            button2 = true;
            button3 = false;
            button4 = false;
            selectedButton = 1;
        }
    } else if (mouseX < 150 && mouseY < 470) {
        //water=button3
        if (mouseIsPressed) {
            button1 = false;
            button2 = false;
            button3 = true;
            button4 = false;
            selectedButton = 2;
        }
    } else if (mouseX <  150 && mouseY < 650){  
    //reset=button4
    if(mouseIsPressed){
        button1 = false;
        button2 = false;
        button3 = false;
        button4 = true;
        selectedButton = 3;
    }
    }
    if (button1) {
        image(match, mouseX, mouseY, 100, 100);

    } else if (button2) {
        image(firewood, mouseX, mouseY, 100, 100);
     
    } else if (button3) {
        image(water, mouseX, mouseY, 100, 100);
        if (mouseIsPressed) {
            image(img2[currentFrame2], mouseX, mouseY, 200, 200);
            currentFrame2++;
            if (currentFrame2 == 8) {
                currentFrame2 = 0;
            }
        }
        for (let i = 0; i < objs.length; i++) {
            objs[i].remove();
        }
    }else if(button4){
        for (let i = 0; i < objs.length; i++) {
            objs[i].reset();
        }
    }

    for (let i = 0; i < objs.length; i++) {
        objs[i].display();
    }

}


function mouseClicked() {
    if (!button3) {
        objs.push(new campFire());
        objs[objs.length - 1].init(mouseX, mouseY);
    }
}

class campFire {
    constructor() {
        this.currentFrame = 0;
        this._currentFrame = 0;
        this.x;
        this.y;
        this.scale = 1;
        this.activated = false;
        this.button = 0; // button1 -> 0,button2 -> 1,button3 -> 2
        this.removed = false;
    }
    
    init(_x, _y) {
        if (mouseX > toolbarWidth) {
            this.x = _x;
            this.y = _y;
            this.activated = true;
            this.button = selectedButton;
        }
    }

    display() {
        if (this.activated) {
            push();
            scale(this.scale);
            if (this.button == 0) {
                image(img1[this.currentFrame], this.x, this.y, 200, 200);
            } else if (this.button == 1) {
                image(img1[this.currentFrame], this.x - 30, this.y - 30, 100, 100);
                image(img1[this.currentFrame], this.x - 100, this.y, 150, 150);
                image(img1[this.currentFrame], this.x + 50, this.y, 150, 150);
                image(img1[this.currentFrame], this.x + 30, this.y + 70, 100, 100);
            } else if(this.button == 2){
                image(water, this.x, this.y, 200, 200);
            }
            pop();
            this.currentFrame++;
            if (this.currentFrame == 7) {
                this.currentFrame = 0;
            }
        }
    }

    remove() {
        if (mouseIsPressed) {
            if (dist(mouseX, mouseY, this.x, this.y) < 100 && this.activated) {
                this.removed = true;
                image(img2[this._currentFrame], this.x, this.y, 200, 200);
                this._currentFrame++;
                if (this._currentFrame == 8) {
                    this._currentFrame = 0;
                }
                this.activated = false;
            }
     
        }
    }

    reset(){
        this.activated = false;
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }