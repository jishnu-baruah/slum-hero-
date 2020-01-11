
function catchGarbage() {
    for (var i = 0; i <= garbageGroup.length; i++) {
        var temp = garbageGroup.get(i);
        //console.log(i);
        //  temp.collide(ground);
        if (temp !== undefined) {
            // temp.collide(ground);
            if (temp.y >= 450) {
                temp.rotationSpeed = 0;
            }
            if (temp.isTouching(ground)) {

                temp.velocityY = 0;
                // temp.lifetime = 10;
                if (temp.isTouching(ground) === false) {
                    totalGarbage++;
                }
            }
        }
        if (temp !== undefined && temp.isTouching(dustbin)) {
            var type = typeList[i];
            temp.destroy();
            dustbin.changeImage(type);
            if (!temp.isTouching(dustbin)) {
                collected++;
                totalGarbage++;
                score = score + 2;
                ting.play();
                if (type === "plastic") {

                    plastic++;
                }
                if (type === "glass") {

                    glass++;
                }
                if (type === "metal") {

                    metal++;
                }
                if (type === "paper") {

                    paper++;
                }
                if (type === "organic") {


                    organic++;
                }

            }
        }
    }
}
function setHeroBehaviour() {
    if (frameCount % 20 === 0) {
        var rand = Math.round(random(1, 14));
        if (rand % 6 === 0) {
            //  hero.changeAnimation("standing2");
            blink();
        } else if (rand % 5 === 0) {
            stare();
        } else {
            hero.changeAnimation("standing1")
        }
    }
}
function blink() {
    hero.changeAnimation("blink");
}


function stare() {
    hero.changeAnimation("stare");
}

function dustbinControl() {
     dustbin.x = World.mouseX;
    wheel.x = dustbin.x - 13
    hero.x = dustbin.x - 70;

    if (keyDown(RIGHT_ARROW)) {
        dustbin.velocityX = 7;
        wheel.rotationSpeed = 9;
        hero.changeAnimation("walkingf");
    } else {
        setHeroBehaviour();
    }
    if (keyWentUp(RIGHT_ARROW)) {
        dustbin.velocityX = 0;
        wheel.rotationSpeed = 0;

    }
    if (keyDown(LEFT_ARROW)) {
        dustbin.velocityX = -7;
        //  wheel.velocityX = -7;
        wheel.rotationSpeed = -9;
        hero.changeAnimation("walkingb");
    } else {
        setHeroBehaviour();
    }
    if (keyWentUp(LEFT_ARROW)) {
        dustbin.velocityX = 0;
        //   wheel.velocityX = 0;
        wheel.rotationSpeed = 0;

    }
    if (dustbin.x > 400) {
        dustbin.x = 399;
        wheel.rotationSpeed = 0;
        wheel.velocityX = 0;
    } else if (dustbin.x < 0) {
        dustbin.x = 1;
        wheel.rotationSpeed = 0;
        wheel.velocityX = 0;
    }

}
function mouseControl() {
    dustbin.x = World.mouseX
    wheel.x = dustbin.x - 13
    hero.x = dustbin.x - 70;
    console.log("#", dustbin.velocityX);
    if (dustbin.velocityX < 0) {
        // dustbin.velocityX = -7;
        wheel.rotationSpeed = -9;
        hero.changeAnimation("walkingb");
    } if (dustbin.velocityX === 0) {
        //  dustbin.velocityX = 0;
        setHeroBehaviour();
    } if (dustbin.velocityX > 0) {
        //  dustbin.velocityX = -7;
        wheel.rotationSpeed = 9;
        hero.changeAnimation("walkingf");
    }

    if (dustbin.x < 200) {
        // dustbin.velocityX = -7;
        wheel.rotationSpeed = -9;
        hero.changeAnimation("walkingb");
    } if (dustbin.x === 0) {
        //  dustbin.velocityX = 0;
        wheel.rotationSpeed = 0;
        setHeroBehaviour();
    } if (dustbin.x > 200) {
        //  dustbin.velocityX = -7;
        wheel.rotationSpeed = 9;
        hero.changeAnimation("walkingf");
    }

}
