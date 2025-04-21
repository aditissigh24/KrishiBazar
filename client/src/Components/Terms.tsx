import { Link } from "react-router-dom";
export default function TermsAndConditions() {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-center text-[#0f440b]  mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">Last Updated: April 21, 2025</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose max-w-none text-gray-700">
            <section className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Introduction
              </h2>
              <p className="">
                Welcome to our platform. These Terms and Conditions govern your
                use of our website and services. By accessing or using our
                services, you agree to be bound by these Terms. If you disagree
                with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  By Registering or successfully transacting on
                  www.liveorganic.co.in, you hereby agree to receive Updates
                  about our Products and your Orders. All shoppers have to
                  register and log in for placing orders on the Site. You have
                  to keep your account and registration details current and
                  correct for communications related to your purchases from the
                  site. By agreeing to the terms and conditions, the shopper
                  agrees to receive promotional communication through and
                  newsletters through email, SMS and WhatsApp upon registration.
                </li>
                <li>
                  We strive to provide correct product and pricing information
                  but human typographical errors can occur, in such cases, Live
                  Organic reserves the right to refuse or cancel the order.
                </li>
                <li>
                  Price of our products keeps changing frequently, you will be
                  charged at the prices that were applicable at this time of
                  order.
                </li>
                <li>
                  All Fresh produce items are sold on estimate weights.Actual
                  product weight may vary. Final invoice will be as per actual
                  weight.
                </li>
                <li>
                  All Fresh produce items are currently delivered only in
                  Gurgaon and Delhi. All the other items can be delivered across
                  India.
                </li>
                <li>
                  Live Organic reserves the right, at our sole discretion, to
                  limit the quantity of items purchased per person, per
                  household or per order.
                </li>
                <li>
                  We have provided the estimate time to deliver the products and
                  we do everything to meet the deadline but the actual time can
                  vary because of some circumstances beyond our control.
                </li>
                <li>
                  Live Organic values the privacy of information pertaining to
                  its associates. We do not use or disclose information about
                  your individual visits to our website or any information that
                  you may give us, such as your name, address, email address or
                  telephone number, to any outside sources
                </li>
                <li>
                  We will be sending you occassional communication about ongoing
                  promotions and our newsletters. You can opt out by contacting
                  our customer service
                </li>
                <li>
                  You are prohibited from violating or attempting to violate the
                  security of the Website and You agree, understand and confirm
                  that the credit / debit card details or other financial
                  details provided by you for availing of services on
                  LiveOrganic.co.in will be correct and accurate and you shall
                  not use the credit /debit card or financial facility which is
                  not lawfully owned / obtained by you
                </li>
                <li>
                  The Courts at Gurgaon shall have exclusive jurisdiction in any
                  proceedings arising out of this agreement.
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/">
            <button className="hover:bg-[#176112ac] mt-2 cursor-pointer bg-[#0e301fe9] text-white px-6 py-3 rounded-md font-medium  transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
