var pieces, description, fs, radius, fft, peakDetect, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#E97611", "#8A63D3", "#7A2500", "#504623"];
var uploadLoading = false;


function setup() {

   // uploadAnim = select('#uploading-animation');

    createCanvas(windowWidth, windowHeight);
    toggleBtn = createButton("Begin");
    toggleBtn.addClass("toggle-btn");
    
    toggleBtn.mousePressed(toggleAudio);
    toggleBtn.mousePressed(toggleBtn.hide);
    toggleBtn.mousePressed(fullscreen);


    
}

function draw() {

    background(colorPalette[0]); //Drop Image in here

push(); // Start a new drawing state
let s = 'The quick brown fox jumped over the lazy dog.';
fill(50);
text(s, 10, 10, 70, 80); // Text wraps within text box
pop();
}




function fullScren() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


