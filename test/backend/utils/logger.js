const info = (...params) =>
  process.env.NODE_ENV !== 'test' && console.log(...params)

const error = (...params) => console.error(...params)

module.exports = { info, error }
