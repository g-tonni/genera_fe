import { Link, useNavigate } from 'react-router-dom'
import OutlineButton from './OutlineButton'
import WhiteButton from './WhiteButton'
import { VscAccount } from 'react-icons/vsc'
import { FaEdit } from 'react-icons/fa'
import { FaRegImage } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { addToken, addUserId } from '../redux/actions/loginAction'

function DesktopProfilePanel({ panel, log }) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  return (
    <>
      {log ? (
        <div
          className={`w-80 inset-e-0 top-0 pt-16 fixed z-10 bg-neutral-900 transition-all duration-300 hidden lg:flex flex-col
                   ${panel === 'profile' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <div className="w-full flex flex-col justify-center py-6 px-6">
            <Link to={`/profile/${userId}`}>
              <div className="flex items-center text-gray-50/60 pb-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
                <VscAccount className="h-full w-5 flex items-center" />
                <p className="text-sm ps-4">View my profile</p>
              </div>
            </Link>
            <Link to={`/profile/${userId}/edit`}>
              <div className="flex items-center text-gray-50/60 pb-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
                <FaEdit className="h-full w-5 flex items-center" />
                <p className="text-sm ps-4">Edit profile</p>
              </div>
            </Link>
            <Link to={`/profile/${userId}`}>
              <div className="flex items-center text-gray-50/60 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
                <FaRegImage className="h-full w-5 flex items-center" />
                <p className="text-sm ps-4">My projects</p>
              </div>
            </Link>
          </div>

          <hr className="border border-gray-50/10 w-full" />

          <div className="w-full py-6 px-6">
            <div
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                dispatch(addToken(null))
                dispatch(addUserId(null))
                navigate('/')
              }}
            >
              <OutlineButton text="SIGN OUT" size="sm" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-80 inset-e-0 top-0 pt-16 fixed z-10 bg-neutral-900 transition-all duration-300 hidden lg:flex flex-col items-center justify-end md:justify-center
                   ${panel === 'profile' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <div className="w-full py-6 px-6">
            <Link to={'/register'}>
              <WhiteButton text="JOIN GENERA" size="md" />
            </Link>
          </div>

          <hr className="border border-gray-50/10 w-full" />

          <div className="w-full py-6 px-6">
            <p className="text-sm pb-4 text-gray-50/60">
              Already have an account?
            </p>
            <Link to={'/login'}>
              <OutlineButton text="SIGN IN" size="sm" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default DesktopProfilePanel
