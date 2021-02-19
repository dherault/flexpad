/* ------------------------------------------------------------------- */
/* Main class: converts a class string to corresponding CSS properties */
/* can output the result as a CSS string or an inline-style JS object  */
/* ------------------------------------------------------------------- */

const start = 'flex-start'
const center = 'center'
const end = 'flex-end'

const isTop = i => i < 4
const isMiddle = i => i > 3 && i < 7
const isBottom = i => i > 6
const isLeft = i => i == 1 || i == 4 || i == 7
const isCenter = i => i == 2 || i == 5 || i == 8
const isRight = i => i == 3 || i == 6 || i == 9

function decode(code) {
  if (!(typeof code === 'string' && code.length > 1)) return null

  let _ = 0

  const x = code[0] === 'x'
  const i = code[1]
  const j = parseInt(code[2])

  if (j || j === 0) _++

  const a = code[_ + 2] === 'a'
  const b = code[_ + 2] === 'b'
  const e = code[_ + 2] === 'e'

  if (a || b || e) _++

  const s = code[_ + 2] === 's'

  const isNorth = x ? isTop : isLeft
  const atEquator = x ? isMiddle : isCenter
  const isSouth = x ? isBottom : isRight
  const isWest = x ? isLeft : isTop
  const atGreenwitch = x ? isCenter : isMiddle
  const isEast = x ? isRight : isBottom

  const props = {}

  if (isWest(i)) props.jc = start
  else if (isEast(i)) props.jc = end
  else props.jc = a ? 'space-around' : b ? 'space-between' : e ? 'space-evenly' : center

  if (isNorth(i)) props.ac = props.ai = start
  else if (isSouth(i)) props.ac = props.ai = end
  else props.ac = props.ai = center

  if (j) {
    props.d = `${x ? 'row' : 'column'}${isEast(j) ? '-reverse' : ''}`
    props.w = `wrap${isSouth(j) ? '-reverse' : ''}`

    if (isEast(j) && !atGreenwitch(i)) props.jc = props.jc === end ? start : end
    if (isSouth(j) && !atEquator(i)) props.ac = props.ai = props.ai === end ? start : end
  }
  else {
    props.d = x ? 'row' : 'column'
    props.w = 'nowrap'

    if (j === 0) {
      props.d += '-reverse'

      if (!atGreenwitch(i)) props.jc = props.jc === end ? start : end
    }
  }

  if (s) props.ai = 'stretch'

  return props
}

const cssConversion = {
  d: 'flex-direction',
  w: 'flex-wrap',
  jc: 'justify-content',
  ai: 'align-items',
  ac: 'align-content',
}

const jsConversion = {
  d: 'flexDirection',
  w: 'flexWrap',
  jc: 'justifyContent',
  ai: 'alignItems',
  ac: 'alignContent',
}

const propertyKeys = Object.keys(cssConversion)

class Flexpad {

  constructor(code) {
    Object.assign(this, {
      code,
      d: 'row',
      w: 'nowrap',
      jc: start,
      ai: start,
      ac: center,
    }, decode(code))
  }

  toCss() {
    let css = ''

    propertyKeys.forEach(p => css += `  ${cssConversion[p]}: ${this[p]};\n`)

    return `.${this.code} {\n  display: flex;\n${css}}\n`
  }

  toJs() {
    const obj = { display: 'flex' }

    propertyKeys.forEach(p => obj[jsConversion[p]] = this[p])

    return obj
  }
}

module.exports = Flexpad
