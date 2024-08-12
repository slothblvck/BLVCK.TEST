import { useEffect, useState } from 'react'

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime()

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [countDownDate])

    return getReturnValues(countDown)
}

const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

    return [days, hours, minutes, seconds]
}

export { useCountdown }

export const getDateString = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000)

    var interval = seconds / 31536000

    if (interval > 1) {
        return Math.floor(interval) + ' years ago'
    }
    interval = seconds / 2592000
    if (interval > 1) {
        return Math.floor(interval) + ' month ago'
    }
    interval = seconds / 86400
    if (interval > 1) {
        return Math.floor(interval) + ' days ago'
    }
    interval = seconds / 3600
    if (interval > 1) {
        return Math.floor(interval) + ' hour ago'
    }
    interval = seconds / 60
    if (interval > 1) {
        return Math.floor(interval) + ' min ago'
    }
    return Math.floor(seconds) + ' sec ago'
}