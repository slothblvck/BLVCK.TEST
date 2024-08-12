module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                darkBlue: '#13092B',
                lightBlue: '#242730',
                darkerBlue: '#1E0C30',
                primaryText: '#FFFFFF',
                secondaryText: '#9CA0AC',
                primaryColor: '#080808',
                secondaryColor: '#0D0E12',
                stakeCardColor: '#020202',
                lightText: '#787A8D',
                borderLine: '#292A30',
                defaultBgColor: '#7A798A',
                svgColorSecondary: '#BCC3CF',
            },
            height: {
                recentBarHeight: 'calc(100vh - 5.5rem - 106px)',
                defaultScreen: 'calc(100vh - 50px)',
                activityScreen: 'calc(100vh - 7.25rem)',
                activityScreen_mobile: 'calc(100vh - 7.25rem - 50px)',
                createNftScreen: 'calc(100vh - 3.25rem - 3px)',
            },
            width: {
                graphwidth_1: 'calc(100vw - 6rem - 210px)',
                graphwidth_2: 'calc(100vw - 6rem - 210px)',
                graphwidth_3: 'calc(100vw - 6rem)',
                graphwidth_4: 'calc(100vw - 2rem)',
                events_comm_Wrapper: 'calc(100vw - 215px - 6rem)',
                scroll_events: 'calc(100% - 32px)',
                p_card_desktop: 'calc(100% - 220px)',
                p_card_mobile: 'calc(100% - 180px)',
            },
            backgroundImage: {
                bannerBg:
                    'linear-gradient(97.18deg, #33B3D8 -6.34%, rgba(55, 16, 93, 0.46) 71.11%)',
                card_bg_new:
                    'linear-gradient(56.47deg, #0F0F10 1.02%, #212227 98.5%)',
                topStakes:
                    'linear-gradient(134deg, #169DD9 100%, #046E9DB2 70%)',
                primaryBg:
                    'linear-gradient(62.79deg, #0C0B0B 1.05%, #0C0C0D 108.57%)',
                neonGreenGrad:
                    'radial-gradient(131.24% 1909.66% at -15.62% 71.67%, #A0FF91 0%, #93FFBE 21.72%, #A4FFC8 50%, #ADFF9F 83.85%, #BBFFB0 100%)',
                cardsBg:
                    'linear-gradient(56.47deg, #0F0F10 1.02%, #212227 98.5%)',
                new_sticky_bg:
                    'linear-gradient(90.08deg, #000000 1.09%, rgba(0, 0, 0, 0) 50.01%), linear-gradient(178.24deg, rgba(0, 0, 0, 0) 2.44%, #131417 99.47%)',
                auction_cardsBg:
                    'linear-gradient(56.47deg, #BBBBBB 1.02%, #FFFFFF 98.5%)',
                activityBg:
                    'linear-gradient(28.99deg, #0F0F10 0.84%, #212227 92.25%)',
                cardModal:
                    'linear-gradient(348.79deg, #0F0F10 0%, #212227 100.66%)',
                activeButtonBg:
                    'linear-gradient(326deg, #FFF -44.34%,#FFFFFF1A 42%, #FFF 198.66%)',
                dashboardBg: 'url(assets/background.png)',
                ecosystem_bg: 'url(assets/exosystem_bg.png)',
                bannerBlvckBg: 'linear-gradient(0deg, #00000033, #00000033)',
                mobileNavigationBg:
                    'linear-gradient(56.47deg, #0F0F10 1.02%, #212227 98.5%)',
            },
            screens: {
                screen1: { max: '1200px' },
                screen2: { max: '900px' },
                screen3: { max: '600px' },
                screen4: { max: '450px' },
                screen5: { max: '380px' },
            },
            keyframes: {
                moveTranslate: {
                    '0%': { transform: 'translateX(400px)' },
                    '100%': { transform: 'translateX(0px)' },
                },
            },
            animation: {
                moveTranslate: 'moveTranslate 1s ease-in-out',
            },
        },
    },
    variants: {
        backgroundColor: [
            'responsive',
            'hover',
            'focus',
            'group-hover',
            'group-focus',
        ],
        textColor: [
            'responsive',
            'hover',
            'focus',
            'group-hover',
            'group-focus',
        ],
    },
    plugins: [require('tailwindcss-scoped-groups')],
}
