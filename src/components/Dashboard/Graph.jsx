import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { useContext, useEffect, useState } from 'react'
import ActivitySelect from './ActivitySelect'
import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { WalletConnectContext } from './../../hooks/WalletLogin'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Graph = () => {
    const [finalData, setFinalData] = useState([])
    const [finalLabels, setFinalLabels] = useState([])

    const { recentSale, recentSaleLoading } = useContext(WalletConnectContext)

    const parseData = () => {
        const filteredActivities = []

        let currentYear = new Date().getUTCFullYear()
        let currentMonth = new Date().getUTCMonth()
        let currentDate = new Date().getUTCDate()

        for (let i = 0; i < currentDate; i++) {
            filteredActivities.push(0)
        }

        recentSale.forEach((act) => {
            let actMonth = new Date(act.date).getUTCMonth()
            let actYear = new Date(act.date).getUTCFullYear()
            let actDate = new Date(act.date).getUTCDate()
            if (currentMonth === actMonth && currentYear === actYear) {
                // console.log(act.price)
                if (parseFloat(act.price) > 5) {
                    filteredActivities[actDate - 1] += parseFloat(1)
                } else {
                    filteredActivities[actDate - 1] += parseFloat(act.price)
                }
            }
        })

        let finalActivity = []
        filteredActivities.forEach((ele) => {
            // if (ele.price !== 0 && parseFloat(ele.price) < 5)
            //     finalActivity.push(ele)
            if (ele.price !== 0) finalActivity.push(ele)
        })

        // console.log(finalActivity)
        let labels = [],
            data = []

        for (let i = 0; i < finalActivity.length; i++) {
            labels.push(i + 1)
            data.push(finalActivity[i])
        }

        setFinalLabels(labels)
        // console.log(labels)
        // console.log(data)
        setFinalData(data)
        // setFinalData(finalActivity)
    }

    useEffect(() => {
        parseData()
    }, [recentSale])

    const labels = finalLabels
    // const labels2 = []
    let options = {
        maintainAspectRatio: true,
        tension: 0.5,
        responsive: true,
        fill: true,
        pointBorderWidth: 10,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 1,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 2,
                ticks: {
                    color: '#FFFFFF99',
                    display: true,
                    fontSize: 14,
                    beginAtZero: true,
                    stepSize: 1,
                    callback: function (value, index, ticks) {
                        return value + ' Eth'
                    },
                    text: 'HI',
                },
                grid: {
                    borderDash: [10, 10],
                    // borderDashOffset: 0.1,
                    lineWidth: 3,
                    offset: true,
                    display: true,
                    color: '#FFFFFF1A',
                    fontSize: '3px',
                },
                title: {
                    display: true,
                    text: 'Price Sold',
                    font: {
                        size: 16,
                    },
                },
            },
            x: {
                ticks: {
                    color: '#FFFFFF99',
                    beginAtZero: true,
                },
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 16,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    }

    let data = {
        labels,
        datasets: [
            {
                label: '  Total Sold',
                data: finalData,
                borderColor: '#A0FF91',
                fill: true,
                scaleStepWidth: 1,
                background:
                    'radial-gradient(131.24% 1909.66% at -15.62% 71.67%, #A0FF91 0%, #93FFBE 21.72%, #A4FFC8 50%, #ADFF9F 83.85%, #BBFFB0 100%)',
            },
        ],
    }

    // console.log(data)

    const [anchorEl, setAnchorEl] = useState(null)
    const [filterDrop, setFilterDrop] = useState('Last 7 Days')
    const open = Boolean(anchorEl)
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (event) => {
        setAnchorEl(null)
        // console.log(event.target)
        event.target.value
            ? setFilterDrop(event.target.value)
            : setFilterDrop('Last 7 Days')
    }

    const today = new Date()

    return (
        <div className='flex flex-col bg-secondaryColor border border-[#FFFFFF1A] rounded-2xl p-6 py-7 w-graphwidth_1 screen1:w-graphwidth_2 screen2:w-graphwidth_3 screen3:w-graphwidth_4 screen4:px-4 screen4:py-5'>
            <div className='flex mb-3 justify-between'>
                <h1 className='text-xl font-[500]'>Activity</h1>
                <h1
                    className='text-sm font-[600] cursor-pointer'
                    onClick={handleOpenMenu}
                >
                    THIS MONTH ({' '}
                    {today.toLocaleString('default', { month: 'long' })} )
                    {/* {filterDrop} */}
                    {/* <KeyboardArrowDownOutlined /> */}
                </h1>
            </div>
            {recentSaleLoading ? (
                'LOADING...'
            ) : (
                <div className='w-full h-full flex justify-between'>
                    <Line
                        options={options}
                        data={data}
                        className='bg-transparent'
                    />
                </div>
            )}
            {/* <ActivitySelect
                handleClose={handleClose}
                open={open}
                anchorEl={anchorEl}
                setSortType={setFilterDrop}
            /> */}
        </div>
    )
}

export default Graph
