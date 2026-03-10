import { VscAccount } from 'react-icons/vsc'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function NavbarDesktop({ light }) {
  return (
    <div className="fixed z-10 w-full h-20 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black hidden lg:flex justify-between items-center ">
      <div className="flex items-center w-1/3">
        <div className="h-full w-5">
          <Link to={'/'}>
            <img
              src="https://res.cloudinary.com/cloudgiada/image/upload/v1773138526/logo_kjqc47.png"
              alt="logo"
            />
          </Link>
        </div>
        <Link to={'/'}>
          <p
            className={`${light === 'Home' ? 'text-gray-50' : 'text-gray-50/60'} text-sm xl:text-base ps-5 xl:ps-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
          >
            Home
          </p>
        </Link>
        <Link to={'/discover'}>
          <p
            className={`${light === 'Discover' ? 'text-gray-50' : 'text-gray-50/60'} text-sm xl:text-base ps-5 xl:ps-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
          >
            Discover
          </p>
        </Link>
        <Link to={'/about'}>
          <p
            className={`${light === 'About' ? 'text-gray-50' : 'text-gray-50/60'} text-sm xl:text-base ps-5 xl:ps-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
          >
            About
          </p>
        </Link>
      </div>

      <div className="w-1/3 flex justify-center">
        <div className="relative w-full 2xl:w-2/3 max-w-md h-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <IoSearch />
          </span>

          <input
            type="search"
            placeholder="Search projects, users..."
            className="w-full bg-neutral-900 text-gray-50 ps-10 pe-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="w-1/3 flex justify-end">
        <div
          className={`${light === 'Profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer h-full w-1/10 xl:w-1/20 flex justify-end`}
        >
          <VscAccount className="h-full w-6 flex" />
        </div>
      </div>
    </div>
  )
}

export default NavbarDesktop
