const sketchCode = `
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

let largx,largy,tra;
let distanza=10;

function draw() {
  fill(0,100);
  noStroke();
  rect(0,0,width,height);
  for (let i=distanza/2; i<width; i+=distanza){
    for (let j=distanza/2; j<height; j+=distanza){
    cerchio(i,j);
  }
}
  
}

function cerchio(x, y){
  noStroke();
  let d=dist(mouseX,mouseY,x,y);
  largx=map(d,0,800,10,0);
  let t=dist(mouseX,mouseY,x,y);
  tra=map(t,0,500,60,30);
  fill(255,tra);
  ellipse(x,y,largx,largx);
}
`

const sketchCode2 = `
let yIn, yFi, xIn, xFi, x, x1, y, y1, b, vari, start1, start2, ioff1, ioff2, start3, start4, ioff3, ioff4, startb, startb1, ioffb, ioffb1;
let yInE, yFiE, xInE, xFiE, xE, x1E, yE, y1E, bE, variE, start1E, start2E, ioff1E, ioff2E, start3E, start4E, ioff3E, ioff4E, startbE, startb1E, ioffbE, ioffb1E;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  yIn = random(-height, height);
  yFi = random(-height, height);
  xIn = 0;
  xFi = windowWidth;
  x = windowWidth/3;
  y = 0;
  x1 = windowWidth/3*2;
  y1 = 0;
  b = 0;
  vari = random(50,500);
  start1 = 0;
  start2 = 0;
  ioff1 = 0;
  ioff2 = 0;
  start3 = 0;
  start4 = 0;
  ioff3 = 0;
  ioff4 = 0;
  startb = 0;
  startb1 = 0;
  ioffb = 0;
  ioffb1 = 0;

  yInE = random(-height, height);
  yFiE = random(-height, height);
  xInE = 0;
  xFiE = windowWidth;
  xE = windowWidth/3;
  yE = 0;
  x1E = windowWidth/3*2;
  y1E = 0;
  bE = 0;
  variE = random(50,500);
  start1E = 0;
  start2E = 0;
  ioff1E = 0;
  ioff2E = 0;
  start3E = 0;
  start4E = 0;
  ioff3E = 0;
  ioff4E = 0;
  startbE = 0;
  startb1E = 0;
  ioffbE = 0;
  ioffb1E = 0;
}

function draw() {
  xIn = 0;
  xFi = windowWidth;
  yIn += 0.3;
  yFi += 0.3;
  x = windowWidth/3;
  y += 0.3;
  x1 = windowWidth/3*2;
  y1 += 0.3;

  xInE = 0;
  xFiE = windowWidth;
  yInE += 0.3;
  yFiE += 0.3;
  xE = windowWidth/3;
  yE += 0.3;
  x1E = windowWidth/3*2;
  y1E += 0.3;

  let xoff = start1;
  let yoff = start2;
  ioff1 += 0.2;
  ioff2 += 0.1;
  let inc1 = map(noise(ioff1), 0, 1, 0.0002, 0.005);
  let inc2 = map(noise(ioff2), 0, 1, 0.0001, 0.005);
  yoff += inc1;
  xoff += inc2;

  let x1off = start3;
  let y1off = start4;
  ioff3 += 0.2;
  ioff4 += 0.002;
  let inc3 = map(noise(ioff3), 0, 1, 0.002, 0.005);
  let inc4 = map(noise(ioff4), 0, 1, 0.001, 0.005);
  y1off += inc3;
  x1off += inc4;

  let boff = startb;
  ioffb += 0.0002;
  let incb = map(noise(ioffb), 0, 1, 0.001, 0.05);
  boff += incb;

  b = map(noise(boff), 0, 1, 20, 220);

  let xV = map(noise(xoff), 0, 1, x - vari, x + vari);
  let yV = map(noise(yoff), 0, 1, y - vari, y + vari);
  let xV1 = map(noise(x1off), 0, 1, x1 - vari, x1 + vari);
  let yV1 = map(noise(y1off), 0, 1, y1 - vari, y1 + vari);

  let xoffE = start1E;
  let yoffE = start2E;
  ioff1E += 0.002;
  ioff2E += 0.001;
  let inc1E = map(noise(ioff1E), 0, 1, 0.00002, 0.005);
  let inc2E = map(noise(ioff2E), 0, 1, 0.001, 0.005);
  yoffE += inc1E;
  xoffE += inc2E;

  let x1offE = start3E;
  let y1offE = start4E;
  ioff3E += 0.0002;
  ioff4E += 0.002;
  let inc3E = map(noise(ioff3E), 0, 1, 0.00002, 0.005);
  let inc4E = map(noise(ioff4E), 0, 1, 0.001, 0.005);
  y1offE += inc3E;
  x1offE += inc4E;

  let boffE = startbE;
  ioffbE += 0.0002;
  let incbE = map(noise(ioffbE), 0, 1, 0.001, 0.05);
  boffE += incb;

  bE = map(noise(boffE), 0, 1, 20, 220);

  let xVE = map(noise(xoffE), 0, 1, xE - variE, xE + variE);
  let yVE = map(noise(yoffE), 0, 1, yE - variE, y + variE);
  let xV1E = map(noise(x1offE), 0, 1, x1E - variE, x1E + variE);
  let yV1E = map(noise(y1offE), 0, 1, y1E - variE, y1E + variE);

  stroke(b, 80);
  noFill();
  beginShape();
  curveVertex(xIn, yIn);
  curveVertex(xIn, yIn);
  curveVertex(xV, yV);
  curveVertex(xV1, yV1);
  curveVertex(xFi, yFi);
  curveVertex(xFi, yFi);
  endShape();

  stroke(bE, 20);
  noFill();
  beginShape();
  curveVertex(xInE, yInE);
  curveVertex(xInE, yInE);
  curveVertex(xVE, yVE);
  curveVertex(xV1E, yV1E);
  curveVertex(xFiE, yFiE);
  curveVertex(xFiE, yFiE);
  endShape();

  start1 += inc1;
  start2 += inc2;
  start3 += inc3;
  start4 += inc4;
  startb += incb;

  start1E += inc1E;
  start2E += inc2E;
  start3E += inc3E;
  start4E += inc4E;
  startbE += incbE;
}

`

