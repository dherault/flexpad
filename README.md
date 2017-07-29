# Flexpad

Flexpad is a set of CSS classes to quickly make any flexbox layout using opinionated naming conventions.

## How it works

- Choose an axis for you container: x or y.
- Think of a keypad:
```
7 8 9
4 5 6
1 2 3
  0
```
- Pick the number corresponding to the alignment you want for your content.
- Assign the class to your container:
```html
<div class="x5">
  <div>All centered</div>
</div>
<div class="y9">
  <div>Top right aligned column</div>
</div>
```

Have a look at [the demo](https://dherault.github.io/flexpad/) for all the 360 variations.

## Usage

Download the CSS file: [basic](https://raw.githubusercontent.com/dherault/flexpad/master/flexpad.css) or prefixed and minified.
```html
<link rel="stylesheet" href="/flexpad.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dherault/flexpad@0.0.0/flexpad.min.css">
```

Or use NPM package `npm i flexpad -S`

- inject CSS:
```js
import 'flexpad'
```

- Use with inline styles:
```js
import fp from 'flexpad'

const Menu = () => (
  <div style={fp('x5b')}>
    // ...
  </div>
)
```

## License

MIT
