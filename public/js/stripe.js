import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_51QVwy8FW00eZjaiBTQc3pnxVh8POTY4iNlOBXUOtLZGEERecySt0oR7ndxWaaDJd63kwI3spGpqiica63POIVbfo00GzrVBn7B')

export const bookTour = async (tourId) => {
   try {
      const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

      await stripe.redirectToCheckout({
         sessionId: session.data.session.id
      });
   } catch (err) {
      console.log(err);
      showAlert('error', err);
   }
}

