import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import FooterDesktop from "./FooterDesktop";
import OutlineButton from "./OutlineButton";
import P5Iframe from "./P5Iframe";
import { Link } from "react-router-dom";

const sketchCode = `
let pos;
let startPos;
let target;
let vel;

let waitTime = 0;

let size;
let startSize;
let targetSize;

let totalDistance;

function setup() {
  createCanvas(windowWidth, windowHeight);

  pos = createVector(random(width), random(height));
  startPos = pos.copy();
  target = createVector(random(width), random(height));

  vel = createVector(0, 0);

  size = random(40,150);
  startSize = size;
  targetSize = random(20,200);

  totalDistance = p5.Vector.dist(startPos, target);

  background(0);
}

function draw() {

  // scia
  noStroke();
  fill(0, 20);
  rect(0, 0, width, height);

  if (waitTime <= 0) {

    let desired = p5.Vector.sub(target, pos);
    let distance = desired.mag();

    desired.normalize();

    let speed = map(distance, 0, 300, 0, 10, true);
    desired.mult(speed);

    vel.lerp(desired, 0.05);
    pos.add(vel);

    // progresso lungo il percorso
    let traveled = p5.Vector.dist(startPos, pos);
    let progress = constrain(traveled / totalDistance, 0, 1);

    size = lerp(startSize, targetSize, progress);

    if (distance < 5) {
      waitTime = random(20, 80);

      startPos = pos.copy();
      target = createVector(random(width), random(height));

      startSize = size;
      targetSize = random(20,200);

      totalDistance = p5.Vector.dist(startPos, target);
    }

  } else {

    waitTime--;
    vel.mult(0.9);
    pos.add(vel);

  }

  noFill();
  stroke(255);
  strokeWeight(2);
  circle(pos.x, pos.y, size);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
`;

function LoginPage() {
  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      <FooterDesktop />

      <div className="w-full h-screen relative">
        <P5Iframe p5Code={sketchCode} />
        <div className="w-full h-screen absolute top-0 left-0 mx-auto px-12 md:px-20 xl:px-25 flex justify-center items-center">
          <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 px-10 py-15 bg-neutral-900 text-gray-50">
            <p className="font-semibold text-2xl">Sign in</p>
            <p className="text-xs pb-10">
              Don't have an account yet?{" "}
              <Link to={"/register"} className="font-bold">
                Join Genera
              </Link>
            </p>
            <form>
              <label className="text-gray-50/50 font-semibold">Email</label>
              <input
                type="email"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
              />
              <label className="text-gray-50/50 font-semibold">Password</label>
              <input
                type="password"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-15"
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="font-semibold text-gray-50 border-3 border-gray-50 hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer py-2 px-6"
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
