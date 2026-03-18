import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { VscAccount } from 'react-icons/vsc'
import { TbCodeCircle } from 'react-icons/tb'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { FiPlusCircle } from 'react-icons/fi'
import { FaPlay } from 'react-icons/fa'
import { BiComment } from 'react-icons/bi'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import DesktopProfilePanel from './DesktopProfilePanel'
import CommentsPanel from './CommentsPanel'

function NavbarEditor({ light, project, setPage }) {
  const [panel, setPanel] = useState('')

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  return (
    <>
      <DesktopProfilePanel panel={panel} log={token} />
      <CommentsPanel panel={panel} />

      <div className="fixed z-10 w-full h-16 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black flex justify-between items-center ">
        <div className="flex items-center w-1/3">
          <div className="h-full w-5">
            <Link to={'/'}>
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1773138526/logo_kjqc47.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex text-gray-50/60 items-center">
            <p className="ps-4 font-semibold text-lg text-gray-50/80">
              {project.title}{' '}
              <Link to={`/profile/${project.author.userId}`}>
                <span className="font-thin text-sm text-gray-50/60 hover:text-gray-50/80">
                  by {project.author.username}
                </span>
              </Link>
            </p>
            {project.author.userId !== userId && (
              <div className="ps-2">
                <FiPlusCircle
                  className={`h-full w-5 flex ${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-1/3 flex justify-center text-gray-50/60">
          <div
            className="pe-4"
            onClick={() => {
              setPage('info')
            }}
          >
            <HiOutlineInformationCircle
              className={`h-full w-6 flex ${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
          <div
            className="pe-4"
            onClick={() => {
              setPage('canva')
            }}
          >
            <FaPlay
              className={`h-full w-6 flex ${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
          <div
            onClick={() => {
              setPage('code')
            }}
          >
            <TbCodeCircle
              className={`h-full w-6 flex ${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
        </div>

        <div className="w-1/3 flex justify-end text-gray-50/60">
          <div className="flex items-center pe-4">
            <p className="text-base font-semibold pe-1 lg:pe-2">10</p>
            <FaRegHeart className="h-full w-6 lg:w-4 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
          </div>
          <div className="flex items-center pe-4">
            <p className="text-base font-semibold pe-1 lg:pe-2">3</p>
            <div
              onClick={() => {
                if (panel === 'comments') {
                  setPanel('')
                } else {
                  setPanel('comments')
                }
              }}
            >
              <BiComment className="h-full w-6 lg:w-4 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
            </div>
          </div>
          <div
            className={`${light === 'Profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer h-full w-1/10 xl:w-1/20 flex justify-end`}
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

export default NavbarEditor
