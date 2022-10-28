import css from '../common.scss'

export function registerCss(css: string) {
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
}

registerCss(css)
