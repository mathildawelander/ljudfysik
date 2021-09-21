var song
var fft
var particles = []

function preload() {
  song = loadSound("thunder.mp3");
  song1= loadSound("100hz.mp3");
  song2= loadSound("250hz.mp3");
  song3= loadSound("1khz.mp3");
  song4= loadSound("10khz.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  fft = new p5.FFT(0.1)

  
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

function draw() {
  background(0)
  stroke(255)
  strokeWeight(3)
  noFill()

  translate(width / 2, height / 2)

  fft.analyze()
  amp = fft.getEnergy(20, 200)

  var wave = fft.waveform()

  for (var t = -1; t <= 1; t+= 2) {
    beginShape()
    for (var i = 0; i <= 180; i += 0.5) {
      var index = floor(map(i, 0, 180, 0, wave.length - 1))
  
      var r = map(wave[index], -1, 1, 150, 350)
  
      var x = r * sin(i) * t
      var y = r * cos(i)
      vertex(x, y)
    }
    endShape()
  }

  var p = new Particle()
  particles.push(p)

  for (var i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230)
      particles[i].show()
    } else {
      particles.splice(i, 1)
    }
    
  }

}


class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3, 5)

    this.color = [random(200, 255), random(200, 255), random(200, 255)]
  }
  update(cond){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  edges() {
    if (this.pos.x < -width / 2 || this.pos.x > width / 2 ||
      this.pos.y < -height / 2 || this.pos.y > height/ 2) {
        return true
      } else {
        return false
      }
  }
  show() {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
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
