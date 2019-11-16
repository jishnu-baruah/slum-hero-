var balcony1, balcony2, balcony3, balcony4;
var dustbin, garbageGroup, collected, typeList, organic, glass, metal, paper, plastic;
var canvas;
var toxicGroup;
var barFace;
// var bin, green, binLeft, wheel, wheelImg;
// var bottleImg, jarImg, canImg, cupImg;
var ground;
var gamestate;
var startButton, junkStoreButton;
var welcomePlayed = false;
var replayButton, mainMenuButton;
var pauseButton, soundButton, settingsButton, exitPauseMenuButton, exitSettingsButton;
var previousNo = 0;
var paused = false;
var totalDrop = 15;
var totalGarbage = 0;
var gcircle, gcircleGroup;
var p1 = p2 = p3 = p4 = false;
var volume = 0;
var volume2 = 1;
var soundButton1, soundButton2;
var highscore = 0;
var preState;
var database;
var stat, stat2;
var para;
var battery;

var width, hight;

function preload() {
    bottleImg = loadImage("bottle.png");
    bagImg = loadImage("bag.png");
    bottle2Img = loadImage("bottle2.png");
    bag2Img = loadImage("bag2.png");
    jarImg = loadImage("jar.png");
    jar2Img = loadImage("jar2.png");
    glassBottle = loadImage("glassBottle.png");
    glassImg = loadImage("glass.png");
    bulb = loadImage("bulb.png");
    canImg = loadImage("can.png");
    can3Img = loadImage("sodaCan.png");
    can2Img = loadImage("tinCan.png");
    spoon = loadImage("spoon.png");
    fork = loadImage("fork.png");
    cupImg = loadImage("cup.png");
    cup2Img = loadImage("cup2.png");
    bananaImg = loadImage("banana.png");
    appleImg = loadImage("apple.png");
    fish = loadImage("fish.png");

    toxicImg = loadImage("acid.png");
    battery = loadImage("battery.png");


    green = loadImage("rightBin.png");
    blue = loadImage("glassBin.png");
    pink = loadImage("plastic.png");
    grey = loadImage("metal.png");
    yellow = loadImage("paper.png");
    binLeft = loadImage("leftBin.png");
    destroyed = loadAnimation("rightBin.png", "glassBin.png", "plastic.png", "metal.png", "paper.png");

    wheelImg = loadImage("wheel.png");

    gcircleImg = loadAnimation("c1.png", "c3.png", "c2.png", "c3.png");



    faceBlink1 = loadAnimation("face1.png", "face1.png", "face2.png", "face1.png");
    faceBlink2 = loadAnimation("face4.png", "face4.png", "face3.png", "face4.png");
    faceBlink3 = loadAnimation("face5.png", "face5.png", "face6.png", "face4.png");

    heroImg1 = loadAnimation("4.png");
    heroImg2 = loadAnimation("1.png", "2.png", "3.png", "4.png");
    heroImg3 = loadAnimation("1.png", "2.png", "1.png", "2.png", "4.png")
    heroImg4 = loadAnimation("1.png", "4.png", "5.png", "6.png");
    heroImg5 = loadAnimation("step4.png", "step1.png", "step2.png", "step3.png");
    heroImg6 = loadAnimation("step4.png", "step3.png", "step2.png", "step1.png");



    bubble = loadImage("speechBubble.png");
    click = loadSound("click.wav");
    welcome = loadSound('welcome.wav');

    logo = loadImage("logo.png");
    swoosh = loadSound("swoosh.wav");

    backgroundSound = loadSound("bg.wav");
    wooho = loadSound("wooho.wav");


    faceImg = loadAnimation("face7.png");


    trackImg = loadImage("track.png");
    o_ou = loadSound("o ou.wav");
    dada = loadSound("da da da.wav");
    ting = loadSound("ting.wav");
    tutu = loadSound("tutu.wav");

}


function setup() {
    canvas = createCanvas(400, 700);

    database = firebase.database();
    backgroundSound.loop();



    // var slider = createSlider();
    createButtons();
    garbageGroup = createGroup();
    toxicGroup = createGroup();
    gcircleGroup = createGroup();
    createSprites();
    collected = 0;
    score = 0;
    organic = 0
    glass = 0;
    metal = 0;
    paper = 0;
    plastic = 0;
    typeList = [];
    gamestate = "start";

    if (database != undefined) {
        var volumeRef = database.ref("volume").on("value", function (data) {
            volume = data.val();
        })
        var volume2Ref = database.ref("volume2").on("value", function (data) {
            volume2 = data.val();
        })
        var highScoreRef = database.ref("highscore").on("value", function (data) {
            highscore = data.val();
        })
    }
}









