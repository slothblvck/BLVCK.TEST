import { ArrowForward } from '@mui/icons-material'
import React, { useState } from 'react'
import twitter from '../../../assets/twitter.png'
import discord from '../../../assets/discord.png'
import PartnerModal from '../../shared/modals/PartnerModal'

const styles = {
    cardWrapper: `group bg-[#0D0E12] rounded-2xl w-[330px] h-[150px] ease-in-out transition-transform relative screen4:w-full flex-col overflow-hidden border border-[#292A30] cursor-pointer flex flex-start p-[16px] gap-[14px] screen3:min-w-[330px] screen3:min-h-[98px]  screen4:min-w-full screen4:w-full`,
    cardContainer: `w-full h-auto p-4 flex items-center justify-between`,
    hoverSubscribe: `particiapte__for absolute z-10 bottom-0 rounded-b-xl w-full left-0 h-[50px] bg-white text-black items-center justify-between px-3 flex cursor-pointer gap-x-2
    translate-y-[55px] group-hover:translate-y-0 group-hover:transition-all group-hover:ease group-hover:duration-200 duration-200 ease`
}

const ProjectCard = ({item, editProject}) => {
    const[openModal, setOpenModal] = useState(false)

    return <div className={styles.cardWrapper} onClick={(e) => {
        if(e.target.id !== 'not_open_modal')
            setOpenModal(true)
        }
    }>
            <div className='w-[36px] min-w-[36px] h-[36px] min-h-[36px] bg-[#F8DBCB] rounded-[14px] flex items-center justify-center overflow-hidden'>
                <img src={item?.image} alt="image" className='w-[inherit] h-[inherit] object-cover' />
            </div>

            <div className='flex invisible items-center group-hover:visible absolute gap-1 right-3'>
            {item?.twitter && <button id='not_open_modal' className='bg-black h-[32px] min-h-[32px] min-w-[32px] w-[32px] flex items-center justify-center rounded-full' onClick={() => window.open(item?.twitter, '_blank')}>
                    <img id='not_open_modal' src={twitter} alt="" className='w-[16px]'/>
                </button>}
                {item?.discord && <button id='not_open_modal' className='bg-black h-[32px] min-h-[32px] min-w-[32px] w-[32px] flex items-center justify-center rounded-full' onClick={() => window.open(item?.discord, '_blank')}>
                    <img id='not_open_modal' src={discord} alt="" className='w-[16px]'/>
                </button>}
            </div>

            <div className='flex flex-col gap-1'>
                <h1 className='font-[Montserrat] font-[700] text-[20px] leading-[24px] text-[#FFF]'>{item?.name}</h1>
                <h2 className='font-[Montserrat] font-[400] text-[14px] leading-[20px] text-[#9CA0AC] text-ellipsis overflow-hidden h-[40px]'>
                    {item?.description?.length > 70 ? `${item?.description.substring(0, 70)}...` : item?.description}
                </h2>
            </div>

            <div className={styles.hoverSubscribe}>
                <h1 style={{color: '#191A1D', fontSize: '16px', lineHeight: '20px', fontWeight: '600'}}>Know more</h1>

                <ArrowForward />
            </div>

        {openModal && <PartnerModal openModal={openModal} setOpenModal={setOpenModal} item={item} editProject={editProject} />}
    </div>
}

export default ProjectCard
