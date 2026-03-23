const headerSketchCode = `
let nodi = [];
let numNodi = 400;           
let distanzaMassima = 100;    
let forzaAttrazione = 2;    
let raggioMouse = 500;        

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numNodi; i++) {
    nodi.push(new Nodo());
  }
}

function draw() {
  background(0); 

  let activeRaggio = raggioMouse;
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    activeRaggio = -1; 
  }

  for (let i = 0; i < nodi.length; i++) {
    nodi[i].update();
    nodi[i].display();
    nodi[i].checkBordi();

    for (let j = i + 1; j < nodi.length; j++) {
      let d = dist(nodi[i].pos.x, nodi[i].pos.y, nodi[j].pos.x, nodi[j].pos.y);
      if (d < distanzaMassima) {
        let opacita = map(d, 0, distanzaMassima, 200, 0);
        stroke(100, 50, 255, opacita); 
        strokeWeight(1);
        line(nodi[i].pos.x, nodi[i].pos.y, nodi[j].pos.x, nodi[j].pos.y);
      }
    }
    
    if (activeRaggio > 0) {
        let dMouse = dist(mouseX, mouseY, nodi[i].pos.x, nodi[i].pos.y);
        if (dMouse < activeRaggio) {
            let forza = createVector(mouseX - nodi[i].pos.x, mouseY - nodi[i].pos.y);
            forza.setMag(forzaAttrazione);
            nodi[i].pos.add(forza); 
            
            stroke(0, 255, 255, map(dMouse, 0, activeRaggio, 150, 0)); 
            line(mouseX, mouseY, nodi[i].pos.x, nodi[i].pos.y);
        }
    }
  }
}

function mouseExited() {
  mouseX = -5000;
  mouseY = -5000;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Nodo {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.5, 1.5)); 
    this.dim = random(3, 6);
  }
  update() {
    this.pos.add(this.vel);
  }
  display() {
    noStroke();
    fill(200, 200, 255); 
    ellipse(this.pos.x, this.pos.y, this.dim);
  }
  checkBordi() {
    if (this.pos.x < 0 || this.pos.x > width) {
        this.vel.x *= -1;
        this.pos.x = constrain(this.pos.x, 0, width);
    }
    if (this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1;
        this.pos.y = constrain(this.pos.y, 0, height);
    }
  }
}
`

const sketchCode2 = `
let blobs = [];
let numBlobs = 12;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  let palette = [200, 280, 330, 170, 20]; 
  for (let i = 0; i < numBlobs; i++) {
    blobs.push(new SuperBlob(random(palette)));
  }
}

function draw() {
  background(0); 
  blendMode(SCREEN);
  for (let b of blobs) {
    b.update();
    b.display();
  }
  blendMode(BLEND);
}

class SuperBlob {
  constructor(h) {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.2, 1)); 
    this.hue = h;
    this.baseRadius = random(60, 200); 
    this.numPoints = 35; 
    this.offsets = [];
    this.angles = [];
    for (let i = 0; i < this.numPoints; i++) {
      this.offsets.push(0);
      this.angles.push(map(i, 0, this.numPoints, 0, TWO_PI));
    }
  }
  update() {
    this.pos.add(this.vel);
    if (this.pos.x < -200 || this.pos.x > width + 200) this.vel.x *= -1;
    if (this.pos.y < -200 || this.pos.y > height + 200) this.vel.y *= -1;
    let mouse = createVector(mouseX, mouseY);
    for (let i = 0; i < this.numPoints; i++) {
      let x = cos(this.angles[i]) * this.baseRadius;
      let y = sin(this.angles[i]) * this.baseRadius;
      let pPos = createVector(this.pos.x + x, this.pos.y + y);
      let d = dist(pPos.x, pPos.y, mouse.x, mouse.y);
      let targetOffset = 0;
      if (d < 300) {
        targetOffset = map(d, 0, 300, 150, 0);
      }
      let n = noise(this.pos.x * 0.01, i * 0.2, frameCount * 0.02);
      targetOffset += map(n, 0, 1, -30, 30);
      this.offsets[i] = lerp(this.offsets[i], targetOffset, 0.1);
    }
  }
  display() {
    noStroke();
    for (let i = 20; i > 0; i--) {
      let step = i / 20;
      fill(this.hue, 90, 80, map(step, 0, 1, 0.4, 0.05));
      beginShape();
      for (let j = 0; j < this.numPoints + 3; j++) {
        let index = j % this.numPoints;
        let r = (this.baseRadius + this.offsets[index]) * step;
        let x = this.pos.x + cos(this.angles[index]) * r;
        let y = this.pos.y + sin(this.angles[index]) * r;
        curveVertex(x, y);
      }
      endShape(CLOSE);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
`