function draw() {
    barFace.visible = false;
    backgroundSound.setVolume(volume);
    setEfxVolume();
    setButtonColour();
    setScore();
    // console.log(gamestate);
    if (!paused) {
        // function gator() { alert('Alligator!!!!'); } setTimeout(gator, 7000);
        background(255, 255, 255);
        rectMode(CENTER);
        noStroke();
        fill("grey")
        rect(200, 660, 400, 10);

        catchGarbage();

        if (gamestate === "start") {

            dustbin.x = 200;
            wheel.x = dustbin.x - 13
            hero.x = dustbin.x - 70;

            startButton.style("visibility", "visible");
            junkStoreButton.style("visibility", "visible");
            image(logo, 50, 50, 300, 100);
            setHeroBehaviour();
            textSize(12);
            if (frameCount >= 60) {
                fill(0);
                image(bubble, 100, 330, 300, 160);
                text("Welcome to the slum", 130, 380);
                if (frameCount >= 80) {
                    if (welcomePlayed === false) {
                        welcome.setVolume(volume2);
                        welcome.play();
                        welcomePlayed = true;
                    }

                    if (frameCount >= 160) {
                        text("Click 'PLAY' to start catching junk drops ", 130, 400);
                        if (frameCount >= 220) {
                            text("Or click 'JUNK STORE' to visit 'kabadiwala'", 130, 420)
                        }
                    }
                }
            }

        }
        if (gamestate === "play") {
            spawnGarbage();
            mouseControl()
            createToxic();
            scoreDisplay();
            showStarBar();
            text(highscore, 100, 100);
            // soundPlay();
            if (garbageGroup.length >= totalDrop) {
                setTimeout(over, 3000);
                pauseButton.style("visibility", "hidden");
                //gamestate = "over"
            }
            // for (var i = 0; i <= garbageGroup.length; i++) {
            //     var temp = garbageGroup.get(i);
            //     if (temp !== undefined) {
            //         if (temp.lifetime = 0) {
            //             gamestate = "over"
            //         }
            //     }

            // }
        } if (gamestate === "pause") {
            displayMiniMenu();
        } if (gamestate === "settings") {
            displaySettingsMenu();
        }
        if (gamestate === "sound") {
            displaySoundMenu();
            if (preState === "settings") {
                // alert("working")
                displaySettingsMenu();
                text(stat, 215, 235);
                text(stat2, 215, 265);
            } else if (preState === "pause") {
                alert("working")
                displayMiniMenu();
            }
        }

        if (gamestate === "over") {
            if (p4 === false) {
                dada.play();
                p4 = true;
            }

            setHeroBehaviour();
            // mouseControl();
            // toxicGroup.destroy()
            noFill();
            stroke("#13316c");
            rect(200, 290, 300, 380);
            fill("#13316c");
            textSize(50);
            strokeWeight(1);
            text("Drop over", 80, 160);
            textSize(20);
            text("Collected : " + collected + "/" + totalDrop, 90, 200);
            text("Score : " + score, 90, 230);
            text("Highscore : " + highscore, 90, 260);
            text("Plastic caught : " + plastic, 90, 290);
            text("Glass caught : " + glass, 90, 320);
            text("Metal caught : " + metal, 90, 350);
            text("Paper caught : " + paper, 90, 380);
            text("Organic caught : " + organic, 90, 410);

            replayButton.style("visibility", "visible");
            mainMenuButton.style("visibility", "visible");
        }

        // if (gamestate = "junkPlay") {
        //     for (var i = 0; i <= 5; i++) {
        //         var x = i + i * 66;

        //         imageMode(CORNER);
        //         image(trackImg, x, 0, 65, 660)
        //     }
        // }

        drawSprites();
        //   console.log(plastic, glass, metal, paper, organic);

    }
    if (paused) {
        if (gamestate === "sound") {
            displaySoundMenu();
            if (preState === "settings") {
                displaySettingsMenu();
            } else if (preState === "pause") {
                displayMiniMenu();
            }
        }
    }

}

