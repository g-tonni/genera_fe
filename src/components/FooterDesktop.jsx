import { Link, useLocation } from 'react-router-dom'
import { FaDiscord } from 'react-icons/fa6'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'
import { useEffect, useState } from 'react'

function FooterDesktop() {
  const location = useLocation()
  const [visible, setVisible] = useState(location.pathname !== '/')

  useEffect(() => {
    if (location.pathname !== '/') return

    const handleScroll = () => {
      const headerHeight = window.innerHeight * 0.1
      setVisible(window.scrollY > headerHeight)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
    <div
      className={`fixed bottom-0 z-10 w-full h-14 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black hidden lg:flex justify-between items-center transition-all duration-300
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
    >
      <div className="flex items-center w-1/3">
        <Link to={'/'}>
          <p className="text-gray-50/40 text-sm xl:text-base pe-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
            Terms
          </p>
        </Link>
        <Link to="/discover">
          <p className="text-gray-50/40 border-x border-gray-50/40 text-sm xl:text-base px-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
            Privacy Policy
          </p>
        </Link>
        <Link to={'/about'}>
          <p className="text-gray-50/40 text-sm xl:text-base ps-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
            Cookies
          </p>
        </Link>
      </div>

      <div className="flex items-center justify-center w-1/3">
        <p className="text-gray-50/40 text-sm xl:text-base transition-colors duration-150">
          Genera@2026
        </p>
      </div>

      <div className="flex items-center justify-end w-1/3 text-gray-50/40">
        <div className="flex items-center pe-5">
          <FaDiscord className="w-5 h-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />

          <FaFacebookSquare className="w-7 h-7 ps-3 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />

          <FaInstagramSquare className="w-7 h-7 ps-3 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
        </div>

        <Link to="/discover">
          <p className="text-gray-50/40 border-x border-gray-50/40 text-sm xl:text-base px-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
            Feedback
          </p>
        </Link>

        <Link to={'/about'}>
          <p className="text-gray-50/40 text-sm xl:text-base ps-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer">
            Contact
          </p>
        </Link>
      </div>
    </div>
  )
}

export default FooterDesktop
