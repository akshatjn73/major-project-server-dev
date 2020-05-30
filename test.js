var date = new Date();
var time = date.toString()
console.log(date.toString())
var startIndex = time.search('2020 ') + 5;
console.log(time.slice(startIndex, startIndex+5))