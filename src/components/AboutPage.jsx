import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'

function AboutPage() {
  return (
    <>
      <NavbarDesktop light="About" />
      <NavbarMobile light="About" />
      <FooterDesktop />

      <div className="bg-black text-gray-50/70 min-h-screen flex justify-center font-thin px-12"></div>
    </>
  )
}

export default AboutPage
