import css from './StretchLayout.scss'
import { toArray } from './utility/others'
import { joinClasses, joinStyle, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type StretchLayoutProps = Props<{
  stretchAt?: number | `${number}`
  direction?: 'horizontal' | 'vertical'
}>

export function StretchLayout(rawProps: StretchLayoutProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      stretchAt: 0,
      direction: 'horizontal',
    },
    ['style']
  )

  function normalizeIndex(index: number) {
    if (index >= 0) {
      return index
    }

    return toArray(rawProps.children).length + index
  }

  return (
    <div
      class={joinClasses(rawProps, 'skel-StretchLayout_root')}
      style={joinStyle(rawProps.style, {
        '--skel-StretchLayout_template': 'auto '.repeat(normalizeIndex(Number(props.stretchAt))) + 'minmax(0, 1fr)',
      })}
      data-direction={props.direction}
      {...restProps}
    >
      {rawProps.children}
    </div>
  )
}
