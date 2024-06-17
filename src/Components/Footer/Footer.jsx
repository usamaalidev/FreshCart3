import paypalLogo from "../../assets/images/paypal.png";
import masterCardLogo from "../../assets/images/mastercard.webp";
import americanExpressLogo from "../../assets/images/American-Express-Color.png";
import amazonPay from "../../assets/images/amazon-pay.png";
import appleStoreLogo from "../../assets/images/get-apple-store.png";
import googlePlayLogo from "../../assets/images/get-google-play.png";
export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-10 absolute bottom-0 left-0 right-0 z-40">
        <div className="container">
          <h2 className="text-2xl font-bold">Get the FreshCart App</h2>
          <p className="my-2">
            We will send you a link, open it on your phone to download the app
          </p>
          <div className="flex gap-4">
            <input
              type="email"
              className="form-control w-auto flex-grow "
              placeholder="Email..."
            />
            <button className="btn-primary px-8 ">Share App Link</button>
          </div>
          <div className="mt-4 border-y-2 border-slate-200 py-4 flex justify-between items-center">
            <div className="payment flex items-center gap-2">
              <span>Payment Partners </span>
              <div className="flex items-center gap-2">
                <a href="https://pay.amazon.com/">
                  <img
                    className="w-16 h-8 object-contain object-center"
                    src={amazonPay}
                    alt="Amazon pay Logo"
                  />
                </a>
                <a href="https://www.americanexpress.com/">
                  <img
                    className="w-16 h-8 object-contain object-center"
                    src={americanExpressLogo}
                    alt="American Express Logo"
                  />
                </a>
                <a href="https://www.mastercard.us/en-us.html">
                  <img
                    className="w-16 h-6 object-contain object-center"
                    src={masterCardLogo}
                    alt="MasterCard Logo"
                  />
                </a>
                <a href="https://www.paypal.com/eg/home">
                  <img
                    className="w-16 h-8 object-contain object-center"
                    src={paypalLogo}
                    alt="Paypal Logo"
                  />
                </a>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span>Get deliveries with FreshCart</span>
              <div className="flex gap-2 items-center">
                <a href="https://www.apple.com/store">
                  <img
                    className="w-20 h-10 object-contain object-center"
                    src={appleStoreLogo}
                    alt="Apple Store Logo"
                  />
                </a>
                <a href="https://play.google.com/store">
                  <img
                    className="w-20 h-10 object-contain object-center"
                    src={googlePlayLogo}
                    alt="Google Play Logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
