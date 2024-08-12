import React from 'react'
import { useCountdown } from '../../hooks/Countdown'
import Expired from './Expired'
import ShowCounter from './ShowCounter'

const CardTimer = ({ targetData, coloured }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetData)

    if (days + hours + minutes + seconds <= 0) {
        return <Expired />
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                coloured={coloured}
                seconds={seconds}
            />
        )
    }
}

export default CardTimer
