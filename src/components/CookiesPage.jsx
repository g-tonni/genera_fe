import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'

function CookiesPage() {
  return (
    <>
      <NavbarDesktop light="Cookies" />
      <NavbarMobile light="Cookies" />
      <FooterDesktop />

      <div className="bg-black text-gray-50/70 min-h-screen flex justify-center font-thin px-12">
        <div className="w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 py-50 flex flex-col">
          <p className="text-4xl font-bold pb-4 text-gray-50">Cookie Policy</p>
          <p className="text-sm pb-15">Last Updated: March 21, 2026</p>
          <p className="pb-15">
            We use cookies to ensure that our digital art platform works
            correctly and to provide you with the best possible experience.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            1. What are Cookies?
          </p>
          <p className="pb-15">
            -{' '}
            <span className="font-semibold">
              Technical Cookies (Essential):
            </span>{' '}
            These are necessary for the website to function. For example, they
            allow us to keep you logged into your account while you move between
            sketches or comment on artworks. Without these cookies, the service
            cannot operate.
            <br />-{' '}
            <span className="font-semibold">Functionality Cookies:</span> Used
            to remember your preferences, such as language choice or the code
            editor theme (dark/light mode).
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            3. Third-Party Cookies
          </p>
          <p className="pb-15">
            At the moment,{' '}
            <span className="italic font-semibold text-gray-50">Genera</span>{' '}
            aims to minimize the use of third-party cookies. However, we may use
            services such as:
            <br />- <span className="font-semibold">Analytics:</span> (If
            applicable, e.g., Google Analytics) To understand how many people
            visit the site and which sketches are most popular. Data is
            collected anonymously.
            <br />- <span className="font-semibold">Embeds:</span> If you view
            embedded external content (e.g., video tutorials), those services
            may set their own cookies.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            4. How to control Cookies?
          </p>
          <p className="pb-15">
            You can control or delete cookies through your browser settings.
            Please note that if you disable technical cookies, you may not be
            able to log in or save your sketches.
          </p>
        </div>
      </div>
    </>
  )
}

export default CookiesPage
