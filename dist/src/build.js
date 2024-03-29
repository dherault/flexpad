/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
/* ----------------------------------------------------- */
/* Main script: outputs the basic and minified css files */
/* ----------------------------------------------------- */
import fs from 'fs';
import path from 'path';
import csso from 'csso';
import Flexpad from './Flexpad';
let c = 0;
let css = `.flex-grow {
  flex-grow: 1;
}
.flex-block,
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-shrink,
.flex-shrink-1 {
  flex-shrink: 1;
}
.flex-basis-0 {
  flex-basis: 0;
}
.flex-basis-100 {
  flex-basis: 100%;
}
`;
for (let i = 1; i < 10; i++) {
    ['x', 'y'].forEach(d => ['', 0, 1, 3, 7, 9].forEach(j => ['', 'a', 'b', 'e'].forEach(abe => ['', 's', 'z', 'f', 'l'].forEach(s => {
        // Limit non relevant a/b/e/s/z/f/l classes
        if (abe && !(d === 'x' ? i % 3 === 2 : i > 3 && i < 7))
            return;
        if (s === 's' && (d === 'x' ? i < 4 || i > 6 : i % 3 !== 2))
            return;
        if ((s === 'z' || s === 'f') && i > 3)
            return;
        if (s === 'l' && i < 7)
            return;
        if (d === 'y' && (s === 'z' || s === 'f' || s === 'l'))
            return;
        // @ts-expect-error
        if (j > 0 && s === 's')
            return;
        c++;
        css += new Flexpad(d + i + j + abe + s).toCss();
    }))));
}
fs.writeFileSync(path.join(__dirname, '../dist/flexpad.css'), css);
({ css } = csso.minify(css));
fs.writeFileSync(path.join(__dirname, '../dist/flexpad.min.css'), css);
console.log(c, 'combinaisons');
//# sourceMappingURL=build.js.map