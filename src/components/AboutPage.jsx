import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import WhiteButton from './WhiteButton'
import { useNavigate } from 'react-router-dom'

function AboutPage() {
  const navigate = useNavigate()

  return (
    <>
      <NavbarDesktop light="About" />
      <NavbarMobile light="About" />
      <FooterDesktop />

      <div className="w-full bg-black text-gray-50/70 min-h-screen flex flex-col font-thin pt-20 pb-40 lg:py-40">
        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col lg:flex-row lg:items-center justify-between py-20 lg:py-30">
          <div className="w-full lg:w-1/3">
            <p className="font-extrabold text-4xl md:text-5xl 2xl:text-6xl">
              OUR VISION
            </p>
          </div>
          <div className="w-full lg:w-2/3 lg:ps-20 2xl:ps-80">
            <p className="pt-10 lg:pt-0 text-lg lg:text-xl">
              Welcome to{' '}
              <span className="italic font-semibold text-gray-50">Genera</span>.
              We firmly believe that programming isn't just for building
              databases or optimizing algorithms: it is a powerful, expressive
              language capable of generating beauty.
            </p>
          </div>
        </div>

        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col lg:flex-row lg:items-center justify-between py-20 lg:py-30">
          <div className="w-full lg:w-1/3">
            <p className="font-extrabold text-4xl md:text-5xl 2xl:text-6xl">
              WHAT IS <span className="italic">GENERA</span>?
            </p>
          </div>
          <div className="w-full lg:w-2/3 lg:ps-20 2xl:ps-80">
            <p className="pt-10 lg:pt-0 text-lg lg:text-xl">
              <span className="italic font-semibold text-gray-50">Genera</span>{' '}
              is a creative space dedicated to Generative Art and creative
              coding. It’s a digital playground where art meets logic. Here,
              algorithms paint, pixels dance, and mathematics transforms into
              emotion.
            </p>
          </div>
        </div>

        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col lg:flex-row lg:items-center justify-between py-20 lg:py-30">
          <div className="w-full lg:w-1/3">
            <p className="font-extrabold text-4xl md:text-5xl 2xl:text-6xl">
              WHY ARE WE HERE?
            </p>
          </div>
          <div className="w-full lg:w-2/3 lg:ps-20 2xl:ps-80">
            <p className="pt-10 lg:pt-0 text-lg lg:text-xl pb-5">
              Our mission is to democratize code-based digital art:
            </p>
            <div className="flex text-lg lg:text-xl pb-5">
              <p className="font-semibold pe-5">1.</p>
              <p className="">
                <span className="font-semibold">Create:</span> We provide a
                built-in editor to write, test, and refine your sketches
                directly in the browser. No complex setup, just you and your
                code.
              </p>
            </div>
            <div className="flex text-lg lg:text-xl pb-5">
              <p className="font-semibold pe-5">2.</p>
              <p className="">
                <span className="font-semibold">Share:</span> We believe in the
                power of sharing. Publish your works to show the world what you
                can create with a draw() function.
              </p>
            </div>
            <div className="flex text-lg lg:text-xl pb-5">
              <p className="font-semibold pe-5">3.</p>
              <p className="">
                <span className="font-semibold">Learn & Inspire:</span> Explore
                sketches from other artists. Like, comment, ask questions, and
                follow your favorite creators. Ours is a community built on
                "learning by seeing."
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col lg:flex-row lg:items-center justify-between py-20 lg:py-30">
          <div className="w-full lg:w-1/3">
            <p className="font-extrabold text-4xl md:text-5xl 2xl:text-6xl">
              WHO IS THIS PLATFORM FOR?
            </p>
          </div>
          <div className="w-full lg:w-2/3 lg:ps-20 2xl:ps-80">
            <p className="pt-10 lg:pt-0 text-lg lg:text-xl">
              Whether you are an experienced digital artist, a curious computer
              science student, or a designer looking to experiment with
              programming, you are in the right place. It doesn't matter if your
              code is clean or chaotic; what matters is the visual output and
              the idea behind it. <br />
            </p>
            <p className="font-semibold text-lg lg:text-xl pt-10">
              Join us. Start coding your next masterpiece.
            </p>
            <div
              className="pt-15 w-1/2"
              onClick={() => {
                navigate('/register')
              }}
            >
              <WhiteButton text="START CREATING" size="md" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