const sketchCode1 = `
let curves = [];
let oldWidth, oldHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  oldWidth = width;
  oldHeight = height;
  background(0);
  curves.push(new OrganicCurve(random(200, 800), random(255), 50)); 
  curves.push(new OrganicCurve(random(200, 800), random(255), random(255))); 
}

function draw() {
  curves[0].update(0.0002, 0.001);
  curves[1].update(0.002, 0.001);
  curves[0].display(true);  
  curves[1].display(false); 
}

class OrganicCurve {
  constructor(variance, c1, c2) {
    this.vari = variance;
    this.c1 = c1;
    this.c2 = c2;
    this.off1 = 0; this.off2 = 0; this.off3 = 0; this.off4 = 0; this.offB = 0;
    this.ioff1 = 0; this.ioff2 = 0; this.ioff3 = 0; this.ioff4 = 0; this.ioffB = 0;
    this.start1 = 0; this.start2 = 0; this.start3 = 0; this.start4 = 0; this.startB = 0;
  }
  update(speedX, speedY) {
    this.ioff1 += speedX;
    this.ioff2 += speedY;
    let inc1 = map(noise(this.ioff1), 0, 1, 0.0002, 0.005);
    let inc2 = map(noise(this.ioff2), 0, 1, 0.0001, 0.005);
    this.ioff3 += 0.0002;
    this.ioff4 += 0.002;
    let inc3 = map(noise(this.ioff3), 0, 1, 0.002, 0.005);
    let inc4 = map(noise(this.ioff4), 0, 1, 0.001, 0.005);
    this.ioffB += 0.0002;
    let incB = map(noise(this.ioffB), 0, 1, 0.001, 0.005);
    this.start1 += inc1;
    this.start2 += inc2;
    this.start3 += inc3;
    this.start4 += inc4;
    this.startB += incB;
  }
  display(isShadow) {
    let midY = height / 2;
    let xV = map(noise(this.start1), 0, 1, width/3 - this.vari/2, width/3 + this.vari/2);
    let yV = map(noise(this.start2), 0, 1, midY - this.vari/3, midY + this.vari/3);
    let xV1 = map(noise(this.start3), 0, 1, (width/3)*2 - this.vari/2, (width/3)*2 + this.vari/2);
    let yV1 = map(noise(this.start4), 0, 1, midY - this.vari/3, midY + this.vari/3);
    let bVal = map(noise(this.startB), 0, 1, 20, 220);
    strokeWeight(5);
    if (isShadow) {
      stroke(0, 50);
    } else {
      stroke(bVal, bVal + this.c1, bVal + this.c2);
    }
    noFill();
    beginShape();
    curveVertex(0, midY);
    curveVertex(0, midY);
    curveVertex(xV, yV);
    curveVertex(xV1, yV1);
    curveVertex(width, midY);
    curveVertex(width, midY);
    endShape();
  }
}

function mousePressed() {
  if (isLooping()) noLoop();
  else loop();
}

function windowResized() {
  let wRatio = windowWidth / width;
  let hRatio = windowHeight / height;
  resizeCanvas(windowWidth, windowHeight);
  for (let c of curves) {
    c.vari *= min(wRatio, hRatio);
  }
  background(0);
  oldWidth = width;
  oldHeight = height;
}
`

