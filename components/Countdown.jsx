import { Stack, Text, } from "@chakra-ui/react"
// import { useCountdown } from "../hooks/useCountdown"
import Countdown from "react-countdown";


const Counter = ({ title, totalTime, onComplete }) => {
    // const time_in3_min = 3 * 60 * 1000;
    // const now_time = new Date().getTime();

    // const total_time = time_in3_min + now_time;



    // console.log(hours, minutes, seconds, countDown);
    const renderer = ({ hours, minutes, seconds }) => (
        <Stack spacing={5} direction={"row"}>
            <Text>{hours} Hours</Text>
            <Text>{minutes} Minutes</Text>
            <Text>{seconds} Seconds</Text>
        </Stack>
    )

    return (
        <Stack spacing={3}>
            <Text size={"lg"}>{title}</Text>
            {/* Time lapse */}
            <Countdown
                date={totalTime}
                renderer={renderer}
                onComplete={onComplete}
            />
        </Stack>
    )
}

export default Counter;