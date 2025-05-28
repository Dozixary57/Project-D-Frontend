import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@components/Navbar/Navbar";
import { Footer } from "@components/Footer/Footer";
import { CrowdfundingProgressBar, CrowdfundingRoadmap, CrowdfundingStage, CrowdfundingStageGoal } from "@components/CrowdfundingProgressBar/CrowdfundingProgressBar";
import { useNavigate } from "react-router-dom";
import style from "./DonationPage.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@ReduxStore/store";
import PaymentService from "@services/PaymentService";
import { useTranslation } from "react-i18next";

const DonationPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  const [donateAmount, setDonateAmount] = useState(100);

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const [userContribution, setUserContribution] = useState<number>(0);

  const handlePayment = async () => {
    setIsPaymentSuccessful(false);
    setIsPaymentProcessing(true);

    const paymentResult = await PaymentService.makeYookassaPayment(donateAmount);
    if (paymentResult?.PaymentId && paymentResult?.ConfirmationUrl) {
      setPaymentId(paymentResult.PaymentId);
      window.open(paymentResult.ConfirmationUrl, '_blank');
    } else {
      setIsPaymentProcessing(false);
      setPaymentId(null);
    }
  };

  useEffect(() => {
    if (!paymentId || isPaymentSuccessful) return;

    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const pollStatus = async () => {
      try {
        let status = null;
        await PaymentService.checkYookassaPayment(paymentId)
          .then((res) => {
            status = res || null
          });

        console.log('[CLIENT] payment status:', status);

        if (status === 'succeeded') {
          setIsPaymentSuccessful(true);
          setIsPaymentProcessing(false);
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        }

        if (status === 'canceled') {
          setIsPaymentProcessing(false);
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        }
      } catch (err) {
        console.error('[CLIENT] Error checking payment status:', err);
      }
    };

    intervalId = setInterval(pollStatus, 1_000); // every 1 seconds
    timeoutId = setTimeout(() => clearInterval(intervalId), 10 * 60 * 1000); // 10 min

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [paymentId]);

  useEffect(() => {
    (async () => {
      const userDonationAmount = await PaymentService.getUserDonationAmount();
      setUserContribution(userDonationAmount > 0 ? userDonationAmount : 0);
    })();
  }, [isPaymentSuccessful])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Donation | Project D</title>
      </Helmet>
      <Navbar />
      <main className={style.DONATION_PAGE}>
        <div className={style.CrowdfundingElement}>
          <h3 className={style.CrowdfundingHeader}>{t('crowdfunding.title')}</h3>
          <div className={style.CrowdfundingDescription}>
            <h5>
              <CrowdfundingStageGoal.Title />
            </h5>
            <CrowdfundingStageGoal.Description />
          </div>

          <CrowdfundingProgressBar />
          <CrowdfundingRoadmap />
          <CrowdfundingStage />
        </div>
        {userContribution > 0 && <p className={style.UserContribution}>{t('crowdfunding.yourContribution')} {userContribution.toLocaleString('ru-RU')} руб.</p>}
        <div className={style.MakeDonation}>
          <p className={`${style.ActionStatus} ${isPaymentProcessing || isPaymentSuccessful ? style.isProcessing : ''}`}>
            {isPaymentSuccessful ? "Donation is successful!" : isPaymentProcessing ? "Donation is pending..." : ""}
          </p>
          <div className={style.DonationInput}>
            <input
              type="text"
              value={donateAmount}
              onChange={(e) => {
                let value = e.target.value;

                value = value.replace(/\D/g, '');

                if (value.startsWith('0')) {
                  value = value.slice(1);
                }

                if (value !== '' && parseInt(value) > 100000) {
                  value = '100000';
                }

                setDonateAmount(Number(value));
              }}
              onBlur={() => {
                const numericValue = parseInt(String(donateAmount), 10);

                if (isNaN(numericValue) || numericValue < 100) {
                  setDonateAmount(Number(100));
                }
              }}
              onKeyDown={(event) => {
                const invalidChars = ['e', 'E', '+', '-', '.', ',', ' '];
                if (invalidChars.includes(event.key)) {
                  event.preventDefault();
                }
              }}
              placeholder="100 p."
            />
            <button
              onClick={() => { if (isAuthorized) { handlePayment(); } else { navigate('/Login'); } }}
              disabled={isPaymentProcessing}
            >
              {!isAuthorized ? t('crowdfunding.loginToDonate') : isPaymentSuccessful ? t('crowdfunding.makeAnotherDonation') : t('crowdfunding.donateViaYooMoney')}
            </button>
          </div>
          <p className={style.DonationDescription}>
            {t('crowdfunding.note')}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DonationPage;