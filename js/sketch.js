/******************
title
Yanan Liu
Press key "s" to save the screenshot.

References: 
https://p5js.org/examples/hello-p5-flocking.html
https://openprocessing.org/sketch/826636
******************/

let groups = [];
let groupNums = 4;
let amountRange = [50,200]; // range of particle numbers in the group

let unit = (Math.PI ** ((1 + Math.sqrt(5)) / 2));
let sizes = [unit / 5, unit / 3];
let saveInterval = 60; // auto save screenshot interval (s

function setup() {
  createCanvas(500, 500);
  background(15, 12, 22);
  
  for(let i=0; i<groupNums; i++) {
    let num = random(amountRange[0],amountRange[1]);
    // give higher alpha values for group with fewer particles
    let alpha = map(num, amountRange[0], amountRange[1], 30, 15);
    let color = rCol(alpha);
    let rule = ruleList[i];
    
    let bg = new BoidGroup(color, num, rule);
    groups.push(bg);
    // initialize all the groups
    BoidGroup.populate(bg);
  }
  
  // auto save current canvas
  // setInterval(() => {
  //   save("screenshot.png");
  // }, 1000 * saveInterval);
}

function draw() {
  // run all the biod group
  for (let group of groups) {
    group.run();
  }
}

// Press key "s" to save a screenshot
function keyPressed({key}) {
  if (key === 's') {
    save("screenshot.png");
  }
}

