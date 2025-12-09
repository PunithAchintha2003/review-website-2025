import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'

const Premium = () => {
  const PREMIUM_PRICE = 1000; // LKR
  const PLAN_NAME = "Premium";

  const handlePremiumPayment = async () => {
    try {

      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);

      const response = await Axios({
        ...SummaryApi.payment_url, // This should be configured for premium purchase
        data: { plan: PLAN_NAME }
      });

      const { data } = response;
      if (data?.id && stripePromise) {
        await stripePromise.redirectToCheckout({ sessionId: data.id });
      } else {
        toast.dismiss();
        toast.error("Stripe session creation failed");
      }

    } catch (error) {
      toast.dismiss();
      AxiosToastError(error);
    }
  };

  return (
    <section className=''>
        <div className="p-2 bg-green-200 shadow-md flex items-center justify-between">
            <h2 className="font-semibold py-1">The Premium Membership</h2>
        </div>

        <div className="flex justify-center items-center w-full mt-10 px-4">
    <div className=" rounded-md border border-green-600 shadow-lg p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Premium Membership</h2>
      <p className="text-gray-600 mb-6 text-center">
        Unlock access to all premium content with a one-time payment.
      </p>

      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-green-600">{DisplayPriceInRupees(PREMIUM_PRICE)}</p>
      </div>

      <button
        className="w-full py-3 bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold rounded-lg"
        onClick={handlePremiumPayment}
      >
        Buy Premium
      </button>
    </div>
  </div>
    </section>
  );
}

export default Premium;
