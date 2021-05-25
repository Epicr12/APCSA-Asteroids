var ship;
var aster = [];
var laser = [];
var monoSynth;
var x; 
function setup() {
  createCanvas(400, 400);
  ship = new Ship();
  x = 5; 
  for (let i = 0; i < x; i++) {
    aster.push(new Asteroid());
  }
  monoSynth = new p5.MonoSynth();
  x = aster.length; 
}

function draw() {
  background(0);
  for(let i = aster.length -1; i >= 0; i--){ 
    if(ship.hits(aster[i])){ 
      let note = random(['Fb4', 'G4']);
      let velocity = 0.5;
      let time = 0;
      let dur = 1/6;
      monoSynth.play(note, velocity, time, dur);
      ship.reset(); 
      newAsteroids1 = aster[i].breakup(); 
      aster = aster.concat(newAsteroids1); 
    }
  }
  ship.render();
  ship.control();
  ship.update();
  
  for (let i = aster.length - 1; i >= 0; i--) {
    aster[i].render();
    aster[i].update();
  }
  if(aster.length == 0){ 
    ship.reset(); 
    for (let i = 0; i < x+1; i++) {
    aster.push(new Asteroid());
  }
  
  }

  for (let i = laser.length - 1; i >= 0; i--) {
    laser[i].render();
    laser[i].update();
    
    if (laser[i].offscreen()) {
      laser.splice(i, 1);
    } else {
      for (let j = aster.length - 1; j >= 0; j--) {
        
        if (laser[i].hits(aster[j])) {
          if (aster[j].r > 10) {
            var newAsteroids = aster[j].breakup(aster[j]);
            aster = aster.concat(newAsteroids);
          }
          
          aster.splice(j, 1);
          laser.splice(i, 1);
          break;
        }
      }
    }
  }
}
