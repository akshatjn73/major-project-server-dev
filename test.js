var moment = require('moment');

const d = new Date();
const yesterday = new Date(d)
const e = Date.now()
yesterday.setDate(yesterday.getDate() - 7)
console.log(e)
console.log(d)
console.log(yesterday.toISOString())

const date1 = moment().add(7, 'd').toDate()
console.log(date1)

if(yesterday > date1) {
    console.log('small')
}
