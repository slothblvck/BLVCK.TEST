const activities = require('./activity')

let date = new Date()
let getPrevMonthDate = new Date(date)
getPrevMonthDate.setMonth(getPrevMonthDate.getMonth() - 1)

// let start = getPrevMonthDate.getTime()
// let end = date.getTime()
// console.log(date, getPrevMonthDate)

const thisMonth = new Date().getUTCMonth()
// console.log(activities.length)

const filteredActivities = []
// let arr1[][] = }

// arr1 = arr2 = arr3 = arr4 = arr5 = []

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

let currentYear = new Date().getUTCFullYear()
let currentMonth = new Date().getUTCMonth()
let currentDate = new Date().getUTCDate()

let monthLen = getDaysInMonth(currentYear, currentMonth + 1)

for (let i = 0; i < currentDate; i++) {
    filteredActivities.push(0)
}

activities.forEach((act) => {
    let actMonth = new Date(act.date).getUTCMonth()
    let actYear = new Date(act.date).getUTCFullYear()
    let actDate = new Date(act.date).getUTCDate()
    if (currentMonth === actMonth && currentYear === actYear) {
        // console.log(act.price)
        filteredActivities[actDate - 1] += parseFloat(act.price)
    }
})
