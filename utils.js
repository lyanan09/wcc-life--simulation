// some colors for testing
// const color1 = color(211,227,227,15);
// const color2 = color(48,110,246,15);
// const color3 = color(2,206,143,15);
// const color4 = color(46,91,163,15);
// const color5 = color(45,146,149,15); //green
// const color6 = color(105,38,253,15); //purple

/**rInc()
* description: returns a random value within a specified range, rounded to a user-specified increment.
* parameters: (input, increment, ['CEIL', 'FLOOR', 'ROUND'])
*/
function rInc(input, increment, roundingType='ROUND') {
  return inc(Math.random() * input, increment, roundingType);
}
function inc(input, increment, roundingType='ROUND') {
  if (roundingType === 'FLOOR') {
      return Math.floor(input / increment) * increment;
  } else if (roundingType === 'CEIL') {
      return Math.ceil(input / increment) * increment;
  } else if (roundingType === 'ROUND') {
      return Math.round(input / increment) * increment;
  }
}

/** rCol()
description: returns a random color.
parameters: (return p5 color object or array, alpha value, maximum red value, maximum green value, maximum blue value)
*/
function rCol(alpha=255, rMax=255, gMax=255, bMax=255, isP5Color=true) {
  if (isP5Color === false) {
    let r = Math.random() * rMax;
    let g = Math.random() * gMax;
    let b = Math.random() * bMax;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  } else {
    return color(Math.random() * rMax, Math.random() * gMax, Math.random() * bMax, alpha);
  }
}


function asinh(input) {
  return Math.asinh(input);
}

function acosh(input) {
  return Math.acosh(input);
}

function atanh(input) {
  return Math.atanh(input);
}

function sinh(input) {
  return Math.sinh(input);
}

function cosh(input) {
  return Math.cosh(input);
}

function tanh(input) {
  return Math.tanh(input);
}

function ctg(input){
  return 1/Math.tan(input);
}

function sec(input){
  return 1/Math.cos(input);
}

function csc(input){
  return 1/Math.sin(input);
}

function sin2(input){
  return (1-Math.cos(2*input))/2;
}

function cos2(input){
  return (1+Math.cos(2*input))/2;
}

function tan2(input){
  return (sin2(input)*2)/(cos2(input)*2);
}

function ctg2(input){
  return (cos2(input)*2)/(sin2(input)*2);
}