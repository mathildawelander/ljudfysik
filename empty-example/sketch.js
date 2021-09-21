var song
var fft
var w;
var availh;
var availw;

function preload()
{
  song = loadSound("thunder.mp3");
  song1= loadSound("100hz.mp3");
  song2= loadSound("250hz.mp3");
  song3= loadSound("1khz.mp3");
  song4= loadSound("10khz.mp3");
}

    /*--- Background image----
    img.filter(BLUR,10)
   ----------------------- */



function setup() {
  console.log(screen.availWidth);
  console.log(screen.availHeight);
  console.log(screen.width);
  console.log(screen.height);
  createCanvas(screen.availWidth-20, 552);
  var availw= screen.availWidth;
  colorMode(HSB);
  angleMode(DEGREES);
  fft= new p5.FFT(0.9, 512);
  w= availw/512;
 

  button = createButton('Song');
  button.position(40, 200);
  button.size(90,30)
  button.style('border', 0);
  button.style('border','1px solid');
  button.style('font-family', 'Bahnschrift')
  button.style('background-image', 'linear-gradient(to top, #80978af6 0%, #85a398 100%)')
  button.style('font-size', '1rem')
  button.style('border-radius', '1rem')
  button.mousePressed(songplay);

  button2 = createButton('100 hz');
  button2.position(140, 200);
  button2.size(90,30)
  button2.style('border',0);
  button2.style('border','1px solid');
  button2.style('font-family', 'Bahnschrift')
  button2.style('background-image', 'linear-gradient(to top, #80978af6 0%, #85a398 100%)')
  button2.style('font-size', '1rem')
  button2.style('border-radius', '1rem')
  button2.mousePressed(onehzplay);

  button3 = createButton('250 hz');
  button3.position(240, 200);
  button3.size(90,30)
  button3.style('border', 0);
  button3.style('border','1px solid');
  button3.style('font-family', 'Bahnschrift')
  button3.style('background-image', 'linear-gradient(to top, #80978af6 0%, #85a398 100%)')
  button3.style('font-size', '1rem')
  button3.style('border-radius', '1rem')
  button3.mousePressed(twohzplay);

  button4 = createButton('1k hz');
  button4.position(340, 200);
  button4.size(90,30)
  button4.style('border','1px solid');
  button4.style('font-family', 'Bahnschrift')
  button4.style('background-image', 'linear-gradient(to top, #80978af6 0%, #85a398 100%)')
  button4.style('font-size', '1rem')
  button4.style('border-radius', '1rem')
  button4.mousePressed(onekhzplay);

  button5 = createButton('10k hz');
  button5.position(440, 200);
  button5.size(90,30)
  button5.style('border',0)
  button5.style('border','1px solid');
  button5.style('font-family', 'Bahnschrift')
  button5.style('background-image', 'linear-gradient(to top, #80978af6 0%, #85a398 100%)')
  button5.style('font-size', '1rem')
  button5.style('border-radius', '1rem')
  button5.mousePressed(tenkhzplay);

}
function songplay() {
  song1.stop();
  song2.stop();
  song3.stop();
  song4.stop();
  fft.setInput(song)
  if (song.isPlaying()) {
      song.pause()
      noLoop()
  } else {
    song.play()
      loop()
  }}

function onehzplay() {
  song.stop();
  song2.stop();
  song3.stop();
  song4.stop();
  fft.setInput(song1)
  console.log("hej");
  if (song1.isPlaying()){
      song1.pause()
      noLoop()
  } else {
    song1.play()
      loop()
  }
}

function twohzplay() {
  song.stop();
  song2.stop();
  song3.stop();
  song4.stop();
  fft.setInput(song2)
  console.log("hej");
  if (song2.isPlaying()){
      song2.pause()
      noLoop()
  } else {
    song2.play()
      loop()
  }
}

function onekhzplay() {
  song.stop();
  song1.stop();
  song2.stop();
  song4.stop();
  fft.setInput(song3)
  console.log("hej");
  if (song3.isPlaying()){
      song3.pause()
      noLoop()
  } else {
    song3.play()
      loop()
  }
}
function tenkhzplay() {
  song.stop();
  song1.stop();
  song2.stop();
  song3.stop();
  fft.setInput(song4)
  console.log("hej");
  if (song4.isPlaying()){
      song4.pause()
      noLoop()
  } else {
    song4.play()
      loop()
  }
}

function draw() {
  background(0);
  var wave = fft.analyze();
  console.log(wave.length);
  stroke(255);
  for(var i=1; i< wave.length;i++){
  var index= wave[i];
  var y= map(index, 0, 256, screen.availHeight-20,0);
  fill(y,y,y);
  rect(i*w, y, w ,screen.availHeight-y);
  
  }
}

//all jävla funktioner för stop på sång
