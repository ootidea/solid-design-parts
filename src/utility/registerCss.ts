import css from '../common.scss'

export function registerCss(css: string) {
  // For some reason, just importing a css file doesn't bundle the code to inject it into html.
  // The built-in injection code is bundled by touching the css text as shown below.
  // import css from './Button.scss'
  // registerCss(css: string)
  css.length
}

registerCss(css)
