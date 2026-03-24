import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import P5Iframe from './P5Iframe'
import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa6'
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
  const [showPassword, setShowPassword] = useState(false)

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
    name: '',
    email: '',
    password: '',
  })

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const url = `${API_URL}/auth/register`

  const register = function (body) {
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
          navigate(`/login`)
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
  /* 
  console.log(errors)
  console.log(getErrors(errors, 'name')) */

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
              noValidate
            >
              <label className="text-gray-50/50 font-semibold">Name</label>
              <input
                type="text"
                className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                value={body.name}
                onChange={(e) => {
                  setBody({
                    ...body,
                    name: e.target.value,
                  })
                }}
              />
              {errors && getErrors(errors, 'name').length > 0 && (
                <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                  {getErrors(errors, 'name').map((error) => {
                    return <p>{error}</p>
                  })}
                </div>
              )}
              <label className="block text-gray-50/50 font-semibold mt-10">
                Email
              </label>
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
              <label className="block text-gray-50/50 font-semibold pt-10">
                Password
              </label>
              <div className="w-full relative">
                {showPassword && (
                  <div
                    className="absolute bottom-0 right-0 pb-1 text-gray-50/60 hover:text-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => {
                      setShowPassword(false)
                    }}
                  >
                    <FaRegEye />
                  </div>
                )}
                {showPassword === false && (
                  <div
                    className="absolute bottom-0 right-0 pb-1 text-gray-50/60 hover:text-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => {
                      setShowPassword(true)
                    }}
                  >
                    <FaRegEyeSlash />
                  </div>
                )}
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                  value={body.password}
                  onChange={(e) => {
                    setBody({
                      ...body,
                      password: e.target.value,
                    })
                  }}
                />
              </div>
              {errors && getErrors(errors, 'password').length > 0 && (
                <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                  {getErrors(errors, 'password').map((error) => {
                    return <p>{error}</p>
                  })}
                </div>
              )}
              <p className="text-xs pt-15 pb-3">
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
