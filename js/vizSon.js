var hcCov, pieces, r,g,b, description, fs, radius, fft, peakDetect, audio, toggleBtn,txtNotes;
var colorPalette = ["#E97611", "#8A63D3", "#7A2500", "#504623", "#3F4B23", "#A04B82"]


var uploadLoading = false;

function preload() {
    audio = loadSound("audio/ColdwaterPass.mp3");

}

function setup() {

    createCanvas(windowWidth, windowHeight);

    txtNotes = createDiv('<p>Coldwater Pass is a data-driven composition that explores some of the human dimensions of Ireland’s economic crash focusing specifically on the relationship between poverty, drug crime, emigration, and suicide.</br></br>It exploits the power of sound to re-embody the impersonal statistical data revealing aspects of the human realities underlying the cold hard facts. The piece uses a complex mapping strategy to map data that represents Deprivation Rate, Unemployment Rate, Emigration Rate, Drug Related Crime Rate and Annual Suicide Rate from 2007 to 2012 to musical features. This mapping manipulates patterns of tension and release in the musical material in order to communicate a sense of the human realities underlying the socioeconomic data. </br></br> The piece is driven by a Csound algorithm that maps the data to vocal synthesis parameters defined by in Native Instruments Reaktor synthesis engine. Input data is rescaled and assigned to midi note, pan and CC data that is ported into Logic Pro X.</br></br>GNP, Unemployment and Emigration Rate are mapped to create a background harmonic material while Deprivation rate and Drug Crime offenses create a type of foreground call and response pattern that is spatially distrusted with Drug Crime presented on the right and Deprivation rate on the left. All of this is underpinned by a rhythmic percussion pattern for which each hit indicates 60 suicides. Parameters such as vowel shape note length and formant shape are leveraged in the expression of the data through tension patterns.</br></br> Coldwater Pass is part of a longer collection of data-driven compositions and sonifications entitled The Human Cost.</p>');
    txtNotes.addClass("txt-note");

    hcCov = createDiv('<img src="lib/HumanCost.jpg"></img>')
    //hcCov =  createImg('lib/HumanCost.jpg'); / Divs are easier to style
    hcCov.addClass("hc-img");

    toggleBtn = createButton("Begin");
    toggleBtn.addClass("toggle-btn");

    toggleBtn.mousePressed(toggleAudio);
    toggleBtn.mousePressed(clearLanding);
    toggleBtn.mousePressed(fullscreen);


    fft = new p5.FFT();

    pieces = 32;
    radius = windowHeight / 4;




}

function draw() {

    fft.analyze();

    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy("treble");
    var mid = fft.getEnergy("mid");

    var mapbass = map(bass, 0, 255, -100, 800);
    var scalebass2 = map(bass, 0, 255, 0.5, 1.2);
    var scalebass = map(bass, 0, 255, 0.01, .75);

    var radBass = map(bass, 0, 255, 10, 110);
    var modBass = map(bass, 0, 255, 0, 1);


    var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
    var scaleMid = map(mid, 0, 255, 1, 1.5);
    var pieceMid = map(mid, 0, 255, 0, 3.5);
    var modMid = map(mid, 0, 255, 0, 1);


    var mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
    var scaleTreble = map(treble, 0, 255, 1, 1.5);
    var modTreb = map(treble, 0, 255, 0, 1);
    var modColor = map(treble, 0, 255, 0, width);


    pieces = pieceMid;
    radius = radBass;  //rougly 75 - 120

    translate(width / 2, height / 2);


//Update background

	r = 182;
	g = 67;
	b = 5;

	r,g,b = modColor/3;
 	background (r,g,b);
 	fill (148, 109, 191);


//Create Boxes in Boxes and drive them from audio

//box1
  rectMode(CENTER);
  strokeWeight(4);
  noFill();
  stroke(0,(255*modTreb));
  rotate(TWO_PI*modTreb);
  rect(0,0,750,750);

//box2
  rectMode(CENTER);
  strokeWeight(4);
  noFill();
  stroke(0,(255*modMid));
  rotate(TWO_PI*modMid);
  rect(0,0,450,450);

//box3
  rectMode(CENTER);
  strokeWeight(4);
  noFill();
  stroke(0,(255*modBass));
  rotate(TWO_PI*modBass);
  rect(0,0,250,250);


  //fill (0,(150*modTreb)); // Display max at half opacity- mapped to treble
  //rect(0,0,650,650);


// Draw out the crcular line shapes
    for (i = 0; i < pieces; i += 0.01) {
        rotate(TWO_PI / pieces);

        /*----------  BASS 1 ----------*/
        push();
        strokeWeight(2*modBass);
        stroke(colorPalette[0]);
        scale(scalebass);
        rotate(.01);// * -0.5);
        line(mapbass, radius , radius, radius);
       // line(-mapbass,radius*.5 , radius*.5, radius*.5);
        pop();


        /*----------  BASS 2 ----------*/

        push();
        strokeWeight(3*modBass);
        stroke(colorPalette[2]);
        scale(scalebass);
        rotate(.03);// * -0.5);
       // line(mapbass, radius , radius, radius);
        line(-mapbass*.5,radius*.5 , radius*.5, radius*.5);
        pop();


        /*----------  BASS 3 ----------*/

        push();
        strokeWeight(4*modBass);
        stroke(colorPalette[3]);
        scale(scalebass);
        rotate(.05);// * -0.5);
       // line(mapbass, radius , radius, radius);
        line(-mapbass*.75,radius*.75 , radius*.75, radius*.75);
       // directionalLight(colorPalette[0], 3, 3, 5);
        pop();


        /*----------  MID  ----------*/
        push();
        strokeWeight(5*modMid);
        stroke(colorPalette[4]);
        line(mapMid, radius, radius * 1.5, radius * 2.5);
        pop();


        /*----------  TREMBLE  ----------*/
        push();
        strokeWeight(8*modTreb);
        stroke(colorPalette[5]);
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

function clearLanding() {
  if (audio.isPlaying()) {
    txtNotes.remove();
    hcCov.remove();
    toggleBtn.hide();
  }
}



function fullScren() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
