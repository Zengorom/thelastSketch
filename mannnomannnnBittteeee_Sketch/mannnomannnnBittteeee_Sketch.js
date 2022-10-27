let kMax;
let step;
let n = 10; // number of blobs
let radius = 5; // diameter of the circle
let inter = 2; // difference between the sizes of two blobs
let maxNoise = 500;

let noiseProg = (x) => (x);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
	angleMode(DEGREES);
  noFill();
	//noLoop();
	kMax = 1;
	step = 0.01;
	strokeWeight(2);
}

function draw() {
  background(0);
	let t = frameCount/100;
	kMax = noise(t/2);
  
  for (let i = 0; i < n; i++) {
		let alpha = 1 - noiseProg(i / n);
		stroke(135 + i / n * 80, 200, 255);
		strokeWeight(noise(t + i/n)*2 + 1);
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);
    blob(size, width/2, height/2, k, t + i * step, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 500;
  for (let theta = 0; theta < 360; theta += angleStep) {
    let r1, r2;

		r1 = cos(theta)+1;
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}