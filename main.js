status_1="";
objects=[]
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}
function start() {
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "\"Ready\" to detect"
}
function preload() {
    //nothing
}
function draw() {
    image(video, 0, 0, 380, 380);
    if(status_1 != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        ObjectDetector.detect(video, gotResult)
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected Sucessfully"
            document.getElementById("objNum").innerHTML = "Number of objects detected: " + objects.length;
            fill(r, g, b)
            percent = floor(objects[i].confidence*100)
            text(objects[i].label + " " + percent + "% ", objects[i].x+15, objects[i].y+15)
            noFill()
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}
function modelLoaded() {
    console.log("The model has been loaded in the past");
    status_1=true;
}
function gotResult(error, results) {
    if(error) {
        console.error(error)
    }
    else{
        console.log(results)
        objects = results
    }
}
