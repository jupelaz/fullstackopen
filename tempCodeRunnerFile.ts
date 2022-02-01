const sumIntervals = (intervals :[number, number][])  =>
  [...new Set(intervals.map(
    ([start, end]) => Array(+((BigInt(end) - BigInt(start)).toString())).fill(1)
    .map((_,index) => index + start)
    ).flat())].length
  

console.log(sumIntervals( [
  [1,5],[1,5]
] )) // => 8
