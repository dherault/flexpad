/* ------------------------------------------------------------------- */
/* Main class: converts a class string to corresponding CSS properties */
/* can output the result as a CSS string or an inline-style JS object  */
/* ------------------------------------------------------------------- */

type FlexpadInnerProps = {
  jc?: string
  ac?: string
  ai?: string
  d?: string
  w?: string
}

type FlexpadOutput = {
  display?: string
  flexDirection?: string
  flexWrap?: string
  justifyContent?: string
  alignContent?: string
  alignItems?: string
}

const isTop = (i: string | number) => i < 4
const isMiddle = (i: string | number) => i > 3 && i < 7
const isBottom = (i: string | number) => i > 6
const isLeft = (i: string | number) => i == 1 || i == 4 || i == 7
const isCenter = (i: string | number) => i == 2 || i == 5 || i == 8
const isRight = (i: string | number) => i == 3 || i == 6 || i == 9

function decode(code: string) {
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
  const z = code[_ + 2] === 'z'
  const f = code[_ + 2] === 'f'
  const l = code[_ + 2] === 'l'

  const isNorth = x ? isTop : isLeft
  const atEquator = x ? isMiddle : isCenter
  const isSouth = x ? isBottom : isRight
  const isWest = x ? isLeft : isTop
  const atGreenwitch = x ? isCenter : isMiddle
  const isEast = x ? isRight : isBottom

  const props: FlexpadInnerProps = {}

  if (isWest(i)) props.jc = 'flex-start'
  else if (isEast(i)) props.jc = 'flex-end'
  else props.jc = a ? 'space-around' : b ? 'space-between' : e ? 'space-evenly' : 'center'

  if (isNorth(i)) props.ac = props.ai = 'flex-start'
  else if (isSouth(i)) props.ac = props.ai = 'flex-end'
  else props.ac = props.ai = 'center'

  if (j) {
    props.d = `${x ? 'row' : 'column'}${isEast(j) ? '-reverse' : ''}`
    props.w = `wrap${isSouth(j) ? '-reverse' : ''}`

    if (isEast(j) && !atGreenwitch(i)) props.jc = props.jc === 'flex-end' ? 'flex-start' : 'flex-end'
    if (isSouth(j) && !atEquator(i)) props.ac = props.ai = props.ai === 'flex-end' ? 'flex-start' : 'flex-end'
  }
  else {
    props.d = x ? 'row' : 'column'
    props.w = 'nowrap'

    if (j === 0) {
      props.d += '-reverse'

      if (!atGreenwitch(i)) props.jc = props.jc === 'flex-end' ? 'flex-start' : 'flex-end'
    }
  }

  if (s) props.ai = 'stretch'
  if (z) props.ai = 'baseline'
  if (f) props.ai = 'first baseline'
  if (l) props.ai = 'last baseline'

  return props
}

const defaults = {
  d: 'row',
  w: 'nowrap',
  jc: 'flex-start',
  ai: 'stretch',
  ac: 'normal',
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

  code: string

  constructor(code: string) {
    Object.assign(this, { code }, defaults, decode(code))
  }

  toCss() {
    let css = ''

    propertyKeys
    .filter(p => defaults[p] !== this[p])
    .forEach(p => css += `  ${cssConversion[p]}: ${this[p]};\n`)

    return `.${this.code} {\n  display: flex;\n${css}}\n`
  }

  toJs() {
    const obj: FlexpadOutput = { display: 'flex' }

    propertyKeys
    .filter(p => defaults[p] !== this[p])
    .forEach(p => obj[jsConversion[p]] = this[p])

    return obj
  }
}

export default Flexpad
