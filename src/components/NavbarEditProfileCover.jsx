import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { VscAccount } from 'react-icons/vsc'
import { TbCodeCircle } from 'react-icons/tb'
import { FaPlay } from 'react-icons/fa'
import DesktopProfilePanel from './DesktopProfilePanel'
import MobileProfilePanel from './MobileProfilePanel'

function NavbarEditProfileCover({ setPage }) {
  const [panel, setPanel] = useState('canva')

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  return (
    <>
      <DesktopProfilePanel panel={panel} log={token} />
      <MobileProfilePanel panel={panel} log={token} />

      <div className="fixed z-10 w-full h-16 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black flex justify-between items-center ">
        <div className="flex items-center w-full lg:w-1/3">
          <div className="h-full w-5">
            <Link to={'/'}>
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1773138526/logo_kjqc47.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex text-gray-50/60 items-center">
            <p className="ps-4 font-semibold lg:text-lg text-gray-50/80">
              My cover
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex justify-center text-gray-50/60">
          <div
            className="pe-2 lg:pe-4"
            onClick={() => {
              setPage('canva')
              if (panel === 'canva') {
                setPanel('')
              } else {
                setPanel('canva')
              }
            }}
          >
            <FaPlay
              className={`h-full w-4 lg:w-6 flex ${panel === 'canva' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
          <div
            onClick={() => {
              setPage('code')
              if (panel === 'code') {
                setPanel('')
              } else {
                setPanel('code')
              }
            }}
          >
            <TbCodeCircle
              className={`h-full w-4 lg:w-6 flex ${panel === 'code' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex justify-end items-center text-gray-50/60">
          <div
            className={`${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer h-full w-5 xl:w-1/20 flex justify-end ms-4`}
            onClick={() => {
              if (panel === 'profile') {
                setPanel('')
              } else {
                setPanel('profile')
              }
            }}
          >
            <VscAccount
              className={`h-full w-6 flex ${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} `}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarEditProfileCover
