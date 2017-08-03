/* ----------------------------------------------------- */
/* Main script: outputs the basic and minified css files */
/* ----------------------------------------------------- */

const fs = require('fs')
const path = require('path')
const csso = require('csso')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const Flexpad = require('./Flexpad')

let c = 0
let css = ''

for (let i = 1; i < 10; i++) {
  ['x', 'y'].forEach(d =>
    ['', 0, 1, 3, 7, 9].forEach(j =>
      ['', 'a', 'b'].forEach(ab =>
        ['', 's'].forEach(s => {
          // Limit non relevant a/b classes
          if (ab && !(d === 'x' ? i % 3 === 2 : i > 3 && i < 7)) return

          c++
          css += new Flexpad(d + i + j + ab + s).toCss()
        })
      )
    )
  )
}

postcss([autoprefixer]).process(css).then(result => {
    result.warnings().forEach(warn => console.warn(warn.toString()))

    const prefixedCss = result.css

    fs.writeFileSync(path.join(__dirname, '../dist/flexpad.css'), prefixedCss)

    const compressedCss = csso.minify(result.css).css

    fs.writeFileSync(path.join(__dirname, '../dist/flexpad.min.css'), compressedCss)

    console.log(`Done - ${c} classes`)
})
