import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'

function PrivacyPolicyPage() {
  return (
    <>
      <NavbarDesktop light="Privacy" />
      <NavbarMobile light="Privacy" />
      <FooterDesktop />

      <div className="bg-black text-gray-50/70 min-h-screen flex justify-center font-thin px-12">
        <div className="w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 py-50 flex flex-col">
          <p className="text-4xl font-bold pb-4 text-gray-50">Privacy Policy</p>
          <p className="text-sm pb-15">Last Updated: March 21, 2026</p>
          <p className="pb-15">
            Your privacy is important to us. This policy explains what data we
            collect, how we use it, and what your rights are regarding{' '}
            <span className="italic font-semibold text-gray-50">Genera</span>.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            1. Data We Collect
          </p>
          <p className="pb-15">
            - <span className="font-semibold">Registration Data:</span> When you
            create an account, we collect your email address, username, and
            password (encrypted).
            <br />- <span className="font-semibold">User Content:</span> We
            store the sketches, comments, "likes," and profile information you
            choose to publish. <br />-{' '}
            <span className="font-semibold">Navigation Data:</span> We may
            collect technical information such as your IP address, browser type,
            and system logs for security and maintenance purposes.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            2. How We Use Your Data
          </p>
          <p className="pb-15">
            We use your information to: <br />
            - Provide and manage your account.
            <br />- Enable you to publish and share your sketches. <br />- Send
            you service-related communications (e.g., password resets). <br />-
            Ensure platform security and prevent abuse.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            3. Data Sharing
          </p>
          <p className="pb-15">
            We do not sell your data to third parties. Your data may only be
            shared: - With service providers (e.g., database hosting) necessary
            for the operation of the website.
            <br />- If required by law or to protect our rights.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            4. Data Security
          </p>
          <p className="pb-15">
            We implement technical measures (such as password hashing) to
            protect your data. However, no system is 100% secure; we encourage
            you to use strong passwords.
          </p>

          <p className="text-lg font-semibold text-gray-50 pb-4">
            5. Your Rights
          </p>
          <p className="pb-15">
            You have the right to access, rectify, or delete your personal data
            at any time through your profile settings or by contacting us via
            email.
          </p>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicyPage
