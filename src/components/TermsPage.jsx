import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'

function TermsPage() {
  return (
    <>
      <NavbarDesktop light="Terms" />
      <NavbarMobile light="Terms" />
      <FooterDesktop />

      <div className="bg-black text-gray-50/70 min-h-screen flex justify-center font-thin px-12">
        <div className="w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 py-50 flex flex-col">
          <p className="text-4xl font-bold pb-4 text-gray-50">
            Terms and Conditions
          </p>
          <p className="text-sm pb-15">Last Updated: March 21, 2026</p>
          <p className="pb-15">
            Welcome to{' '}
            <span className="italic font-semibold text-gray-50">Genera</span>.
            By accessing our website and using our services, you agree to comply
            with the following terms.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            1. Description of Service
          </p>
          <p className="pb-15">
            <span className="italic font-semibold text-gray-50">Genera</span> is
            a social platform for digital art that allows users to create, view,
            share, and interact with code-based sketches (p5.js).
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            2. Registration and Responsibility
          </p>
          <p className="pb-15">
            - Users are responsible for maintaining the security of their
            passwords. <br />- Users are solely responsible for any activity
            that occurs under their account.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            3. Intellectual Property and Licensing
          </p>
          <p className="pb-15">
            - <span className="font-semibold">User Content:</span> You retain
            ownership of the sketches you create. However, by publishing a
            sketch, you grant{' '}
            <span className="italic font-semibold text-gray-50">Genera</span> a
            non-exclusive, royalty-free license to display, host, and promote
            the content on the platform. <br />-{' '}
            <span className="font-semibold">Open Source:</span> By default,
            unless otherwise specified, published sketches are intended for
            educational purposes. We encourage you to specify a license (e.g.,
            MIT or Creative Commons) within your code comments.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            4. User Conduct and Security
          </p>
          <p className="pb-15">
            The following actions are strictly prohibited: <br />
            - Uploading malicious code, viruses, or scripts intended to harm the
            site or the user experience. <br />- Using the platform for
            harassment, spam, or offensive content. <br />- Infringing upon the
            copyrights of other artists.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            5. Limitation of Liability
          </p>
          <p className="pb-15">
            The service is provided "as is."{' '}
            <span className="italic font-semibold text-gray-50">Genera</span>{' '}
            does not warrant that the service will be uninterrupted or
            error-free. We are not responsible for data loss or damages
            resulting from the execution of user-created sketches.
          </p>
        </div>
      </div>
    </>
  )
}

export default TermsPage
