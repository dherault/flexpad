# Flexpad

Flexpad is a set of CSS classes to quickly make any flexbox layout using opinionated naming conventions.

## How it works

```
- Choose an axis for your container: x or y
- Think of a keypad:  7 8 9
                      4 5 6
                      1 2 3
- Pick the number corresponding to the alignment you want for your content
- Assign the class to your container:
```
```html
<div class="x5">
  <div>All centered</div>
</div>
<div class="y9">
  <div>Top right y aligned</div>
</div>
```

Have a look at [the demo](https://dherault.github.io/flexpad/) for all the 360 variations.

## Usage

#### HTML

Download the CSS file: [basic](https://raw.githubusercontent.com/dherault/flexpad/master/dist/flexpad.css) or [prefixed and minified](https://raw.githubusercontent.com/dherault/flexpad/master/dist/flexpad.min.css).

Use a CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flexpad@0.1.2/flexpad.min.css">
```

#### JavaScript

`npm i flexpad -S`

Inject CSS:
```js
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

## Contributing

Yes thank you.
