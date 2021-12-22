objects = [];
status_new = "";

function preload() {
    video = createVideo("vid.mp4");
}

function setup() {
    canvas = createCanvas(600, 450)
    canvas.position(420, 290)

    video.hide();
}

function startVid() {
    objectDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Model Loading in Progress"
}

function stopVid() {
    video.stop()
}

function modelLoaded() {
    document.getElementById("status").innerHTML = "Status: Model Loaded";
    console.log("Model Loaded");
    status_new = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 600, 450)
    if (status_new != "") {
        objectDetect.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("no_objs").innerHTML = "Number of objects: " + objects.length;

            oL = objects[0].label
            oC = floor(objects[0].confidence * 100)
            oW = objects[0].width
            oH = objects[0].height
            oX = objects[0].x
            oY = objects[0].y

            fill("red")
            stroke("yellow")
            textSize(20)
            text(oL+" "+oC+"%", oX+100, oY+100)
            noFill()
            rect(oX,oY, oW, oH)


        }

    }
}