function spawnGarbage() {
    var no = getRandomNo(5, 9);
    var imageNo = getRandomNo(1, 4);
    // no = 1;
    // imageNo = 2;
    if (frameCount % 30 === 0 && garbageGroup.length < totalDrop) {
        swoosh.setVolume(2);
        swoosh.play();
        var garbage = createSprite(100, 100, 10, 10);
        garbage.x = Math.round(random(50, 350));
        garbage.velocityY = 7;
        garbage.scale = 0.15;
        garbage.depth = dustbin.depth - 1;
        garbage.lifetime = 88;
        var type = setType(no);
        if (no === 5) {
            garbage.shapeColor = (rgb(50, 0, 0));
            // dustbin.changeImage("plastic");
            if (imageNo === 1) {
                garbage.addAnimation("bottleImg", bottleImg);
            } else if (imageNo === 2) {
                garbage.addAnimation("bagImg", bagImg);
            } else if (imageNo === 3) {
                garbage.addAnimation("bag2Img", bag2Img);
                garbage.scale = 0.25;
            } else if (imageNo === 4) {
                garbage.addAnimation("bottle2Img", bottle2Img);
                garbage.scale = 0.2;
            }
        } if (no === 6) {
            garbage.shapeColor = (rgb(0, 0, 255));
            // dustbin.changeImage("glass");
            // garbage.addAnimation("jarImg", jarImg);
            if (imageNo = 1) {
                garbage.addAnimation("jarImg", jarImg);
            } else if (imageNo = 2) {
                garbage.addAnimation("glassBottle", glassBottle);
            } else if (imageNo = 3) {
                garbage.addAnimation("jar2Img", jar2Img);
                garbage.scale = 0.25;
            } else if (imageNo = 4) {
                garbage.addAnimation("glassImg", glassImg);
                garbage.scale = 0.25;
            } else if (imageNo = 5) {
                garbage.addAnimation("bulbImg", bulb);
                garbage.scale = 0.15;
            }
        }
        else if (no === 7) {
            // dustbin.changeImage("metal");
            // garbage.shapeColor = (rgb(0, 0, 255));
            // garbage.addAnimation("canImg", canImg);
            if (imageNo === 1) {
                garbage.addAnimation("canImg", canImg);
            } else if (imageNo === 2) {
                garbage.addAnimation("can2Img", can2Img);
                garbage.scale = 0.1;
            } else if (imageNo === 3) {
                garbage.addAnimation("can3Img", can3Img);
                garbage.scale = 0.1;
            } else if (imageNo === 4) {
                garbage.addAnimation("spoon", spoon);
                garbage.scale = 0.15;
            } else if (imageNo === 5) {
                garbage.addAnimation("fork", fork);
                garbage.scale = 0.15;
            }
        }
        else if (no === 8) {
            // dustbin.changeImage("paper");
            if (imageNo <= 2) {
                garbage.addAnimation("cupImg", cupImg);
            } else if (imageNo >= 3) {
                garbage.addAnimation("cup2Img", cup2Img);
                garbage.scale = 0.1;
            }

            // garbage.addAnimation("cupImg", cupImg);
        }
        else if (no === 9) {
            // dustbin.changeImage("organic");
            //   console.log(type);
            if (imageNo <= 2) {
                garbage.addAnimation("bananaImg", bananaImg);
                garbage.scale = 0.05;

            } else if (imageNo = 3) {
                garbage.addAnimation("appleImg", appleImg);
                garbage.scale = 0.08;
            } else if (imageNo > 3) {
                garbage.addAnimation("fishImg", fish);
                garbage.scale = 0.5;

            }
        }

        garbage.rotationSpeed = Math.round(random(-15, 15));
        typeList.push(type);
        garbageGroup.push(garbage);
        //  garbageGroup.setLifetimeEach(32);

        // camera.position.y = 700;
    }
    // garbageGroup.bounceOff(dustbin);
}