import OutlineButton from './OutlineButton'
import BlackButton from './BlackButton'
import P5Iframe from './P5Iframe'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import { useNavigate } from 'react-router-dom'

function Homepage() {
  const navigate = useNavigate()

  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      <FooterDesktop />

      <div className="relative w-full h-screen text-gray-50">
        <P5Iframe p5Code={sketchCode} />
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
            <p className="font-extrabold text-4xl md:text-5xl 2xl:text-6xl">
              WHERE CODE BECOMES LIVING ART
            </p>
          </div>
          <div className="w-full lg:w-2/3 lg:ps-20 2xl:ps-80">
            <p className="pt-10 lg:pt-0 text-lg lg:text-xl">
              Discover, interact, and learn through code. Share your work on{' '}
              <span className="italic font-bold">Genera</span> and be part of a
              new generation of digital creators. Step into a world of
              generative and interactive experences.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-black text-gray-50">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row lg:items-end lg:justify-between py-30">
          <div className="w-full lg:w-2/4 2xl:w-2/3 lg:pe-30 2xl:pe-80 pb-30 lg:pb-0">
            <div className="pb-20 lg:pb-30">
              <p className="font-extrabold text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                GENERATIVE ART
              </p>
              <p className="text-lg 2xl:text-xl pt-5">
                Trough code, randomness, and logic, each piece becomes a living
                process-constantly changing, never exactly the same.
              </p>
            </div>
            <div
              onClick={() => {
                navigate('/discover')
              }}
            >
              <OutlineButton text="DISCOVER" size="xl" />
            </div>
          </div>
          <div className="w-full lg:w-2/4 2xl:w-1/3 aspect-square">
            <P5Iframe p5Code={sketchCode2} />
          </div>
        </div>
      </div>

      <div className="w-full bg-black text-gray-50">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row-reverse lg:items-end lg:justify-between py-30">
          <div className="w-full lg:w-2/4 2xl:w-2/3 lg:ps-30 2xl:ps-80 pb-30 lg:pb-0">
            <div className="pb-20 lg:pb-30">
              <p className="font-extrabold text-5xl md:text-6xl lg:text-5xl xl:text-6xl  2xl:text-7xl">
                INTERACTIVE ART
              </p>
              <p className="text-lg 2xl:text-xl pt-5">
                Interaction turns the viewer into an active part of the artwork.
                Input, movement, and exploration influences the system, creating
                dynamic and unpredictable outcomes.
              </p>
            </div>

            <div
              className="w-full flex lg:justify-start"
              onClick={() => {
                navigate('/discover')
              }}
            >
              <OutlineButton text="DISCOVER" size="xl" />
            </div>
          </div>

          <div className="w-full lg:w-2/4 2xl:w-1/3 aspect-square">
            <P5Iframe p5Code={sketchCode2} />
          </div>
        </div>
      </div>

      <div className="w-full bg-black text-gray-50">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row lg:items-end lg:justify-between py-30">
          <div className="w-full lg:w-2/4 2xl:w-2/3 lg:pe-30 2xl:pe-80 pb-30 lg:pb-0">
            <div className="pb-20 lg:pb-30">
              <p className="font-extrabold text-5xl md:text-6xl lg:text-5xl xl:text-6xl  2xl:text-7xl">
                SPATIAL ART
              </p>
              <p className="text-lg 2xl:text-xl pt-5">
                3D expands generative creativity into space. Artists design
                forms, environments and systems that evolve in depth, movement,
                and perspective.
              </p>
            </div>
            <div
              onClick={() => {
                navigate('/discover')
              }}
            >
              <OutlineButton text="DISCOVER" size="xl" />
            </div>
          </div>
          <div className="w-full lg:w-2/4 2xl:w-1/3 aspect-square">
            <P5Iframe p5Code={sketchCode2} />
          </div>
        </div>
      </div>

      <div className="w-full bg-black text-gray-50 pt-30 flex justify-center">
        <img
          src="https://res.cloudinary.com/cloudgiada/image/upload/v1773098630/Screenshot_2026-03-01_alle_23.39.31_bhgzac.png"
          alt="mosaico"
        />
        <img
          src="https://res.cloudinary.com/cloudgiada/image/upload/v1773098630/Screenshot_2026-03-01_alle_23.39.31_bhgzac.png"
          alt="mosaico"
        />
      </div>

      <div className="w-full">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex flex-col lg:flex-row lg:items-center justify-between pt-60">
          <div className="w-full lg:w-2/5">
            <p className="font-extrabold text-4xl 2xl:text-5xl">
              BUILT ON CURIOSITY
              <br />
              GROWN THROUGH SHARING
            </p>
          </div>
          <div className="w-full lg:w-3/5 lg:ps-20 xl:ps-50 2xl:ps-80 pt-10 lg:pt-0">
            <p className="text-lg lg:text-xl">
              Here, every artwork is a starting point for conversation.
              <br />
              We explore, learn trom one another, and push creative boundaries
              together
            </p>
          </div>
        </div>
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bottom-0 flex items-center justify-end pt-25 lg:pt-10 pb-60">
          <div
            className="w-full lg:w-3/5 lg:ps-20 xl:ps-50 2xl:ps-80"
            onClick={() => {
              navigate('/register')
            }}
          >
            <BlackButton text="START CREATING" size="xl" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage
