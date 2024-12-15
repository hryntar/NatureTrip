import axios from 'axios';

const stripe = Stripe('pk_test_51QVwy8FW00eZjaiBTQc3pnxVh8POTY4iNlOBXUOtLZGEERecySt0oR7ndxWaaDJd63kwI3spGpqiica63POIVbfo00GzrVBn7B')

export const bookTour = async (tourId) => {
   const session = await axios(`http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`);
   console.log(session);
}
