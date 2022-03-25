import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime(); // get end current time in millisends

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);

}

const getReturnValues = (countDown) => {
    // Calc Time Left
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );


    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [hours, minutes, seconds, countDown];
}

export { useCountdown };