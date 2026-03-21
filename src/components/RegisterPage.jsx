import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import OutlineButton from './OutlineButton'
import P5Iframe from './P5Iframe'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

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
`

function RegisterPage() {
  const navigate = useNavigate()

  const [body, setBody] = useState({
    name: '',
    email: '',
    password: '',
  })

  const url = 'http://localhost:3001/auth/register'

  const register = function (body) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/login`)
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      <FooterDesktop />

      <div className="w-full h-screen relative">
        <P5Iframe p5Code={sketchCode} />
        <div className="w-full h-screen absolute top-0 left-0 mx-auto px-12 md:px-20 xl:px-25 flex justify-center items-center">
          <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-10 py-15 bg-neutral-900 text-gray-50">
            <p className="font-semibold text-2xl">Join Genera</p>
            <p className="text-xs pb-10">
              Already have an account?{' '}
              <Link to={'/login'} className="font-bold">
                Sign in
              </Link>
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                register(body)
              }}
            >
              <label className="text-gray-50/50 font-semibold">Name</label>
              <input
                type="text"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                value={body.name}
                onChange={(e) => {
                  setBody({
                    ...body,
                    name: e.target.value,
                  })
                }}
              />
              <label className="text-gray-50/50 font-semibold">Email</label>
              <input
                type="email"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                value={body.email}
                onChange={(e) => {
                  setBody({
                    ...body,
                    email: e.target.value,
                  })
                }}
              />
              <label className="text-gray-50/50 font-semibold">Password</label>
              <input
                type="password"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-15"
                value={body.password}
                onChange={(e) => {
                  setBody({
                    ...body,
                    password: e.target.value,
                  })
                }}
              />
              <p className="text-xs pb-3">
                By joining Genera, you agree to the{' '}
                <Link to={'/terms'} className="font-bold">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to={'/privacy'} className="font-bold">
                  Privacy Policy
                </Link>
              </p>
              <button
                type="submit"
                className="w-full bg-white border-3 border-white text-black font-bold shadow-2xl hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer py-2"
              >
                JOIN GENERA
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
