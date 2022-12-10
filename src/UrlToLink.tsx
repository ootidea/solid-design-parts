import css from './UrlToLink.scss'
import { chunk, until } from './utility/others'
import { joinClasses, prepareProps, SkelProps } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type UrlToLinkProps = SkelProps<{
  children?: string
}>

export function UrlToLink(rawProps: UrlToLinkProps) {
  const [props, restProps] = prepareProps(rawProps, { children: '' })

  const regexp = /([a-zA-Z]{2,20}):\/\/([\w_-]+(?:(?:\.[\w_-]+)?))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g

  const urls: string[] = []
  const indexes = [0]
  for (const regExpMatchArray of props.children.matchAll(regexp)) {
    if (regExpMatchArray.index !== undefined) {
      indexes.push(regExpMatchArray.index, regExpMatchArray.index + regExpMatchArray[0].length)
      urls.push(regExpMatchArray[0])
    }
  }
  indexes.push(props.children.length)

  const texts = chunk(indexes, 2).map(([start, end]) => props.children.substring(start, end))

  return (
    <div class={joinClasses(rawProps, 'skel-UrlToLink_root')} {...restProps}>
      {until(texts.length).map((i) => (
        <>
          {texts[i]}
          {i < urls.length && <a href={urls[i]}>{urls[i]}</a>}
        </>
      ))}
    </div>
  )
}
