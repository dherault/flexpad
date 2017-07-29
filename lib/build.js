const fs = require('fs')
const path = require('path')
const Flexpad = require('./Flexpad')

const outputFile = path.join(__dirname, '../flexpad.css')

let c = 0
let css = ''

for (let i = 1; i < 10; i++) {
  ['x', 'y'].forEach(d =>
    [0, 1, 3, 7, 9, ''].forEach(j =>
      ['a', 'b', ''].forEach(ab =>
        ['s', ''].forEach(s => {
          // Limit non relevant a/b classes
          if (ab && !(d === 'x' ? i % 3 === 2 : i > 3 && i < 7)) return;

          c++
          css += new Flexpad(d + i + j + ab + s).toCss()
        })
      )
    )
  )
}

fs.writeFileSync(outputFile, css)

console.log(`Done - ${c} classes`)