const sketchCode3 = `
let spheres = [];
let numSpheres = 300;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < numSpheres; i++) {
    spheres.push({
      x: random(-1000, 1000),
      y: random(-500, 500),
      z: random(-1000, 1000),
      size: random(15, 50),
      offset: random(TWO_PI)
    });
  }
}

function draw() {
  background(0);
  orbitControl();
  rotateX(angle * 0.02);
  rotateY(angle * 0.01);
  ambientLight(50);
  directionalLight(255, 255, 255, 0.3, -1, -0.5);
  for (let s of spheres) {
    push();
    let zOsc = sin(angle + s.offset) * 20;
    translate(s.x, s.y, s.z + zOsc);
    let r = map(sin(angle + s.offset), -1, 1, 50, 255);
    let g = map(cos(angle + s.offset), -1, 1, 50, 200);
    let b = map(sin(angle * 1.5 + s.offset), -1, 1, 100, 255);
    noFill();
    stroke(r, g, b, 200);
    strokeWeight(0.5);
    sphere(s.size);
    pop();
  }
  angle += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
`

const finalSketch = `
let spaziatura = 40;
let dimensioneBase = 20;
let nodi = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  let colonne = width / spaziatura;
  let righe = height / spaziatura;

  for (let i = 0; i < colonne; i++) {
    for (let j = 0; j < righe; j++) {
      nodi.push({
        x: i * spaziatura + spaziatura / 2,
        y: j * spaziatura + spaziatura / 2,
        offset: random(TWO_PI),
        velocita: random(0.02, 0.05),
        colore: color(random(100, 255), random(100, 255), 255)
      });
    }
  }
}

function draw() {
  background(00);
  noStroke();

  for (let n of nodi) {
    let pulsazione = sin(frameCount * n.velocita + n.offset);
    let dimensione = dimensioneBase + pulsazione * 20;
    
    fill(n.colore);
    rect(n.x, n.y, dimensione, dimensione, dimensione * 0.2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  nodi = [];
  setup();
}
`

