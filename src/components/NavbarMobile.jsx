import { VscAccount } from 'react-icons/vsc'
import { IoSearch } from 'react-icons/io5'
import { IoMenuSharp } from 'react-icons/io5'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import MobileMenu from './MobileMenu'
import MobileProfilePanel from './MobileProfilePanel'

function NavbarMobile({ light }) {
  const [panel, setPanel] = useState('')

  return (
    <>
      <MobileMenu panel={panel} light={light} />
      <MobileProfilePanel panel={panel} log={true} />

      <div className="fixed bottom-0 z-10 w-full h-20 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black flex lg:hidden justify-between items-center ">
        <div className="h-full w-6 cursor-pointer flex items-center">
          <Link to={'/'}>
            <img
              src="https://res.cloudinary.com/cloudgiada/image/upload/v1773138526/logo_kjqc47.png"
              alt="logo"
            />
          </Link>
        </div>
        <div
          className={`h-full w-5 ${panel === 'menu' ? 'text-gray-50' : 'text-gray-50/60'}  hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
          onClick={() => {
            if (panel === 'menu') {
              setPanel('')
            } else {
              setPanel('menu')
            }
          }}
        >
          <IoMenuSharp className="h-full w-8" />
        </div>
        <div className="h-full w-5 text-gray-50/60  hover:text-gray-50 transition-colors duration-150 cursor-pointer">
          <IoSearch className="h-full w-6" />
        </div>
        <div className="h-full w-5 flex items-center">
          <div
            className={`${light === 'Profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            onClick={() => {
              if (panel === 'profile') {
                setPanel('')
              } else {
                setPanel('profile')
              }
            }}
          >
            <VscAccount className="h-full w-6 flex items-center" />
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarMobile
