const NOISE_SCALE = Math.PI * 400;
const MAX_SPEED = 3; // Maximum speed
const MAX_FORCE = 0.05; // Maximum steering force

// Boid class
class Boid {
  constructor(x, y, rules) {
    this.r = 3.0;
    
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    
    this.size = random(sizes[0],sizes[1]);
    this.rules = rules;
    
    this.roamRule = rules.roam;
    this.separateRule = rules.separate;
    this.alignRule = rules.align;
    this.cohesionRule = rules.cohesion;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.draw();
  }
  
  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  // accumulate a new acceleration each time based on all rules
  flock(boids) {
    let rom = this.roam(); //Roam
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids);    // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    rom.mult(this.roamRule.weight);
    sep.mult(this.separateRule.weight);
    ali.mult(this.alignRule.weight);
    coh.mult(this.cohesionRule.weight);
    // Add the force vectors to acceleration
    if(this.roamRule.isTrue)
      this.applyForce(rom);
    if(this.separateRule.isTrue)
      this.applyForce(sep);
    if(this.alignRule.isTrue)
      this.applyForce(ali);
    if(this.cohesionRule.isTrue)
      this.applyForce(coh);
  }
  
  // update location
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(MAX_SPEED);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  // calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); 
    desired.normalize();
    desired.mult(MAX_SPEED);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(MAX_FORCE); 
    return steer;
  }
  
  // Draw boid as a circle
  draw() {
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
  }
  
  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
  
  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    // This variable specifies how close is too close.
    let desiredseparation = 25.0;
    
    let steer = createVector(0, 0);
    let count = 0;
    // track how many boids are too close
    for (let boid of boids) {
      let d = p5.Vector.dist(this.position, boid.position);
      if ((d > 0) && (d < desiredseparation)) {
        let diff = p5.Vector.sub(this.position, boid.position);
        diff.normalize();
        steer.add(diff);
        count++; 
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }
  
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(MAX_SPEED);
      steer.sub(this.velocity);
      steer.limit(MAX_FORCE);
    }
    return steer;
  }
  
  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let boid of boids) {
      let d = p5.Vector.dist(this.position, boid.position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boid.velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(MAX_SPEED);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(MAX_FORCE);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  // Cohesion
  //For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location 
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }  
  
  //Roam
  //For every boid move aimlessly
  roam() {
    //steering angle
    let theta = noise(this.position.x / NOISE_SCALE, this.position.y / NOISE_SCALE) * Math.PI * 2;
    let steer = createVector(0,0);
    let desired = this.velocity.copy().rotate((tan2((theta) * ctg2(theta))));
    steer = p5.Vector.sub(desired, this.velocity);
    return steer;
  }
}