import OutlineButton from './OutlineButton'
import BlackButton from './BlackButton'
import P5Iframe from './P5Iframe'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import FadeInSection from './FadeInSection'
import { addToken, addUserId } from '../redux/actions/loginAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function Homepage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const verifyToken = function () {
    if (token) {
      fetch('http://localhost:3001/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('Errore nella response')
          }
        })
        .then((data) => {
          console.log(data)
          if (!data.validatedToken) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            dispatch(addToken(null))
            dispatch(addUserId(null))
            navigate('/')
          }
        })
        .catch((err) => {
          console.log('ERRORE :', err)
        })
    }
  }

  useEffect(() => {
    verifyToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, token)

  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      <FooterDesktop />

      <div className="relative w-full h-screen text-gray-50">
        <P5Iframe p5Code={headerSketchCode} />
        <div className="w-full px-12 md:px-20 xl:px-25 absolute bottom-0">
          <div className="pb-34 md:pb-38 lg:pb-20 xl:pb-25">
            <p className="font-semibold text-5xl md:text-6xl xl:text-7xl  fs-1">
              Genera
            </p>
            <p className="font-light italic text-sm md:text-base xl:text-xl fs-1 pt-2">
              Create beyond the canvas
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row lg:items-center justify-between py-60">
          <div className="w-full lg:w-1/3">
            <FadeInSection delay={100}>
              <p className="font-extrabold text-4xl md:text-5xl 2xl:text-6xl">
                WHERE CODE BECOMES LIVING ART
              </p>
            </FadeInSection>
          </div>
          <div className="w-full lg:w-2/3 lg:ps-20 2xl:ps-80">
            <FadeInSection delay={300}>
              <p className="pt-10 lg:pt-0 text-lg lg:text-xl">
                Discover, interact, and learn through code. Share your work on{' '}
                <span className="italic font-bold">Genera</span> and be part of
                a new generation of digital creators. Step into a world of
                generative and interactive experences.
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>

      <div className="w-full bg-black text-gray-50">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row lg:items-end lg:justify-between py-30">
          <div className="w-full lg:w-2/4 2xl:w-2/3 lg:pe-30 2xl:pe-80 pb-30 lg:pb-0">
            <div className="pb-20 lg:pb-30">
              <FadeInSection delay={100}>
                <p className="font-extrabold text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                  GENERATIVE ART
                </p>
              </FadeInSection>
              <FadeInSection delay={300}>
                <p className="text-lg 2xl:text-xl pt-5">
                  Trough code, randomness, and logic, each piece becomes a
                  living process-constantly changing, never exactly the same.
                </p>
              </FadeInSection>
            </div>
            <FadeInSection delay={600}>
              <div
                onClick={() => {
                  navigate('/discover')
                }}
              >
                <OutlineButton text="DISCOVER" size="xl" />
              </div>
            </FadeInSection>
          </div>
          <div className="w-full lg:w-2/4 2xl:w-1/3 aspect-square">
            <P5Iframe p5Code={sketchCode1} />
          </div>
        </div>
      </div>

      <div className="w-full bg-black text-gray-50">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row-reverse lg:items-end lg:justify-between py-30">
          <div className="w-full lg:w-2/4 2xl:w-2/3 lg:ps-30 2xl:ps-80 pb-30 lg:pb-0">
            <div className="pb-20 lg:pb-30">
              <FadeInSection delay={100}>
                <p className="font-extrabold text-5xl md:text-6xl lg:text-5xl xl:text-6xl  2xl:text-7xl">
                  INTERACTIVE ART
                </p>
              </FadeInSection>
              <FadeInSection delay={300}>
                <p className="text-lg 2xl:text-xl pt-5">
                  Interaction turns the viewer into an active part of the
                  artwork. Input, movement, and exploration influences the
                  system, creating dynamic and unpredictable outcomes.
                </p>
              </FadeInSection>
            </div>
            <FadeInSection delay={600}>
              <div
                className="w-full flex lg:justify-start"
                onClick={() => {
                  navigate('/discover')
                }}
              >
                <OutlineButton text="DISCOVER" size="xl" />
              </div>
            </FadeInSection>
          </div>

          <div className="w-full lg:w-2/4 2xl:w-1/3 aspect-square">
            <P5Iframe p5Code={sketchCode2} />
          </div>
        </div>
      </div>

      <div className="w-full bg-black text-gray-50">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row lg:items-end lg:justify-between pt-30 pb-50">
          <div className="w-full lg:w-2/4 2xl:w-2/3 lg:pe-30 2xl:pe-80 pb-30 lg:pb-0">
            <div className="pb-20 lg:pb-30">
              <FadeInSection delay={100}>
                <p className="font-extrabold text-5xl md:text-6xl lg:text-5xl xl:text-6xl  2xl:text-7xl">
                  SPATIAL ART
                </p>
              </FadeInSection>
              <FadeInSection delay={300}>
                <p className="text-lg 2xl:text-xl pt-5">
                  3D expands generative creativity into space. Artists design
                  forms, environments and systems that evolve in depth,
                  movement, and perspective.
                </p>
              </FadeInSection>
            </div>
            <FadeInSection delay={600}>
              <div
                onClick={() => {
                  navigate('/discover')
                }}
              >
                <OutlineButton text="DISCOVER" size="xl" />
              </div>
            </FadeInSection>
          </div>
          <div className="w-full lg:w-2/4 2xl:w-1/3 aspect-square">
            <P5Iframe p5Code={sketchCode3} />
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-black text-gray-50 pt-30 flex justify-center">
        <P5Iframe p5Code={finalSketch} />
      </div>

      <div className="w-full">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row lg:items-center justify-between pt-60">
          <div className="w-full lg:w-2/5">
            <FadeInSection delay={100}>
              <p className="font-extrabold text-4xl 2xl:text-5xl">
                BUILT ON CURIOSITY
                <br />
                GROWN THROUGH SHARING
              </p>
            </FadeInSection>
          </div>
          <div className="w-full lg:w-3/5 lg:ps-20 xl:ps-50 2xl:ps-80 pt-10 lg:pt-0">
            <FadeInSection delay={100}>
              <p className="text-lg lg:text-xl">
                Here, every artwork is a starting point for conversation.
                <br />
                We explore, learn trom one another, and push creative boundaries
                together
              </p>
            </FadeInSection>
          </div>
        </div>
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex items-center justify-end pt-25 lg:pt-10 pb-60">
          <div
            className="w-full lg:w-3/5 lg:ps-20 xl:ps-50 2xl:ps-80"
            onClick={() => {
              navigate('/register')
            }}
          >
            <FadeInSection delay={300}>
              <BlackButton text="START CREATING" size="xl" />
            </FadeInSection>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage
