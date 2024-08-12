import React from 'react'

const ShowCounter = ({
    days,
    hours,
    minutes,
    seconds,
    coloured,
}) => {
    const styles = {
        defaultTimingNumber: `font-[700] text-base ${
            coloured ? 'text-white text-lg' : 'text-[#DFDFDF]'
        }`,
        defaultTiming: `font-[400] text-xs ${
            coloured ? 'text-[#565656] text-sm' : 'text-[#565656]'
        }`,
        timingcolon: `font-[700] text-base text-white ${
            coloured ? 'text-lg' : ''
        }`,
    }

    return (
        <div
            className={`flex items-center justify-between w-full ${
                coloured ? 'gap-x-3' : ''
            }`}
        >
            {days > 0 && (
                <>
                    <div className='flex flex-col items-center'>
                        <p className={styles.defaultTimingNumber}>{days}</p>
                        <p className={styles.defaultTiming}>Days</p>
                    </div>
                    <div
                        className={`flex flex-col items-start ${
                            coloured ? 'h-full' : 'h-[38px]'
                        }`}
                    >
                        <p className={styles.timingcolon}>:</p>
                    </div>
                </>
            )}
            <div className='flex flex-col items-center'>
                <p className={styles.defaultTimingNumber}>{hours}</p>
                <p className={styles.defaultTiming}>Hrs</p>
            </div>
            <div
                className={`flex flex-col items-start ${
                    coloured ? 'h-full' : 'h-[38px]'
                }`}
            >
                <p className={styles.timingcolon}>:</p>
            </div>
            <div className='flex flex-col items-center'>
                <p className={styles.defaultTimingNumber}>{minutes}</p>
                <p className={styles.defaultTiming}>Mins</p>
            </div>
            {(days === 0 ||
                (minutes === 0 &&
                    days === 0 &&
                    seconds === 0 &&
                    days === 0)) && (
                <>
                    <div
                        className={`flex flex-col items-start ${
                            coloured ? 'h-full' : 'h-[38px]'
                        }`}
                    >
                        <p className={styles.timingcolon}>:</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className={styles.defaultTimingNumber}>{seconds}</p>
                        <p className={styles.defaultTiming}>Secs</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default ShowCounter
