import React, { useEffect } from 'react'
import TitlePage from '../../components/shared/TitlePage'
import TopSideInfo from '../../components/Dashboard/TopSideInfo'
import ProjectCard from '../../components/Ecosystem/ProjectCard/ProjectCard'
import ParnterCard from '../../components/Ecosystem/PartnerCard/ParnterCard'
import { Add, Bolt } from '@mui/icons-material'
import { SwipeableDrawer } from '@mui/material'
import { useState } from 'react'
import CreatePartner from '../../components/shared/modals/CreatePartner'
import PartnerModal from '../../components/shared/modals/PartnerModal'
import { useContext } from 'react'
import { WalletConnectContext } from '../../hooks/WalletLogin'
import DefaultLoader from '../../components/shared/loaders/DefaultLoader'
import ecosystem_bg from '../../assets/exosystem_bg.png'
import ConnectModal from '../../components/shared/modals/ConnectModal'
import { Link } from 'react-router-dom'

const styles = {
    heading_row: `flex items-center justify-between`,
    heading_h1: `font-[Montserrat] font-[700] text-[28px] leading-[48px] text-[#FFF] screen3:text-[20px] screen4:leading-[24px]`,
    button: `flex items-center justify-center gap-1 border-white border-[1px] rounded-[6px] p-[8px] px-[15px] screen3:hidden hover:bg-white hover:text-black transition-all hover:transition-all`,
    button_text: `font-[400] text-[16px] leading-[24px] color-[#FFF]`,
    card_wrapper: `flex w-full flex-wrap gap-[25px] screen3:flex-nowrap screen3:items-center screen3:overflow-x-scroll screen3:overscroll-y-visible screen3:min-h-[160px] screen3:w-full`,
    card_wrapper_2: `flex w-full flex-wrap gap-[25px] screen3:flex-nowrap screen3:items-center screen3:overflow-x-scroll screen3:overscroll-y-visible screen3:min-h-[210px] screen3:w-full`
}

