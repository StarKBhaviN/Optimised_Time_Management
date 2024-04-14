import { React, useEffect } from 'react'
import "../Styles/Clock.css"

function Clock() {
    useEffect(() => {
        const secondHand = document.querySelector('.second-hand');
        const minsHand = document.querySelector('.min-hand');
        const hourHand = document.querySelector('.hour-hand');

        function setDate() {
            const now = new Date();

            const seconds = now.getSeconds();
            const secondsDegrees = ((seconds / 60) * 360) + 90;
            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

            const mins = now.getMinutes();
            const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
            minsHand.style.transform = `rotate(${minsDegrees}deg)`;

            const hour = now.getHours();
            const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
            hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        }

        const intervalId = setInterval(setDate, 1000);
        setDate(); // Call setDate initially to set the clock without waiting for the first second to pass

        return () => clearInterval(intervalId); // Cleanup the interval on unmount page
    }, []);
    return (
        <>
            <div className="outerSecion">
                <div className="clock">
                    <div className="outer-clock-face">
                        <div className="marking marking-one"></div>
                        <div className="marking marking-two"></div>
                        <div className="marking marking-three"></div>
                        <div className="marking marking-four"></div>
                        <div className="inner-clock-face">
                            <div className="hand hour-hand"></div>
                            <div className="hand min-hand"></div>
                            <div className="hand second-hand"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clock
