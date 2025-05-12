import { GetCurrentUserAccessTokenPayload, GetCurrentUserAccessTokenString } from '@tools/GetUserData';
import axios from 'axios';

const PaymentService = {
  makeYookassaPayment: async (donateAmount: number) => {
    const commissionRate = 0.035; // 3.5%

    let result: any = null;

    const userAccessTokenString = localStorage.getItem('AccessToken');
    const headers: { [key: string]: string } = {};

    if (userAccessTokenString !== null && userAccessTokenString.length > 0) {
      const userAccessToken = JSON.parse(userAccessTokenString);
      headers['Authorization'] = 'Bearer ' + userAccessToken;
    }

    await axios.post(
      `${process.env.REACT_APP_AUTH_API}/create-payment-yookassa`,
      { UserId: GetCurrentUserAccessTokenPayload()?._id, DonateAmount: donateAmount, CommissionRate: commissionRate },
      { headers, withCredentials: true, timeout: 8000 }
    )
      .then((res) => {
        result = res.data || null;
      })
      .catch(error => {
        console.log(error);
      });
    return result;
  },
  checkYookassaPayment: async (paymentId: string) => {
    let result: any = null;
    await axios.post(
      `${process.env.REACT_APP_AUTH_API}/check-payment-yookassa`,
      { PaymentId: paymentId }
    )
      .then((res) => {
        result = res.data.status || null;
      })
      .catch(error => {
        console.log(error)
      });
    return result;
  },

  getUserDonationAmount: async () => {
    let result: any = null;
    await axios.post(
      `${process.env.REACT_APP_AUTH_API}/UserDonationAmount`,
      { UserId: GetCurrentUserAccessTokenPayload()?._id },
      { withCredentials: true, timeout: 8000 }
    )
      .then((res) => {
        result = res.data || null;
      })
      .catch(error => {
        console.log(error)
      });
    return result;
  },
}

export default PaymentService;