const Ecosystem = () => {
    const[open, setOpen] = useState(false)
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const {fetchPartners, partnerData, partnerLoading, userInfo, connectLoading, isWalletLogin, walletAddress} = useContext(WalletConnectContext)
    const [partner, setThisPartner] = useState(null)

    useEffect(() => {
        if(partnerData.length === 0 || partnerData?.communityProject?.length === 0 && partnerData?.official?.length === 0)
            fetchPartners()
    }, [])

    const editProject = (data) =>{
        if(!data) return

        setThisPartner(data)
        setOpen(true)
    }

    return (
        <div className='w-full h-full flex flex-col bg-right-top bg-no-repeat screen2:pb-16 overflow-scroll relative'>
            {/* Top */}
            {!partnerLoading && <div className='flex flex-col bg-ecosystem_bg' style={{backgroundSize: 'cover'}}>
                <div className='flex items-center justify-between w-full screen2:hidden sticky'>
                    <div className='pl-12'>
                        <TitlePage heading={'Ecosystem'} />
                    </div>
                    <div className='min-w-[330px] border-borderLine'>
                        <TopSideInfo />
                    </div>

                </div>
                <div className='flex flex-col gap-5 p-12 z-1'>
                    <h1 className='text-[#FFF] font-[500] text-[48px] leading-[59px]'>BLVCK Paris</h1>
                    <p className='text-[#CDCDCD] font-[300] opacity-70 text-[18px] leading-[24px]'>Blvck Paris is a lifestyle apparel & accessories brand, supported by millions <br/> of highly engaged social media followers and customers worldwide.</p>

                    <a target="_blank" href="https://blvck.com"><button style={{ paddingTop: '10px', paddingBottom: '7px' }} className='text-[#000000] bg-[#FFF] px-[12px] py-[8px] font-[500] w-[150px] rounded-[6px]'>Visit Website</button></a>
                </div>
            </div>}

            {partnerLoading ?
                <DefaultLoader />
            :
                <div style={{ marginBottom: '30px' }} className='recent_saless_scroll p-6 px-12 screen3:px-4 flex flex-col gap-y-8 flex-1 max-w-[100vw] screen2:pb-[80px] screen3:gap-y-4'>
                {/* <div className='sticky bg-new_sticky_bg min-h-[440px] top-0 left-0'></div> */}
                    {/* <div className='flex flex-col gap-5 py-12 z-1'>
                        <h1 className='text-[#FFF] font-[500] text-[48px] leading-[59px]'>BLVCK Shop</h1>
                        <p className='text-[#CDCDCD] font-[300] opacity-70 text-[18px] leading-[24px]'>Tommy Shelby, a dangerous man, leads the Peaky Blinders, a gang based in Birmingham. Soon, Chester Campbell, an inspector, decides to nab him and put an end to the criminal activities.</p>

                        <button className='text-[#000000] bg-[#FFF] px-[12px] py-[8px] font-[500] w-[150px] rounded-[6px]'>Visit Website</button>
                    </div> */}

                    {/* BLVCK Official Partners */}
                    <div className={styles.heading_row}>
                        <h1 className={styles.heading_h1}>BLVCK Official Partners</h1>

                        {userInfo?.isSuperAdmin &&  <button className={styles.button} onClick={() => setOpen(true)}>
                            <Add />
                            <span className={styles.button_text}>Create</span>
                        </button>}
                    </div>

                    {/* Cards */}
                    <div style={{ marginTop: '-10px' }} className={styles.card_wrapper_2}>
                        {partnerLoading ? 'Loading...' :
                            partnerData?.officialPartner?.map((item, id) => {
                                return <ParnterCard item={item} key={id} editProject={editProject} />
                            })
                        }
                    </div>

                    {/* Community Projects */}
                    <div className={styles.heading_row}>
                        <h1 style={{ marginTop: '15px' }} className={styles.heading_h1}>Community Projects</h1>

                        <button className={styles.button} onClick={() => {
                            if(!isWalletLogin){
                                setOpenConnectModal(true)
                            }else{
                                setOpen(true)
                            }
                        }}>
                            <Bolt />
                            <span className={styles.button_text}>Become Partner</span>
                        </button>
                    </div>

                    {/* Cards */}
                    <div style={{ marginTop: '-10px' }} className={styles.card_wrapper}>
                        {partnerLoading ? 'Loading...' :
                            partnerData?.verifiedCommunityProject?.map((item, id) => {
                                return <ProjectCard item={item} key={id} editProject={editProject} />
                            })
                        }
                    </div>

                    {partnerData?.unverifiedCommunityProject.filter((item) => {if(userInfo?.isSuperAdmin || item?.postedBy === walletAddress) return true})?.length > 0 &&
                    <>
                        <div className={styles.heading_row}>
                            <h1 style={{ marginTop: '15px' }} className={styles.heading_h1}>Unverified Projects</h1>
                        </div>

                        {/* Cards */}
                        <div style={{ marginTop: '-10px' }} className={styles.card_wrapper}>
                            {partnerLoading ? 'Loading...' :
                                partnerData?.unverifiedCommunityProject?.map((item, id) => {
                                    if(item?.postedBy === walletAddress || userInfo?.isSuperAdmin)
                                        return <ProjectCard item={item} key={id} editProject={editProject} />
                                })
                            }
                        </div>
                    </>}
                </div>
            }

            <ConnectModal
                openModal={openConnectModal}
                setOpenModal={setOpenConnectModal}
                connectLoading={connectLoading}
            />

            <SwipeableDrawer
                anchor={'right'}
                open={open}
                onClose={(e) => setOpen(false)}
                transitionDuration={750}
                onOpen={(e) => setOpen(true)}
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
                <CreatePartner
                    setOpen={setOpen}
                    partner={partner}
                    setThisPartner={setThisPartner}
                />
            </SwipeableDrawer>
        </div>
    )
}

export default Ecosystem
