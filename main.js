class BowlingGame {
    constructor() {
      this.frames = Array(10);
    }
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    fillFrames() {
      for (let i = 0; i < this.frames.length; i++) {
        let firstRoll = this.getRandomInt(11);
        let secondRoll = this.getRandomInt(11 - firstRoll);
        this.frames[i] = [firstRoll, secondRoll];
      }
    }
    fillLastFrame() {
      let firstRoll = this.getRandomInt(11);
      let secondRoll = 0;
      let thirdRoll = 0;
      if (firstRoll === 10) {
        secondRoll = this.getRandomInt(11);
        if (secondRoll === 10) {
          thirdRoll = this.getRandomInt(11);
        }
      } else {
        secondRoll = this.getRandomInt(11 - firstRoll);
        if (firstRoll + secondRoll === 10) {
          thirdRoll = this.getRandomInt(11);
        }
      }
  
      this.frames[9] = [firstRoll, secondRoll, thirdRoll];
      console.table(this.frames)
    }
    playGame() {
      this.fillFrames();
      this.fillLastFrame();
      this.calculatePoints();
      for (let i = 0; i < 9; i++) {
        this.calculateBonus(this.frames[i], this.frames[i + 1]);
  
      }
  
      let sum = this.frames.reduce((sum, array) => {
        return array.length >= 3 ? sum + array[2] : sum;
      }, 0);
      sum += this.frames[9][3]
  
      console.log("Puntos finales = ", sum);
    }
    calculatePoints() {
      for (let i = 0; i < this.frames.length; i++) {
        this.frames[i].push(this.frames[i][0] + this.frames[i][1]);
      }
    }
    calculateBonus(frame, nextFrame) {
      if (this.isStrike(frame)) {
        let sum = nextFrame[2];
        frame[2] += sum;
      }
      if (this.isPar(frame)) {
        frame[2] += nextFrame[0];
      }
    }
  
    isStrike(frame) {
      if (frame[0] === 10) {
        return true;
      }
    }
  
    isPar(frame) {
      if (frame[0] < 10 && frame[0] + frame[1] === 10) {
        return true;
      } else {
        false;
      }
    }
}
const test = new BowlingGame();  
test.playGame();
  
  