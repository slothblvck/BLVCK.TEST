import React, { useContext, useState } from 'react'
import { SwipeableDrawer } from '@mui/material'
import PredictionEventModal from '../shared/modals/PredictionEventModal'
import CardTimer from '../Marketplace/CardTimer'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import { Delete } from '@mui/icons-material'

const PredictionEvent = ({event}) => {
  const {userInfo, deletePredictionEvent} = useContext(WalletConnectContext)
  const [open, setOpen] = useState(false)

  const styles = {
    // nftTimerWrapper: `w-full border mb-2 rounded z-10 text-sm font-[500] h-[53px] flex justify-center items-center backdrop-blur px-9 py-2`,
    nftTimerWrapper: `absolute bottom-0 left-0 w-full bg-[#000] z-10 text-sm font-[500] h-[53px] flex justify-center items-center backdrop-blur px-9 py-1`,
  }

  return (
    <>
    <div style={{ background: 'linear-gradient(56.47deg, #212227 1.02%, #212227 98.5%)', padding: '1rem', cursor: 'pointer' }} className='flex items-center h-[250px] w-[520px] screen2:w-full rounded-2xl overflow-hidden nft__Card relative' onClick={() => {
        setOpen(true)
        }}>
        {userInfo?.isAdmin && <div className='cursor-pointer absolute bg-black rounded-full w-[36px] h-[36px] flex items-center justify-center left-1 top-1 z-[1]'
            onClick={(e) => {
                e?.stopPropagation();
                deletePredictionEvent(event?._id)
            }}
        >
                <Delete fontSize='24px' />
            </div>}

        <figure className='relative h-full min-w-[220px] w-[220px] screen4:w-[180px] screen4:min-w-[180px]'>
            <img style={{ height: '170px', objectFit: 'cover', borderRadius: '1rem 1rem 0 0' }} src={event?.image} alt="" className='w-[inherit] h-[inherit]' />

            {event?.expireAt !== ' ' && <div style={{ borderRadius: '0 0 1rem 1rem'}} className={styles.nftTimerWrapper}>
                <CardTimer
                    coloured
                    targetData={event?.expireAt}
                />
            </div>}
        </figure>

        <div style={{ marginLeft: '15px' }} className='flex flex-col h-full w-p_card_desktop justify-between screen4:w-p_card_mobile'>
            <div className='flex flex-col gap-2'>
                <h1 style={{ fontSize: '20px' }} className='text-lg font-[600] break-all w-full text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF75] overflow-hidden'>
                    {event?.name?.length > 30 ? event?.name.slice(0, 30) + '...' : event?.name}
                </h1>
                <p style={{ fontSize: '16px' }} className='text-sm text-ellipsis '>{event?.description?.length > 100 ? (event?.description.slice(0, 100) + '...') : event?.description}</p>
                {/* <p className={`w-full text-base font-[100] h-7 opacity-100 group-hover:opacity-0 delay-150 duration-500 transition-opacity ease-in-out`}>
                    {event?.price || 1} BLVCK
                </p> */}
            </div>

            <div>
                {/* {event?.expireAt !== ' ' && (
                    <div className={styles.nftTimerWrapper}>
                        <CardTimer
                            targetData={event?.expireAt}
                        />
                    </div>
                )} */}
                <button style={{ fontSize: '16px' }} className={`w-full px-2 py-2 flex items-center justify-center rounded font-[600] text-sm bg-white hover:bg-gray-200 transition text-lightBlue`}>
                    {event?.participatedBy?.find((e) => e === userInfo?.walletAddress)
                        ? 'Already Participated'
                        : new Date(event?.expireAt).getTime() < Date.now()
                            ? `Event Expired`
                           : `${event?.price || 1} BLVCK`
                    }
                </button>
            </div>
        </div>
    </div>
    
    {open && <SwipeableDrawer
            anchor={'right'}
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            transitionDuration={750}
            onOpen={() => setOpen(true)}
            className='bg-[#0C0C0DB2] transition-opacity ease-in-out'
            PaperProps={{
                sx: {
                    backdropFilter: 'blur(8px)',
                    borderRadius: '0 !important',
                    color: 'white',
                    top: '0',
                },
            }}
        >
            <PredictionEventModal
                setOpenModal={setOpen}
                event={event}
            />
        </SwipeableDrawer>}
    </>
  )
}

export default PredictionEvent