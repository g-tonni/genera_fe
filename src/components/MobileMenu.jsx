import { FaDiscord } from 'react-icons/fa6'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function MobileMenu({ panel, light }) {
  return (
    <div
      className={`w-full bottom-0 pb-30 fixed z-10 bg-black transition-all duration-300 flex flex-col items-center justify-end md:justify-center
                   ${panel === 'menu' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <div className="flex flex-col items-center justify-center py-30">
        <Link to={'/'}>
          <p
            className={`${light === 'Home' ? 'text-gray-50' : 'text-gray-50/60'} text-2xl pb-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
          >
            Home
          </p>
        </Link>
        <Link to={'/discover'}>
          <p
            className={`${light === 'Discover' ? 'text-gray-50' : 'text-gray-50/60'} text-2xl pb-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
          >
            Discover
          </p>
        </Link>
        <Link to={'/about'}>
          <p
            className={`${light === 'About' ? 'text-gray-50' : 'text-gray-50/60'} text-2xl hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
          >
            About
          </p>
        </Link>
      </div>

      <hr className="border border-gray-50/10 w-full" />

      <div className=" w-full p-8 sm:px-15 md:px-20 flex flex-col">
        <p className="text-gray-50/40 text-lg pb-4 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
          Terms
        </p>
        <p className="text-gray-50/40 text-lg pb-4 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
          Privacy Policy
        </p>
        <p className="text-gray-50/40 text-lg hover:text-gray-50 transition-colors duration-150 cursor-pointer">
          Cookies
        </p>
      </div>

      <hr className="border border-gray-50/10 w-full" />

      <div className=" w-full p-8 sm:px-15 md:px-20 flex flex-col">
        <p className="text-gray-50/40 text-lg pb-4 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
          Feedback
        </p>
        <p className="text-gray-50/40 text-lg hover:text-gray-50 transition-colors duration-150 cursor-pointer">
          Contact
        </p>
      </div>

      <hr className="border border-gray-50/10 w-full" />

      <div className="w-full p-8 sm:px-15 md:px-20 flex text-gray-50/40 justify-between">
        <div className="w-1/2 flex items-center">
          <FaDiscord className="w-6 h-6 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />

          <FaFacebookSquare className="w-7 h-7 ps-3 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />

          <FaInstagramSquare className="w-7 h-7 ps-3 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
        </div>

        <div className="w-1/2 flex justify-end">
          <p className="text-gray-50/40 text-lg">Genera@2026</p>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
