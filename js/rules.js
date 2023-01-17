const DEFAULT = { weight: 1, isTrue: true };

// some static rules
const rule1 = {
  roam: { weight: 1.0, isTrue: true },
  separate: { weight: 2.5, isTrue: true },
  align: { weight: 1.0, isTrue: false },
  cohesion: { weight: 1.0, isTrue: true },
}

const rule2 = {
  roam: { weight: 1.0, isTrue: true },
  separate: { weight: 1.0, isTrue: false },
  align: { weight: 1.0, isTrue: false },
  cohesion: { weight: 1.0, isTrue: true },
}

const rule3 = {
  roam: { weight: 1.0, isTrue: true },
  separate: { weight: 10, isTrue: true },
  align: { weight: 1.0, isTrue: false },
  cohesion: { weight: 1.0, isTrue: false },
}

const rule4 = {
  roam: { weight: 1.0, isTrue: true },
  separate: { weight: 1.0, isTrue: false },
  align: { weight: 1.0, isTrue: true },
  cohesion: { weight: 1.0, isTrue: false },
}

const ruleList = [rule1, rule2, rule3, rule4];

// Rules class, for further development
class Rules {
  constructor({roam=DEFAULT, seperate=DEFAULT, align=DEFAULT, cohesion=DEFAULT}) {
    this.roam = roam;
    this.seperate = seperate;
    this.align = align;
    this.cohesion = cohesion;
    this.init();
  }
  
  init() {
    this.roam = { weight: random(1.0, 2.5), isTrue: true };
    this.seperate = { weight: random(1.0, 2.5), isTrue: random([true, false]) };
    this.align = { weight: random(1.0, 2.5), isTrue: random([true, false]) };
    this.cohesion = { weight: random(1.0, 2.5), isTrue: random([true, false]) };
  }
  
  setRoam(weight, istrue) {
    this.roam = { weight: weight, isTrue: istrue };
  }
  
  setSeperate(weight, istrue) {
    this.seperate = { weight: weight, isTrue: istrue };
  }
  
  setAlign(weight, istrue) {
    this.align = { weight: weight, isTrue: istrue };
  }
  
  setCohesion(weight, istrue) {
    this.cohesion = { weight: weight, isTrue: istrue };
  }
}