import React, { useState, useEffect } from 'react';

const OfferCountDown = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let timer;

    const startCountdown = () => {
      const storedEndTime = localStorage.getItem('countdownEndTime');
      let endTime;

      if (storedEndTime) {
        // Use the stored end time if available
        endTime = parseInt(storedEndTime, 10);
      } else {
        // Set the end time if not available (e.g., first visit)
        endTime = Date.now() + 10 * 24 * 60 * 60 * 1000;
        localStorage.setItem('countdownEndTime', endTime);
      }

      const updateCountdown = () => {
        const now = new Date();
        const timeRemaining = endTime - now.getTime();

        if (timeRemaining <= 0) {
          clearInterval(timer);
          localStorage.removeItem('countdownEndTime');
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hoursRemaining = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
          const minutesRemaining = Math.floor((timeRemaining / (1000 * 60)) % 60);
          const secondsRemaining = Math.floor(timeRemaining / 1000) % 60;

          setCountdown({
            days: daysRemaining,
            hours: hoursRemaining,
            minutes: minutesRemaining,
            seconds: secondsRemaining,
          });
        }
      };

      // Update countdown immediately
      updateCountdown();

      // Set up interval to update countdown every second
      timer = setInterval(updateCountdown, 1000);
    };

    startCountdown();

    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div  >
    <div   className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md" data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500">
          <h1 className="text-xl md:text-2xl lg:text-5xl font-medium md:font-bold">Limited Time Offer!</h1>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium md:font-bold">Save 30% for the next 10 days!</h1>
          <p className="py-6">Do not miss out on this exclusive deal. Hurry up and grab your favorites before the offer ends!</p>
          <div  className="grid justify-center grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-3 md:p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-3xl md:text-5xl">
                <span style={{ "--value": countdown.days }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-3 md:p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-3xl md:text-5xl">
                <span style={{ "--value": countdown.hours }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-3 md:p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-3xl md:text-5xl">
                <span style={{ "--value": countdown.minutes }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-3 md:p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-3xl md:text-5xl">
                <span style={{ "--value": countdown.seconds }}></span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default OfferCountDown;
