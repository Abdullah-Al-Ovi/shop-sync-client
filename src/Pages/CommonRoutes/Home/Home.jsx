import React from 'react';
import Faq from './FAQ/faq';
import DownloadApp from './DownloadApp/DownloadApp';
import ReviewSection from './ReviewSection/ReviewSection';
import OfferCountdown from './OfferCountDown';
import Banner from './banner';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OfferCountdown></OfferCountdown>
            <Faq></Faq>
            <ReviewSection></ReviewSection>
            <DownloadApp></DownloadApp>
        </div>
    );
};

export default Home;