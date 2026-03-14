import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import OutlineButton from './OutlineButton'
import P5Iframe from './P5Iframe'
import { TiLocation } from 'react-icons/ti'
import { FaLink } from 'react-icons/fa'
import { useState } from 'react'
import ProfileProjectsSection from './ProfileProjectsSection'
import ProfileUsersSection from './ProfileUsersSection'

function ProfilePage() {
  const sketchCode = `
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
}

let largx,largy,tra;
let distanza=10;

function draw() {
  fill(100,100);
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
  tra=map(t,0,500,100,30);
  fill(0,tra);
  ellipse(x,y,largx,largx);
}
`

  const [section, setSection] = useState('projects')

  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      {/*    <FooterDesktop /> */}

      <div className="w-full h-screen text-gray-50">
        <div className="w-full h-5/6 relative">
          <P5Iframe p5Code={sketchCode} />
          {/* DIV IMMAGINE E NOME */}
          <div className="w-full mx-auto px-12 md:px-20 xl:px-25 absolute bottom-0 flex items-center translate-y-1/2">
            <div className="w-1/3 md:w-1/4 2xl:w-1/6 aspect-square rounded-full overflow-hidden">
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1772903135/ggfstlipbuzzh1hu1nmw.png"
                alt="Basic profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 md:w-3/4 2xl:w-5/6 ps-5 md:ps-10 2xl:ps-20 flex flex-col lg:flex-row pb-12 sm:pb-20 xl:pb-25 2xl:pb-35">
              <p className="w-full font-extrabold text-3xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl truncate">
                GIADA TONNI
              </p>
            </div>
          </div>
        </div>
        <div className="w-full pb-30 bg-black">
          {/* DIV INFO */}
          <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex md:justify-end pt-30 sm:pt-35 md:pt-10">
            <div className="w-full md:w-3/4 2xl:w-5/6 flex flex-col lg:flex-row md:ps-10 2xl:ps-20">
              <div className="flex flex-col">
                <p className="text-base lg:text-lg pb-10">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat.
                </p>
                <div className="w-full flex items-center">
                  <div className="pe-5 flex items-center border-e border-gray-50/40">
                    <TiLocation className="h-full w-5" />
                    <p className="ps-2 text-sm md:text-base">Rome</p>
                  </div>
                  <div className="ps-5 flex items-center">
                    <FaLink className="h-full w-5" />
                    <p className="ps-2 text-sm md:text-base">www.gtonni.com</p>
                  </div>
                </div>
              </div>
              {/* DIV SUPPORT */}
              <div className="w-full lg:w-1/2 flex items-end justify-end pt-10">
                <OutlineButton text="SUPPORT" size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  FINE HEADER */}

      {/* INIZIO SEZIONI */}

      <div className="w-full pb-15 bg-black pt-60 md:pt-40 lg:pt-30 xl:pt-20 overflow-x-hidden">
        {/*  BOTTONI SEZIONI */}
        {/* BOX PER LINEA */}
        <div className="border-b-2 border-gray-50/20">
          {/* BOX PER SCROLL */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* BOX PER BOTTONI */}
            <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex text-gray-50">
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'projects' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('projects')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">20</span>{' '}
                  Projects
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'appreciations' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('appreciations')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">100</span>{' '}
                  Appreciations
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'connections' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('connections')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">25</span>{' '}
                  Connections
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'supporters' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('supporters')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">15</span>{' '}
                  Supporters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEZIONI */}
        {section === 'projects' && <ProfileProjectsSection />}
        {section === 'connections' && <ProfileUsersSection />}
      </div>
    </>
  )
}

export default ProfilePage
