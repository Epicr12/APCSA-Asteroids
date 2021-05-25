function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.heading = 0;
  this.vel = createVector(0, 0);

  this.update = function () {
    this.pos.add(this.vel);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.x < 0) this.pos.x = width;
  }

  this.boost = function () {
    var force = p5.Vector.fromAngle(this.heading - PI / 2);
    force.mult(0.1);
    this.vel.add(force);
  }

  this.brake = function () {
    var force = p5.Vector.fromAngle(this.heading - (3 * PI) / 2);
    force.mult(0.1);
    this.vel.add(force);
  }

  //render will show the ship on the canvas
  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    noFill();
    stroke(255);
    quad(0, -10, -10, 15, 0, 5, 10, 15);
    pop();
  }

  this.control = function () {
    if (keyIsDown(65)) ship.turn(-0.1);
    if (keyIsDown(68)) ship.turn(0.1);
    if (keyIsDown(87)) ship.boost();
    if (keyIsDown(83)) ship.brake();
    if (keyIsDown(32)){ 
      laser.push(new Laser(ship.pos, ship.heading - PI / 2));
    }
  }

  this.turn = function (a) {
    this.heading += a;
  }
  
  this.hits = function(asteroid){ 
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x,asteroid.pos.y);
    if(d < asteroid.r){ 
      return true; 
    }
    else return false; 
  }
  
  this.reset = function(){ 
    push(); 
      this.pos.x = width/2; 
      this.pos.y = height/2; 
      this.vel = createVector(0, 0); 
    pop(); 
  }
}
