import React from 'react'
import logo from '../../assets/logo.png'
import ArrowForward from '../../assets/svg/ArrowForward'
// import { ETHX } from '../../data/ETHX'

const RecentListCard = ({ recent }) => {
    return (
        <a
            href={`https://opensea.io/assets/ethereum/0x5c9f8b00db5ae281e8f401789224fe0227f24d81/${recent?.nft?.type?.tokenId}`}
            target='_blank'
            rel='noreferrer'
            data-hover='Go to Opensea'
            className='w-full h-full rounded-lg recent-sales-click-btn recentsales-btn-style'
        >
            <div className='spann_recent_sale flex py-2 px-1 items-center w-full justify-between h-full'>
                {/* LEFT */}
                <div className='flex items-center gap-x-2'>
                    {/* IMAGE */}
                    <img
                        // src={ETHX[recent?.nft?.type?.tokenId - 1].image}
                        alt={''}
                        className='w-[36px] rounded-full object-cover'
                    />
                    {/* TEXT INFO */}
                    <div className='flex flex-col h-full justify-start items-start'>
                        {/* TITLE */}
                        <h2 className='font-[400] text-lg'>BLVCK</h2>
                        {/* USERNAME */}
                        <p className='font-[400] text-sm text-lightText'>
                            #{recent?.nft?.type?.tokenId}
                            {/* @{recent?.username}{' '} */}
                        </p>
                    </div>
                </div>
                {/* RIGHT */}
                <div className='flex flex-col h-[36px] justify-between items-end'>
                    {/* DATE */}
                    <p className='font-[400] text-xs text-lightText'>
                        {new Date(recent?.date).toLocaleString()}
                    </p>
                    {/* Icon */}
                    {/* <ArrowForward
                        style={{ fontSize: '12px' }}
                        // color='#747AA1'
                    /> */}
                </div>
            </div>
        </a>
    )
}

export default RecentListCard
