import React, { useEffect } from 'react'
// import BLVCKCollection from './../../data/BLVCK.json'
import refresh from '../../assets/svg/refresh.svg'

const StakeCard = ({
    stake,
    userInfo,
    coin,
    id,
    stakingRank,
    refreshNftMetadata,
    maxStakedInd,
    getMaxIndex,
    minRank
}) => {
    // console.log(BLVCKCollection[stake.token_id].rank)
    const getMax = (val) => {
        if (val > 9000) {
            return 25
        } else if (val > 8000) {
            return 50
        } else if (val > 7000) {
            return 75
        } else if (val > 6000) {
            return 100
        } else if (val > 5000) {
            return 125
        } else if (val > 4000) {
            return 150
        } else if (val > 3000) {
            return 175
        } else if (val > 2000) {
            return 200
        } else if (val > 1000) {
            return 225
        } else if (val > 10) {
            return 250
        } else {
            return 500
        }
    }

    const refreshNft = (e) => {
        document.getElementById(e.target.id).classList.add('rotation')
        refreshNftMetadata(e.target.id)
    }

    useEffect(() => {
        if (stake) {
            getMaxIndex()
        }
    })

    return (
        <>
            <div
                className={`stake__Card_parent rounded-xl  ${
                    stake?.listed ? 'opacity-50 -translate-y-2' : ''
                }
                ${maxStakedInd === id ? 'border-b-4' : ''}
                screen4:w-full h-min `}
                style={stake ? {} : { border: 'none' }}
            >
                <div
                    className={`stake__Card bg-activityBg p-4 pt-1 flex flex-col w-[255px] h-full rounded-lg screen4:w-full`}
                >
                    {!stake && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', zIndex: -1 }}>
                        <div style={{ width: '42.5%', background: 'linear-gradient(183deg, #D41E33 0.02%, #930716 101.55%, #930716 101.55%)' }}></div>
                        <div style={{ width: '15%', background: 'linear-gradient(1deg, #787B84 -2.16%, #C0C0C2 100.69%)' }}></div>
                        <div style={{ width: '42.5%', background: 'linear-gradient(174deg, rgba(30, 32, 40, 0.81) 0%, #232C44 100%)' }}></div>
                    </div>}
                    {/* Coins */}
                    <div className='h-[50px] flex items-center gap-x-1 pl-2'>
                        <span>{stake ? getMax(stake?.rank) : userInfo?.psgNFT} </span>
                        <img src={coin} alt='' />
                    </div>
                    {/* Image */}
                    <div
                        className={`relative rounded-xl group h-[220px] flex w-full mt-4 overflow-hidden`}
                    >
                        <img
                            src={!stake ? 'https://res.cloudinary.com/foxledgerstudio/image/upload/g_xy_center,q_auto:best/v1701378315/PSG_x_Blvck_box_vprfor.webp' : (stake?.imagePreviewUrl || stake?.IPFS)}
                            alt=''
                            className='rounded-xl object-cover w-[inherit] h-[inherit]'
                        />

                        {stake?.listed ? (
                            <div className='absolute bottom-0 left-0 w-full bg-[#000] z-10 text-sm font-[400] h-[50px] flex justify-center items-center backdrop-blur gap-x-1 rounded-b-xl'>
                                {/* <img src={logo} alt='logo' width={15} /> */}
                                <span className='text-white text-lg'>
                                    Listed on {stake?.listedMarketplace}
                                </span>
                            </div>
                        ) : (stake || (minRank < 11000)) && (
                            <div
                                className={`absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.7)] z-10 text-sm font-[400] h-[50px] flex justify-center items-center backdrop-blur gap-x-1 rounded-b-xl ${
                                    maxStakedInd !== id
                                        ? 'translate-y-[50px]'
                                        : ''
                                } group-hover:translate-y-0 group-hover:transition-all group-hover:ease group-hover:duration-200 duration-200 ease`}
                            >
                                {/* <img src={logo} alt='logo' width={15} /> */}
                                <span style={{ display: 'flex', gap: '6px' }} className='text-white text-lg'>
                                    {stake ? `Staked for ${(parseInt(stake?.stakedTime) == 0 ? 0 : (parseInt(stake?.stakedTime) || '-'))} Days` : `Boosted ${minRank > 1000 ? (minRank > 2000 ? 50 : 100) : 150}`}
                                    {!stake && <img src={coin} alt='' />}
                                </span>
                            </div>
                        )}

                        {stake && <img
                            id={stake?.tokenId}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                width: '18px',
                                cursor: 'pointer',
                            }}
                            src={refresh}
                            onClick={(e) => refreshNft(e)}
                            title='Refresh Nft Metadata'
                        />}
                    </div>
                    {/* Description */}
                    <div className='flex flex-col items-start gap-y-2 mt-2'>
                        {/* Heading */}
                        <h1
                            className={`font-[600] text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF75]`}
                        >
                            {!stake ? (userInfo.psgNFT == 100 ? 'Blvck x PSG' : 'Blvck Box') : stake?.name}
                        </h1>
                        {stake && <p className='w-full z-10 text-base font-[100]'>
                            Rank: {stake?.rank}
                        </p>}
                    </div>
                </div>
            </div>
            {stake && <svg
                style={{ visibility: 'hidden', position: 'absolute' }}
                width='0'
                height='0'
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
            >
                <defs>
                    <filter id='goo'>
                        <feGaussianBlur
                            in='SourceGraphic'
                            stdDeviation='5'
                            result='blur'
                        />
                        <feColorMatrix
                            in='blur'
                            mode='matrix'
                            values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9'
                            result='goo'
                        />
                        <feComposite
                            in='SourceGraphic'
                            in2='goo'
                            operator='atop'
                        />
                    </filter>
                </defs>
            </svg>}
        </>
    )
}

export default StakeCard
