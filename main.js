sound1 = "";
sound2 = "";

leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

function preload(){
    sound1 = loadSound("music.mp3");
    sound2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500, 460);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet activated");
}

function draw(){
    image(video, 0, 0, 500, 460);
    fill("blue");
    stroke("blue");
    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 25);

    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    sound.setVolume(volume); 
}

function start(){
    sound1.play();
    sound2.play(); 
}

function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);

    }
}

}