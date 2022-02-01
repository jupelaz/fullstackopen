function sumIntervals(intervals) {
  const arrayFilled = intervals.map(
    ([start, end]) => Array(+((BigInt(end) - BigInt(start)).toString())).fill()
    .map((_,index) => index + start)
    )
  const arrayWithoutGaps = [...new Set(arrayFilled)].flat()
  return arrayWithoutGaps.length
}

console.log(sumIntervals( [
  [1,5],[1,5]
] )) // => 8
