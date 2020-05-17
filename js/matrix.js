var singleSymbol;
var symbolSize = 20;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var singleStream = new stream();
    singleStream.generateSybols(x, round(random(-1000, 0)));
    streams.push(singleStream);
    x += symbolSize
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 180);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function symbol(x, y, speed, first) {
  this.switchInterval = round(random(2, 20));
  this.first = first;
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.value;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  }

  this.render = function() {
    if (this.first) {
      fill(180, 255, 180);
    } else {
      fill(0, 255, 70);
    }
    text(this.value, this.x, this.y);
    this.rain();
    this.setToRandomSymbol();
  }

  this.rain = function() {
    if (this.y > height) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  }
}

function stream() {
  this.totalSybols = round(random(5, 30));
  this.symbols = [];
  this.speed = round(random(5, 20));

  this.generateSybols = function(x, y) {
    for (var i = 0; i <= this.totalSybols; i++) {
      var bright = round(random(0, 10)) == 1;
      singleSymbol = new symbol(x, y, this.speed, bright);
      singleSymbol.setToRandomSymbol();
      this.symbols.push(singleSymbol);
      y -= symbolSize;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      symbol.render();
    });
  }
}
