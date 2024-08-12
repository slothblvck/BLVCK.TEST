import React, { useState } from 'react'
import lowerSvg from '../../assets/svg/lowerIntersect.svg'
import crownSvg from '../../assets/svg/crownBg.svg'
import upperSvg from '../../assets/svg/upperIntersect.svg'
import arrowRight from '../../assets/svg/arrowRightKey.svg'
import arrowLeft from '../../assets/svg/arrowLeftKey.svg'

const WinnerCard = ({ winner, userInfo, curr, setCurr }) => {
    const fetchPrev = () => {
        if (curr > 0) {
            setCurr(curr - 1)
        }
    }
    const fetchNext = () => {
        if (curr < winner.length - 1) {
            setCurr(curr + 1)
        }
    }

    return (
        <div className='w-full h-44 bg-[#101010] rounded-lg drop-shadow-[4px_4px_16px_rgba(0,0,0,0.16)] flex items-center justify-center relative overflow-hidden'>
            <img
                src={lowerSvg}
                alt=''
                className='absolute left-0 bottom-0 rounded-br-lg blur-[9px]'
            />
            <img
                src={upperSvg}
                alt=''
                className='absolute right-0 top-0 rounded-tr-lg blur-[9px]'
            />
            <div className='absolute h-full w-full flex items-center justify-center rounded-lg bg-[#00000066] backdrop-blur-3xl' />
            <img src={crownSvg} alt='' className='z-[1]' />
            <h1 className='absolute h-full w-full flex items-center justify-center rounded-lg text-2xl font-[500] top-3'>
                {winner[curr]?.username}
            </h1>
            {userInfo.isAdmin && (
                <h1 className='absolute w-full flex items-end justify-center rounded-lg text-[11px] font-[300] bottom-2 left-0 z-10 underline underline-offset-2'>
                    {winner[curr]?.participant}
                </h1>
            )}
            {winner.length > 1 && (
                <div className='absolute top-2 right-[0.7rem] bg-[#b8b8b894] z-10 text-black text-sm font-[500] h-8 w-min px-4 py-3 flex justify-center items-center rounded-full backdrop-blur cursor-pointer'>
                    {curr + 1 + '/' + winner.length}
                </div>
            )}
            {winner.length > 1 && curr > 0 && (
                <div
                    className='absolute left-2 flex items-center rounded-full w-4 h-4 justify-center bg-[#b8b8b894] cursor-pointer top-[52%]'
                    onClick={() => fetchPrev()}
                >
                    <img src={arrowLeft} alt='' className='' />
                </div>
            )}
            {winner.length > 1 && curr < winner.length - 1 && (
                <div
                    className='absolute right-2 flex items-center rounded-full w-4 h-4 justify-center bg-[#b8b8b894] cursor-pointer top-[52%]'
                    onClick={() => fetchNext()}
                >
                    <img src={arrowRight} alt='' />
                </div>
            )}
        </div>
    )
}

export default WinnerCard
