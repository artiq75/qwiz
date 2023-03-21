export default class TimeIndicator extends HTMLElement {
  static get observedAttributes() {
    return ['time']
  }

  constructor() {
    super()
    this.indicatorBar = document.createElement('div')
    this.indicatorBar.classList.add('indicator')
    this.indicatorBar.style.setProperty('animation-name', 'loading')
    this.indicatorBar.style.setProperty('animation-iteration-count', 'infinite')
    this.indicatorBar.style.setProperty('animation-duration', '1s')
    this.css = document.createElement('style')
    this.css.innerHTML = STYLE
  }

  connectedCallback() {
    this.append(this.indicatorBar, this.css)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'time' && oldValue <= 0) {
      this.indicatorBar.style.setProperty('animation-duration', `${newValue}s`)
      this.indicatorBar.style.setProperty('animation-name', 'decreased')
      this.indicatorBar.style.setProperty('animation-iteration-count', '1')
    }
  }
}

const STYLE = /*css*/ `
time-indicator {
  display: inline-block;
  width: 100%;
  height: 10px;
  background-color: var(--primary);
  border-radius: var(--rounded-full);
  position: relative;
  overflow: hidden;
}

time-indicator .indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--tertiary);
  border-radius: var(--rounded-full);
  animation-name: decreased;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@keyframes decreased {
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes loading {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
`
