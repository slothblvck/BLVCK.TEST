import { ArrowForward } from '@mui/icons-material'
import React from 'react'
import PartnerModal from '../../shared/modals/PartnerModal'
import twitter from '../../../assets/twitter.png'
import discord from '../../../assets/discord.png'
import { useState } from 'react'

const styles = {
    cardWrapper: `group bg-[#0D0E12] rounded-2xl w-[240px] min-h-[200px] ease-in-out transition-all relative screen4:w-full overflow-hidden border border-[#292A30] cursor-pointer screen3:min-w-[240px] screen4:min-w-full screen4:w-full hover:border-[1px] hover:border-[#929292]`,
    cardContainer: `w-full h-auto p-4 flex items-center justify-between`,
    imageWrapper: `relative flex w-full h-[130px] max-h-[130px] cursor-pointer screen4:w-full overflow-hidden bg-[#ccc]`,
}

const ParnterCard = ({item, editProject}) => {
    const[openModal, setOpenModal] = useState(false)

    return <div className={styles.cardWrapper} onClick={(e) => {
        if(e.target.id !== 'not_open_modal')
            setOpenModal(true)
        }
    }>
        <div className={styles.imageWrapper}>
            <img src={item?.image} alt="" className='w-[inherit] h-[inherit] object-cover'/>

            <div className='flex invisible items-center group-hover:visible absolute gap-1 right-3 top-3'>
                {item?.twitter && <button id='not_open_modal' className='bg-black h-[32px] min-h-[32px] min-w-[32px] w-[32px] flex items-center justify-center rounded-full' onClick={() => window.open(item?.twitter, '_blank')}>
                    <img id='not_open_modal' src={twitter} alt="" className='w-[16px]'/>
                </button>}
                {item?.discord && <button id='not_open_modal' className='bg-black h-[32px] min-h-[32px] min-w-[32px] w-[32px] flex items-center justify-center rounded-full' onClick={() => window.open(item?.discord, '_blank')}>
                    <img id='not_open_modal' src={discord} alt="" className='w-[16px]'/>
                </button>}
            </div>
        </div>


        <div className={styles.cardContainer}>
            <div className='flex flex-col'>
                <h1 className='font-[Montserrat] font-[700] text-[20px] leading-[24px] text-[#FFF]'>{item?.name}</h1>
                {item?.tags?.length > 0 && <h2 style={{ marginTop: '5px' }} className='font-[Montserrat] font-[400] text-[14px] leading-[21px] text-[#9CA0AC]'>{item?.tags[0]}</h2>}
            </div>

            <div className='w-[36px] min-w-[36px] h-[36px] min-h-[36px] bg-[#191B1F] rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:transition-all'>
                <ArrowForward />
            </div>
        </div>

        {openModal && <PartnerModal openModal={openModal} setOpenModal={setOpenModal} item={item} editProject={editProject} />}
    </div>
}

export default ParnterCard
