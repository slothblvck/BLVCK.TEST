import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import coins from '../../assets/svg/BlvckCoin.svg'
import { Link } from 'react-router-dom'
import SearchSvg from '../../assets/svg/SearchSvg'
import { SliderSvg } from '../../assets/svg/SliderSvg'
import CloseSvg from '../../assets/svg/CloseSvg'
import { WalletConnectContext } from '../../hooks/WalletLogin'
// import ExchangeTicketModal from '../shared/modals/ExchangeTicketModal'

const MobileNavigation = () => {
    const location = useLocation()
    const [search, setSearch] = useState(false)
    const { handleOpenMenu_items, userInfo, isWalletLogin } =
        useContext(WalletConnectContext)
    const current = location.pathname.split('/')[1]
    // const [exchangeModal, setExchangeModal] = useState(false)


    const searchME = () => {
        let userData = document
            .getElementById('search__NFT')
            .value.toUpperCase()
        let nftCardWrapper = document.getElementById('nft__Card_BoDY')
        let nftCard = nftCardWrapper.getElementsByClassName('nft__Card')

        // console.log(nftCard.length)
        for (let i = 0; i < nftCard.length; i++) {
            let ele = nftCard[i]
            let text = ele.getElementsByTagName('h1')
            let tdText = ''
            // console.log(text[0])
            for (let j = 0; j < text.length; j++) {
                tdText += text[j].innerText
            }
            let textValue = tdText
            if (textValue.toUpperCase().indexOf(userData) > -1) {
                ele.style.display = ''
            } else {
                ele.style.display = 'none'
            }
        }
    }

    const closeSearch = () => {
        let nftCardWrapper = document.getElementById('nft__Card_BoDY')
        let nftCard = nftCardWrapper.getElementsByClassName('nft__Card')

        // console.log(nftCard.length)
        for (let i = 0; i < nftCard.length; i++) {
            let ele = nftCard[i]
            ele.style.display = ''
        }
    }

    // if (current === 'market-place') {
    //     return (
    //         <div className='h-[60px] bg-mobileNavigationBg w-full hidden screen2:flex py-5 px-8 justify-between items-center border-b border-[#25262A] shadow-[8px_12px_50px_rgba(0,0,0,0.4)]'>
    //             {!search ? (
    //                 <>
    //                     <div
    //                         className={`w-min h-min cursor-pointer`}
    //                         onClick={handleOpenMenu_items}
    //                     >
    //                         <SliderSvg />
    //                     </div>
    //                     <Link to='/'>
    //                         <img src={logo} alt='blvck' width={80} />
    //                     </Link>
    //                     <div
    //                         className={`w-min h-min cursor-pointer`}
    //                         onClick={() => setSearch(true)}
    //                     >
    //                         <SearchSvg />
    //                     </div>
    //                 </>
    //             ) : (
    //                 <>
    //                     <input
    //                         type='text'
    //                         placeholder='Search'
    //                         className={`outline-none border-b w-full mr-2 bg-transparent input_sloow_animate`}
    //                         id='search__NFT'
    //                         onKeyUp={searchME}
    //                     />
    //                     <div
    //                         className={`cursor-pointer animate_close`}
    //                         onClick={() => {
    //                             setSearch(false)
    //                             try {
    //                                 closeSearch()
    //                             } catch (err) {
    //                                 console.log(err)
    //                             }
    //                         }}
    //                     >
    //                         <CloseSvg fill={`#FFF`} />
    //                     </div>
    //                 </>
    //             )}
    //         </div>
    //     )
    // } else {
    return (
        <div className='h-[60px] bg-mobileNavigationBg w-full hidden screen2:flex py-5 px-8 justify-between items-center border-b border-[#25262A] shadow-[8px_12px_50px_rgba(0,0,0,0.4)]'>
            <Link to='/'>
                <img src={logo} alt='blvck' width={80} />
            </Link>
            {isWalletLogin && (
                <>
                    <div className='flex items-center gap-x-2'>
                        {/* <div className={`flex items-center rounded-lg bg-secondaryColor gap-x-2 border border-[#3A3C40] h-[45px] cursor-pointer relative overflow-hidden ${
                                open ? 'bg-white' : ''
                            }`}
                            onClick={() => {setExchangeModal(true)}}
                        >
                            <img src={`https://res.cloudinary.com/kuramaverse/image/upload/g_xy_center,q_auto:best/v1675289267/KURAMA%20Static/KURAMA%20Logo.webp`} alt=""  className='w-[inherit] h-[inherit] object-cover'/>
                        </div> */}
                        <img src={coins} alt='logo' className='w-[32px]' />
                        <span className='text-xl'>{userInfo?.coinsBalance}</span>
                    </div>

                    {/* {exchangeModal&&<ExchangeTicketModal
                        openModal={exchangeModal}
                        setOpenModal={setExchangeModal}
                    />} */}
                </>
            )}
        </div>
    )
    // }
}

export default MobileNavigation
