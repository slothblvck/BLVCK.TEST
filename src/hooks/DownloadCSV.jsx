// import { parseOriginalDate } from './data'

const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })

    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

export const exportToWinnersCsv = (e, name, data__from__web, ques) => {
    e.preventDefault()

    // Headers for each column
    let head = ''
    let arr = []

    let data_to_download = []
    // console.log(data__from__web)
    data__from__web.forEach((data) => {
        if (data.cnt) {
            for (let i = 0; i < data.cnt; i++) {
                data_to_download.push(data)
            }
        }
    })

    for (const key in data_to_download[0]) {
        if (key === 'answers') {
            for (let i = 0; i < ques.length; i++) {
                head += ques[i].toUpperCase() + ','
            }
            arr.push(key)
        } else {
            if (key === 'userInfo') {
                continue
            }
            if (key === 'cnt') {
                continue
            }
            head += key.toUpperCase() + ','
            arr.push(key)
        }
    }
    let headers = [head]

    let usersCsv = data_to_download.reduce((acc, user) => {
        let row = ''
        for (let i in arr) {
            let search = false
            for (let key in user) {
                if (key === arr[i]) {
                    search = true
                    break
                }
            }
            if (search) {
                let text = user[arr[i]]
                if (arr[i] === 'roles') {
                    let r = ''
                    // console.log(user[arr[i]])
                    if (user[arr[i]]) {
                        user[arr[i]].forEach((f) => {
                            r += f.name + ' '
                        })
                        text = r
                    } else {
                        text = 'Default'
                    }
                }
                if (arr[i] === 'timestamp') {
                    text = new Date(user[arr[i]]).toDateString()
                }
                let word__data = ''
                if (typeof text === 'string') {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === ',' || text[i] === '\n') continue
                        word__data += text[i]
                    }
                    row += word__data + ','
                } else {
                    row += text + ','
                }
                // console.log(word__data)
            } else {
                // console.log(user['_id'])
                row += ','
            }
        }
        acc.push(row)
        return acc
    }, [])

    downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: `${name.split(' ')[0]}.csv`,
        fileType: 'text/csv',
    })
}

const exportToCsv = (e, name, data__from__web) => {
    e.preventDefault()

    // Headers for each column
    let head = ''
    let arr = []

    for (const key in data__from__web[0]) {
        if (key !== 'userInfo') {
            head += key.toUpperCase() + ','
            arr.push(key)
        }
    }
    let headers = [head]

    let usersCsv = data__from__web.reduce((acc, user) => {
        let row = ''
        for (let i in arr) {
            let search = false
            for (let key in user) {
                if (key === arr[i]) {
                    search = true
                    break
                }
            }
            if (search) {
                let text = user[arr[i]]
                if (arr[i] === 'roles') {
                    let r = ''
                    // console.log(user[arr[i]])
                    if (user[arr[i]]) {
                        user[arr[i]].forEach((f) => {
                            r += f.name + ' '
                        })
                        text = r
                    } else {
                        text = 'Default'
                    }
                }
                if (arr[i] === 'timestamp') {
                    text = new Date(user[arr[i]]).toDateString()
                }
                let word__data = ''
                if (typeof text === 'string') {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === ',' || text[i] === '\n') continue
                        word__data += text[i]
                    }
                    row += word__data + ','
                } else {
                    row += text + ','
                }
                // console.log(word__data)
            } else {
                // console.log(user['_id'])
                row += ','
            }
        }
        acc.push(row)
        return acc
    }, [])

    downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: `${name.split(' ')[0]}.csv`,
        fileType: 'text/csv',
    })
}

export default exportToCsv
