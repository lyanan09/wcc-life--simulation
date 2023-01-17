// BoidGroup class
class BoidGroup {
  // populate group with boid object
  static populate(group) {
    for (let i = 0; i < group.amount; i++) {
      let x = rInc(width, unit/(Math.PI * 2));
      let y = rInc(height, unit/(Math.PI * 2));
      group.container.push(new Boid(x, y, group.rules));
    }
  }

  constructor(color, amount, rules) {
    this.color = color;
    this.amount = amount;
    this.container = []; // place to put boids
    this.rules = rules; // the behaviors of the group
    this.populated = false;
  }

  // run the boid group
  run() {
    if (this.populated == false) {
      BoidGroup.populate(this);
      this.populated = true;
    }

    for (let boid of this.container) {
      fill(this.color);
      boid.run(this.container);
    }
  }
}