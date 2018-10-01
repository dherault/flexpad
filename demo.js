const [bX, bY, bA, bB, bE, bS, b7, b9, b1, b3, b0, bLock, bGrow] = document.getElementsByTagName('button')
const [sliderN] = document.getElementsByTagName('input')
const divWrap = document.getElementById('wrap-origin')

const sections = []
for (let i = 1; i < 10; i++) sections.push(document.getElementById(i))

const traverseSections = fn => {
  for (let i = 1; i < 10; i++) fn(document.getElementById(i), i)
}

const activateButton = (el, bool) => el.classList[bool ? 'add' : 'remove']('button-active')
const activateButtonLock = (bool, x) => bLock.classList[bool ? 'add' : 'remove']('lock-' + (x ? 'x' : 'y'))

const state = {
  n: 3,
  x: true,
  origin: -1,
  xLocked: true,
  yLocked: true,
  lockIndex: 0,
  /*  y ȳ
    x 0 1
    x̄ 2 3
  */
}

function render() {
  // Ui as pure function of state
  const { x, abe, s, origin, xLocked, yLocked } = state

  // Assign selected classname to containers
  traverseSections((section, i) => {
    let className = `${x ? 'x' : 'y'}${i}${origin >= 0 ? origin : ''}`

    if (abe && (x ? i % 3 === 2 : i > 3 && i < 7)) {
      if (abe === 1) className += 'a'
      else if (abe === 2) className += 'b'
      else if (abe === 3) className += 'e'
    }
    if (s) className += 's'

    section.children[0].innerText = className
    section.children[1].className = `${className}${xLocked ? ' x-locked' : ''}${yLocked ? ' y-locked' : ''} container`
  })

  // Update menu
  activateButton(bX, x)
  activateButton(bY, !x)
  activateButton(bS, s)
  activateButton(bA, abe === 1)
  activateButton(bB, abe === 2)
  activateButton(bE, abe === 3)
  activateButton(b1, origin === 1)
  activateButton(b3, origin === 3)
  activateButton(b7, origin === 7)
  activateButton(b9, origin === 9)
  activateButton(b0, origin === 0)
  activateButtonLock(xLocked, true)
  activateButtonLock(yLocked, false)
  divWrap.style.borderTopColor = origin > 6 ? 'GoldenRod' : 'SlateGray'
  divWrap.style.borderLeftColor = origin % 3 === 1 ? 'GoldenRod' : 'SlateGray'
  divWrap.style.borderRightColor = origin === 3 || origin === 9 ? 'GoldenRod' : 'SlateGray'
  divWrap.style.borderBottomColor = origin === 1 || origin === 3 ? 'GoldenRod' : 'SlateGray'
  // The slider is not controled
}

// Events mutate state and render
const onclick = ((el, fn) => el.onclick = () => [fn(), render()])

onclick(bX, () => state.x = true)
onclick(bY, () => state.x = false)
onclick(bS, () => state.s = !state.s)
onclick(bA, () => state.abe = state.abe === 1 ? 0 : 1)
onclick(bB, () => state.abe = state.abe === 2 ? 0 : 2)
onclick(bE, () => state.abe = state.abe === 3 ? 0 : 3)
onclick(b7, () => state.origin = state.origin !== 7 ? 7 : -1)
onclick(b9, () => state.origin = state.origin !== 9 ? 9 : -1)
onclick(b1, () => state.origin = state.origin !== 1 ? 1 : -1)
onclick(b3, () => state.origin = state.origin !== 3 ? 3 : -1)
onclick(b0, () => state.origin = state.origin !== 0 ? 0 : -1)

onclick(bLock, () => {
  const i = (state.lockIndex + 1) % 4

  if (i === 0) state.xLocked = state.yLocked = true
  else if (i === 1) state.xLocked = state.yLocked = false
  else if (i === 2) (state.xLocked = true) && (state.yLocked = false)
  else (state.xLocked = false) || (state.yLocked = true)

  state.lockIndex = i
})

// Containers content has a separate render scope
function renderBoxes() {
  const { n, grow } = state

  activateButton(bGrow, grow)

  traverseSections(section => {
    const container = section.children[1]

    while (container.hasChildNodes()) container.removeChild(container.lastChild)

    for (let i = 0; i < n; i++) {
      const box = document.createElement('div')

      box.innerText = i + 1
      box.className = `x5 box${grow ? ' grow' : ''}`
      container.appendChild(box)
    }
  })
}

bGrow.onclick = () => [state.grow = !state.grow, renderBoxes()];

sliderN.oninput = e => {
  const n = e.target.value

  if (state.n === n) return

  state.n = n
  renderBoxes()
}

renderBoxes()
render()
