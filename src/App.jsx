import { useEffect, useContext, useState } from 'react'
import Navigation from './components/Navigation/Navigation'
import Dashboard from './pages/dashboard/Dashboard'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Activity from './pages/activity/Activity'
import Marketplace from './pages/marketplace/Marketplace'
import MobileNavigation from './components/Navigation/MobileNavigation'
import { WalletConnectContext } from './hooks/WalletLogin'
import Stakes from './pages/stakes/Stakes'
import ConnectWalletMobile from './components/Navigation/ConnectWalletMobile'
import DefaultLoader from './components/shared/loaders/DefaultLoader'
import DiscordConnectPage from './components/shared/DiscordConnectPage'
import Footer from './components/Footer/Footer'
import MobileNavigationButtons from './components/Navigation/MobileNavigationButtons.jsx'
import UserDetails from './pages/userDetails/UserDetails'
import NftDetails from './pages/nftDetails/NftDetails'
import StakeToGetGift from './components/Marketplace/StakeToGetGift'
import MyProfile from './pages/profie/MyProfile'
import Snapshot from './pages/Snapshot/Snapshot'
import DeliveryInformation from './pages/deliveryInformation/DeliveryInformation'
import WinnerDetails from './pages/winnerDetails/winnersDetails'
import TwitterConnectPage from './components/shared/TwitterConnectPage'
import Ecosystem from './pages/Ecosystem/Ecosystem'
import Events from './pages/Events/Events'
import Prediction from './pages/Prediction/Prediction.jsx'

const App = () => {
    const { isWalletLogin, userInfo } = useContext(WalletConnectContext)
    const [isLoading, setLoading] = useState(true)
    const [moveBar, setMoveBar] = useState(false)
    const bottomSwipe = sessionStorage.getItem('bottom-swipe-banner')

    function fakeRequest() {
        return new Promise((resolve) => setTimeout(() => resolve(), 2000))
    }

    const moveOut = () => {
        try {
            const ele = document.getElementById('stake__Card__to_gift')
            ele.style.transform = 'translateX(400px)'
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fakeRequest().then(() => {
            setLoading(!isLoading)
        })
    }, [])

    if (isLoading) {
        return (
            <div className='bg-primaryBg flex h-screen w-screen max-h-screen max-w-[100vw]'>
                <DefaultLoader />
            </div>
        )
    }

    return (
        <>
            <div className='bg-primaryBg flex h-defaultScreen w-screen max-h-defaultScreen screen2:h-screen screen2:max-h-screen max-w-[100vw] overflow-y-hidden'>
                <Router>
                    <div className='w-[215px] flex h-full screen2:hidden'>
                        {/* NAVIGATION MENU */}
                        <Navigation />
                    </div>
                    <div className='flex flex-1 h-full screen2:flex-col screen2:relative'>
                        {/* MOBILE MENU */}
                        <MobileNavigation />
                        <MobileNavigationButtons />
                        <ConnectWalletMobile />
                        <Routes>
                            {/* Dashboard */}
                            {/* <Route path='/' element={<Dashboard />} /> */}
                            {/* Marketplace */}
                            <Route
                                path='/'
                                element={<Marketplace />}
                            />
                            {/* Ecosystem */}
                            {/* <Route
                                path='/ecosystem'
                                element={
                                    <Ecosystem />
                                }
                            /> */}
                            {/* Staking */}
                            <Route
                                path='/staking'
                                element={
                                    isWalletLogin ? (
                                        <Stakes />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            {/* Predictions */}
                            <Route
                                path='/prediction'
                                element={
                                    <Prediction />
                                }
                            />
                            {/* Events */}
                            <Route
                                path='/events'
                                element={
                                    <Events />
                                }
                            />
                            {/* Discord API */}
                            <Route
                                path='/api/auth/discord/redirect'
                                element={
                                    userInfo?.isDiscordConnected &&
                                    userInfo?.discordInfo ? (
                                        <Navigate to='/' />
                                    ) : (
                                        <DiscordConnectPage />
                                    )
                                }
                            />
                            {/* Twitter API */}
                            <Route
                                path='/api/auth/twitter/redirect'
                                element={
                                    // userInfo?.isTwitterConnected ? (
                                    // <Navigate to='/' />
                                    // ) : (
                                    <TwitterConnectPage />
                                    // )
                                }
                            />
                            {/* Activity */}
                            <Route
                                path='/activity'
                                element={
                                    isWalletLogin && !userInfo?.isAdmin ? (
                                        <Activity />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            {/* User Details **ONLY ADMIN** */}
                            <Route
                                path='/userDetails/:userPageId'
                                element={
                                    isWalletLogin && userInfo?.isAdmin ? (
                                        <UserDetails />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            <Route
                                path='/Snapshot'
                                element={
                                    isWalletLogin && userInfo?.isAdmin ? (
                                        <Snapshot />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            <Route
                                path='/my-profile'
                                element={
                                    isWalletLogin ? (
                                        <MyProfile />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            <Route
                                path='/delivery-information'
                                element={
                                    isWalletLogin ? (
                                        <DeliveryInformation />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            <Route
                                path='/userDetails'
                                element={
                                    isWalletLogin && userInfo?.isAdmin ? (
                                        <Navigate to='/userDetails/0' />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            {/* NFT Details **ONLY ADMIN** */}
                            <Route
                                path='/nftDetails/:nftPageId'
                                element={
                                    isWalletLogin && userInfo?.isAdmin ? (
                                        <NftDetails />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            <Route
                                path='/nftDetails'
                                element={
                                    isWalletLogin && userInfo?.isAdmin ? (
                                        <Navigate to='/nftDetails/0' />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            {/* NFT Details **ONLY ADMIN** */}
                            <Route
                                path='/winnerDetails/:winnerPageId'
                                element={
                                    isWalletLogin && userInfo?.isAdmin ? (
                                        <WinnerDetails />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            <Route
                                path='/winnerDetails'
                                element={
                                    isWalletLogin && userInfo?.isAdmin ? (
                                        <Navigate to='/winnerDetails/0' />
                                    ) : (
                                        <Navigate to='/' />
                                    )
                                }
                            />
                            {/* 404 Error */}
                            <Route
                                path='/*'
                                element={
                                    <div className='code flex items-center justify-center h-screen w-full'>
                                        404, ERROR!
                                    </div>
                                }
                            />
                        </Routes>
                    </div>
                </Router>

                {/* {sessionStorage.getItem('bottom-swipe-banner') && ( */}
                {/* <div
                    className={`fixed bottom-20 right-10 animate-moveTranslate transition ease-in-out duration-[700ms] z-30`}
                    id='stake__Card__to_gift'
                >
                    <StakeToGetGift moveOut={moveOut} />
                </div> */}
                {/* )} */}
            </div>
            <Footer />
        </>
    )
}

export default App
