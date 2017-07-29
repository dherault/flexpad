const fs = require('fs')
const path = require('path')

const outputFile = path.join(__dirname, 'flexpad.css')

const end = 'flex-end'
const start = 'flex-start'
const center = 'center'

const isTop = i => i > 6
const isMiddle = i => i > 3 && i < 7
const isBottom = i => i < 4
const isLeft = i => i == 1 || i == 4 || i == 7
const isCenter = i => i == 2 || i == 5 || i == 8
const isRight = i => i == 3 || i == 6 || i == 9

function decode(code) {
  let _ = 0;

  const x = code[0] === 'x'
  const i = code[1];
  const j = parseInt(code[2])

  if (j || j === 0) _++;

  const a = code[_ + 2] === 'a'
  const b = code[_ + 2] === 'b'

  if (a || b) _++;

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
  else if (atGreenwitch(i)) props.jc = a ? 'space-around' : b ? 'space-between' :  center

  if (isNorth(i)) props.ac = props.ai = start
  else if (isSouth(i)) props.ac = props.ai = end
  else if (atEquator(i)) props.ac = props.ai = center

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

    propertyKeys.forEach(p => css += `${cssConversion[p]}: ${this[p]};\n`)

    return `.${this.code} {\ndisplay: flex;\n${css}}\n`
  }

  toJs() {
    const obj = {}

    propertyKeys.forEach(p => obj[jsConversion[p]] = this[p])

    return obj
  }
}

let css = ''

for (let i = 1; i < 10; i++) {
  ['x', 'y'].forEach(d =>
    [0, 1, 3, 7, 9, ''].forEach(j =>
      ['a', 'b', ''].forEach(ab =>
        ['s', ''].forEach(s =>
          css += new Flexpad(d + i + j + ab + s).toCss()
        )
      )
    )
  )
}

fs.writeFileSync(outputFile, css)
