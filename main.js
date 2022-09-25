song="";
leftwristx = 0
leftwristy = 0
rightwristx = 0
rightwristy = 0
scoreleftwrist = 0
song=0
function preload(){
    song=loadSound("");
}
function play(){
song.play();

}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function modelLoaded(){
    console.log("model loaded!")
}
function gotPoses(results){
    if (results.length > 0){
        console.log (results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = " + scoreleftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("left wrist x =" + leftwristx + " " + "left wrist y =" + leftwristy);
        console.log("right wrist x =" + rightwristx + " " + "right wrist y =" + rightwristy);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill('ff0000');
    stroke('ff0000');
    if (scoreleftwrist >0.2){
        circle(leftwristx, leftwristy, 20);
        inNumleftwristy=Number(leftwristy);
        removeYdecimals= floor(inNumleftwristy);
        volume = removeYdecimals/500;
        document.getElementById("vol").innerHTML ="Volume =" + volume;
        song.setVolume(volume);
    }
    
}