function createToxic() {
    var no = Math.round(random(1, 2));
    if (frameCount % 180 === 0) {
        var toxic = createSprite(100, 100);
        toxic.x = Math.round(random(50, 350));
        toxic.addImage("toxic", toxicImg);
        toxic.addImage("battery", battery);
        if (no === 1) {
            toxic.changeAnimation("toxic");
        } else if (no === 2) {
            toxic.changeAnimation("battery");


        }
        toxic.scale = 0.05;
        toxic.lifetime = 80;
        toxic.depth = dustbin.depth - 1;
        toxic.velocityY = 7;
        toxic.rotationSpeed = Math.round(random(-15, 15));
        toxicGroup.push(toxic);
        gcircle = createSprite(toxic.x, toxic.y);
        gcircle.velocityY = toxic.velocityY;
        gcircle.lifetime = 80;
        gcircle.scale = 0.3;
        gcircle.addAnimation("1", gcircleImg);
        gcircle.rotationSpeed = 2;
        gcircle.depth = toxic.depth - 1;
        gcircle.setCollider("circle", 0, 0, 80)
        // gcircle.debug = true;
        gcircleGroup.push(gcircle);

        tutu.play();
    }
    for (var i = 0; i <= toxicGroup.length; i++) {

        var temp = toxicGroup.get(i);
        var temp2 = gcircleGroup.get(i);
        if (temp !== undefined) {
            if (temp.isTouching(dustbin)) {
                //dustbin.destroy();
                temp.destroy();
                tutu.stop();
                // alert("woho");
                if (!temp.isTouching(dustbin)) {
                    o_ou.play();
                    dustbin.changeAnimation("toxic");
                    score = score - 1;
                }
            }
        }
        if (temp2 !== undefined) {
            if (temp2.isTouching(dustbin)) {
                //dustbin.destroy();
                temp2.destroy();
                // alert("woho");
            }
        }
    }
}
function showStarBar() {
    barFace.visible = true;
    noFill()
    stroke("black");
    strokeWeight(2);
    rect(200, 50, 300, 20);
    // fill("yellow");
    rectMode(CORNER);
    noStroke();
    getBarFace();
    // console.log(calculateBarWidth());
    rect(51, 42, calculateBarWidth(), 16);
    barFace.x = calculateBarWidth() + 60;

    //  fill("green");
    stroke("black");
    strokeWeight(2);
    line(111, 42, 111, 58);
    line(221, 42, 221, 58);

    rectMode(CENTER);
    noStroke();
}

function calculateBarWidth() {
    var width = 1;
    if (collected != 0) {
        width = collected / totalDrop * 300;
    }
    return (width);
}
function getBarFace() {
    barFace.addAnimation("4", faceImg);
    if (calculateBarWidth() <= 300 && calculateBarWidth() > 154) {

        function change() { barFace.changeAnimation("3"); } setTimeout(change, 300);
        fill("#8ee990");
        // if (p3 === false) {
        //     wooho.play();
        //     barFace.changeAnimation("4");
        //     p3 = true;
        // }
    } else if (calculateBarWidth() <= 152 && calculateBarWidth() > 52) {
        function change() { barFace.changeAnimation("2"); } setTimeout(change, 300);
        fill("yellow");
        if (p2 === false) {
            wooho.play();
            p2 = true;
        }
    } else if (calculateBarWidth() <= 50) {
        barFace.changeAnimation("1");
        fill("#f37641");
        //  barFace.changeAnimation("4");

    }
    if (calculateBarWidth() === 300) {
        if (p3 === false) {
            wooho.play();
            p3 = true;
        }
        //  wooho.play();
        barFace.changeAnimation("4");
    }
}
function over() {
    gamestate = "over";
    toxicGroup.destroyEach();
    gcircleGroup.destroyEach();
    //  alert("wooho");
}

function setEfxVolume() {
    welcome.setVolume(volume2);
    o_ou.setVolume(volume2);
    dada.setVolume(volume2);
    ting.setVolume(volume2);
    click.setVolume(volume2);
    wooho.setVolume(volume2);
    swoosh.setVolume(volume2);
    tutu.setVolume(volume2);
}

function setScore() {
    if (score > highscore) {
        highscore = score;
        if (database != undefined) {
            database.ref("/").update({
                "highscore": score
            })
        }
    }
    if (database !== undefined) {
        database.ref("/").update({
            "lastScore": score
        })

    }
}