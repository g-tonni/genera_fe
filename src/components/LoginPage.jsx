import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import P5Iframe from './P5Iframe'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToken, addUserId } from '../redux/actions/loginAction'

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

function LoginPage() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [errors, setErrors] = useState(null)

  const getErrors = function (errorsList, keyword) {
    return errorsList.filter((error) => {
      return error.toLowerCase().includes(keyword.toLowerCase())
    })
  }

  const normalizeErrors = (data) => {
    if (data.errorsList && Array.isArray(data.errorsList)) {
      return data.errorsList
    }

    if (data.error) {
      return [data.error]
    }

    return ['An unexpected error occurred.']
  }

  const [body, setBody] = useState({
    email: '',
    password: '',
  })

  const url = 'http://localhost:3001/auth/login'

  const login = function (body) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const data = await res.json()

        if (res.ok) {
          localStorage.setItem('token', data.token)
          dispatch(addToken(data.token))
          localStorage.setItem('userId', data.userId)
          dispatch(addUserId(data.userId))
          navigate(`/profile/${data.userId}`)
        } else {
          const errorOrErrors = normalizeErrors(data)
          setErrors(errorOrErrors)
          throw data
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
            <p className="font-semibold text-2xl">Sign in</p>
            <p className="text-xs pb-10">
              Don't have an account yet?{' '}
              <Link to={'/register'} className="font-bold">
                Join Genera
              </Link>
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                login(body)
              }}
              noValidate
            >
              <label className="text-gray-50/50 font-semibold">Email</label>
              <input
                type="email"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                value={body.email}
                onChange={(e) => {
                  setBody({
                    ...body,
                    email: e.target.value,
                  })
                }}
              />
              {errors && getErrors(errors, 'email').length > 0 && (
                <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                  {getErrors(errors, 'email').map((error) => {
                    return <p>{error}</p>
                  })}
                </div>
              )}
              <label className="block text-gray-50/50 font-semibold mt-10">
                Password
              </label>
              <input
                type="password"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                value={body.password}
                onChange={(e) => {
                  setBody({
                    ...body,
                    password: e.target.value,
                  })
                }}
              />
              {errors && getErrors(errors, 'password').length > 0 && (
                <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                  {getErrors(errors, 'password').map((error) => {
                    return <p>{error}</p>
                  })}
                </div>
              )}
              {errors && getErrors(errors, 'incorrect').length > 0 && (
                <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                  {getErrors(errors, 'incorrect').map((error) => {
                    return <p>{error}</p>
                  })}
                </div>
              )}
              <div className="flex justify-center pt-15">
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
  )
}

export default LoginPage
