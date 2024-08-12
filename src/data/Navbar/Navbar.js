import { ActivitySvg } from '../../assets/svg/ActivitySvg'
import { DashboardSvg } from '../../assets/svg/DashboardSvg'
import EcosystemSvg from '../../assets/svg/EcosystemSvg'
import EventsSvg from '../../assets/svg/EventsSvg'
import PersonSvg from '../../assets/svg/PersonSvg'
import { StakingSvg } from '../../assets/svg/StakingSvg'
import { MarketSvg } from './../../assets/svg/MarketSvg'
import { Snapshot } from './../../assets/svg/Snapshot'
import { Avatar } from './../../assets/svg/Avatar'

export const NavLinks = [
    // {
    //     id: 1,
    //     name: 'Dashboard',
    //     icon: DashboardSvg,
    //     link: '/',
    // },
    {
        id: 2,
        name: 'Blvck Market',
        icon: MarketSvg,
        link: '/',
    },
    {
        id: 3,
        name: 'Staking',
        icon: StakingSvg,
        link: '/staking',
    },
    // {
    //     id: 10,
    //     name: 'Events',
    //     icon: EventsSvg,
    //     link: '/events',
    // },
    {
        id: 11,
        name: 'Prediction',
        icon: EventsSvg,
        link: '/prediction',
    },
    // {
    //     id: 9,
    //     name: 'Eco System',
    //     icon: EcosystemSvg,
    //     link: '/ecosystem',
    // },
    {
        id: 4,
        name: 'My Activity',
        icon: ActivitySvg,
        link: '/activity',
    },
    {
        id: 5,
        name: 'User Details',
        icon: PersonSvg,
        link: '/userDetails',
    },
    {
        id: 6,
        name: 'NFT Details',
        icon: PersonSvg,
        link: '/nftDetails',
    },
    {
        id: 7,
        name: 'Winners',
        icon: PersonSvg,
        link: '/winnerDetails',
    },
    {
        id: 8,
        name: 'Snapshot',
        icon: Snapshot,
        link: '/Snapshot',
    },
    {
        id: 9,
        name: 'Profile',
        icon: Avatar,
        link: '/my-profile',
    }
]
