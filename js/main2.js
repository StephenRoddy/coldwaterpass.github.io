var img, pieces, description, fs, radius, fft, peakDetect, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#E97611", "#8A63D3", "#7A2500", "#504623"];
var uploadLoading = false;

function preload() {
    audio = loadSound("audio/ColdwaterPass.mp3");
    //  img = loadImage("lib/HumanCost.jpg");

}

/*
function uploaded(file) {
    uploadLoading = true;
    uploadedAudio = loadSound(file.data, uploadedAudioPlay);
}

function uploadedAudioPlay(audioFile) {

    uploadLoading = false;

    if (audio.isPlaying()) {
        audio.pause();
    }

    audio = audioFile;
    audio.loop();
}
*/
function setup() {

   // uploadAnim = select('#uploading-animation');

    createCanvas(windowWidth, windowHeight);
    toggleBtn = createButton("Begin");
    toggleBtn.addClass("toggle-btn");
    
    toggleBtn.mousePressed(toggleAudio);
    toggleBtn.mousePressed(toggleBtn.hide);
    toggleBtn.mousePressed(fullscreen);

   // image(img, 10, 10, 50, 50);

    loadImage('lib/HumanCost.jpg', img => {
    image(img, 0, 0);
  });

  //  image(img, 0, 0); //album cover

    fft = new p5.FFT();
    
    //peakDetect = new p5.PeakDetect();   // Not using yet but need to 
    

   // audio.play();

 
    pieces = 4;
    radius = windowHeight / 4;

    varianceX = 3;  
    varianceY = .45; 

//	peakDetect.onPeak(varyX);
//    peakDetect.onPeak(varyY);


   // let description = 'Coldwater Pass is a data-driven composition that explores some of the human dimensions of Ireland’s economic crash focusing specifically on the relationship between poverty, drug crime, emigration, and suicide. It exploits the power of sound to re-embody the impersonal statistical data revealing aspects of the human realities underlying the cold hard facts. The piece uses a complex mapping strategy to map data that represents Deprivation Rate, Unemployment Rate, Emigration Rate, Drug Related Crime Rate and Annual Suicide Rate from 2007 to 2012 to musical features. This mapping manipulates patterns of tension and release in the musical material in order to communicate a sense of the human realities underlying the socioeconomic data. The piece is driven by a Csound algorithm that maps the data to vocal synthesis parameters defined by in Native Instruments Reaktor synthesis engine. Input data is rescaled and assigned to midi note, pan and CC data that is ported into Logic Pro X. GNP, Unemployment and Emigration Rate are mapped to create a background harmonic material while Deprivation rate and Drug Crime offenses create a type of foreground call and response pattern that is spatially distrusted with Drug Crime presented on the right and Deprivation rate on the left. All of this is underpinned by a rhythmic percussion pattern for which each hit indicates 60 suicides. Parameters such as vowel shape note length and formant shape are leveraged in the expression of the data through tension patterns.'
   // text(description, 10, 10, 70, 80); // Text wraps within text box

}

function draw() {

/*
    // Add a loading animation for the uploaded track
    if (uploadLoading) {
        uploadAnim.addClass('is-visible');
    } else {
        uploadAnim.removeClass('is-visible');
    }

    */

    background(colorPalette[0]); //Drop Image in here

    fft.analyze();

    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy("treble");
    var mid = fft.getEnergy("mid");

    var mapbass = map(bass, 0, 255, -100, 800);
    var scalebass = map(bass, 0, 255, 0.5, 1.2);
    var radBass = map(bass, 0, 255, 10, 110);
    var modBass = map(bass, 0, 255, 0, 1);


    var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
    var scaleMid = map(mid, 0, 255, 1, 1.5);
    var pieceMid = map(mid, 0, 255, 0, 3.5);
    var modMid = map(mid, 0, 255, 0, 1);


    var mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
    var scaleTreble = map(treble, 0, 255, 1, 1.5);

   // peakDetect.update(fft);
  //  if ( peakDetect.isDetected ) {}
   	    //peakDetect.onPeak(someFunction);

    pieces = pieceMid;//mapMouseX;  // Float running fro 2 on the far l3ft to 0 on the far riht
    radius = radBass;  //rougly 75 - 120

    translate(width / 2, height / 2);


    for (i = 0; i < pieces; i += 0.01) {

        rotate(TWO_PI / pieces);

        /*----------  BASS  ----------*/
        push();
        strokeWeight(5*modBass);
        stroke(colorPalette[1]);
        scale(scalebass);
        rotate(frameCount*2);// * -0.5);
        line(mapbass, radius / 3, radius, radius);
        line(-mapbass, -radius / 4, radius, radius);
        pop();


        /*----------  MID  ----------*/
        push();
        strokeWeight(5*modMid);
        stroke(colorPalette[2]);
        line(mapMid, radius, radius * 1.5, radius * 2.5);
        pop();


        /*----------  TREMBLE  ----------*/
        push();
        stroke(colorPalette[3]);
        scale(scaleTreble);
        line(mapTreble, radius / 4.8, radius, radius);
        pop();

    }

}



function toggleAudio() {
    if (audio.isPlaying()) {
        audio.pause();
    } else {
        audio.play();
    }
}


function fullScren() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


