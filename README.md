# Flexpad

Flexpad is a set of CSS classes to quickly make any flexbox layout using opinionated naming conventions.

## How it works

```
- Choose an axis for your container: x or y
- Think of a keypad:  1 2 4
                      4 5 6
                      7 8 9
- Pick the number corresponding to the alignment you want for your content
- Assign the class to your container:
```
```html
<div class="x5">
  <div>All centered</div>
</div>
<div class="y1">
  <div>Top left y aligned</div>
</div>
```

Have a look at [the demo](https://dherault.github.io/flexpad/) for all the 348 variations.

## Usage

#### JavaScript

`npm install flexpad --save`

Inject CSS:
```js
import 'flexpad/dist/flexpad.css'
// or, prefixed and minified
import 'flexpad/dist/flexpad.min.css'
```

Use with inline styles:
```js
import fp from 'flexpad'

const Menu = () => (
  <div style={fp('x5b')}>
    // ...
  </div>
)
```

#### HTML

Download the CSS file: [basic](https://raw.githubusercontent.com/dherault/flexpad/master/dist/flexpad.css) or [prefixed and minified](https://raw.githubusercontent.com/dherault/flexpad/master/dist/flexpad.min.css).

Use a CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flexpad@3.1.0/dist/flexpad.min.css">
```

## Contributing

Yes, thank you.
