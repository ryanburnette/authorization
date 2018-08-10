function split(x) {
  if ( typeof x === 'string' ) {
    x = x.split(/\s*,\s*/g)
  }
  return x
}

module.exports = split
