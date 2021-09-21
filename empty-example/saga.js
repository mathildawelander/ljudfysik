var song
var fft
var img
var mic


function preload() {
   song = loadSound('thunder.mp3')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    imageMode(CENTER)

    mic = new p5.AudioIn();
    //mic.start();
    fft = new p5.FFT(0.8,512);

/* --------- MicInput -------*
mic = new p5.AudioIn();
mic.start();
fft = new p5.FFT(0.8,512);
fft.setInput(mic);
/*----------------------------*/

col = color(0,200,200,255)

button = createButton('Song');
  button.position(40, 200);
  button.size(80,30)
  button.style('border', 0);
  button.mousePressed(inputSong);

  button2 = createButton('Microphone');
  button2.position(140, 200);
  button2.size(80,30)
  button2.style('border',0)
  button2.font-
  button2.mousePressed(inputMic);

    /*--- Background image----
    img.filter(BLUR,10)
   ----------------------- */
}



function inputMic() {
    loop()
    mic.start()
    if (song.isPlaying()) {
        song.pause()
    }
    fft.setInput(mic);
}


function inputSong() {
    mic.stop()   
    fft.setInput(song)
    if (song.isPlaying()) {
        song.pause()
        noLoop()
    } else {
      song.play()
        loop()
    }
}

  function draw() {
    background(0)
    
    var spectrum = fft.analyze()

    /*--------logAverages---------
    var octaveBands = fft.getOctaveBands(10)
    var newSpectrum = fft.logAverages(octaveBands)
    /*--------------------------*/

    var scale

    amp = fft.getEnergy(20, 200)

    if (amp>250){
        scale=300
    } else if (amp>140)
    {
        scale = 250
    } else if(amp > 90)
    {
        scale = 230
    } else if (amp > 50)
    {
        scale = 200
    } else {
        scale = 160
    }

    /*------------logAverage---------------*/
    //for(i = 0; i <= newSpectrum.length; i++)
    /*-------------------------------------*/

   for(i = 0; i <= spectrum.length; i++)
    {
       
        /*--------------Log------------------*/
        
        if(i == 0)
        {
            i = 1;
        }

        var index = map(log(i),0,log(spectrum.length),0, 360)
        var size = map(spectrum[i], 0, 255, 0, height/4);
        
        /*----------------------------------*/

        /* -------- Original -------------*
        var index = map(i,0,spectrum.length,0, 360)
        var size = map(spectrum[i], 0, 255, 0, height/4);
        ----------------------------------*/

        /*------------logAverage---------------
        var index = map(i,0,newSpectrum.length,0, 360)
        var size = map(newSpectrum[i], 0, 255, 0, height/4);
        /*--------------------------------------*/

        var x = width/2 + scale * sin(index)
        var y = height/2 + scale * cos(index)
        
    push()

        if(spectrum[i] > 150){
            fill(0,200,200,255)
        } else if (spectrum[i]>110){
            fill(0,200,200,150)
        } else {
            fill(0,200,200, 50)
        }
        
        noStroke()
        translate(x,y)
        rotate(180-index)
        rect(0, 0,5, size)
            
        translate(-x,-y)

    pop()


  }
  }

  /*
function mouseClicked() {
      if (song.isPlaying()) {
          song.pause()
          noLoop()
      } else {
  //        song.play()
          loop()
      }
  }*/
