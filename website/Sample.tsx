import { JSX, mergeProps, Show } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import { Link } from '../library'
import { extractContainedTexts } from '../library/utility/dom'
import { I18nPack, internationalizeForCurrentLanguages } from '../library/utility/i18n'
import classes from './Sample.module.scss'

export type SampleProps = ParentProps<{
  title: JSX.Element | I18nPack<JSX.Element>
  description?: JSX.Element | I18nPack<JSX.Element>
  direction?: 'horizontal' | 'vertical'
}>

export function Sample(rawProps: SampleProps) {
  const props = mergeProps({ direction: 'vertical' }, rawProps)

  const title = () => {
    if (typeof props.title === 'object' && props.title !== null && 'default' in props.title) {
      return internationalizeForCurrentLanguages(props.title)
    } else {
      return props.title
    }
  }
  const englishTitle = () => {
    if (typeof props.title === 'object' && props.title !== null && 'default' in props.title) {
      return props.title.default
    } else {
      return props.title
    }
  }
  const id = () => extractContainedTexts(englishTitle()).join(' ').replaceAll(' ', '-')

  const description = () => {
    if (typeof props.description === 'object' && props.description !== null && 'default' in props.description) {
      return internationalizeForCurrentLanguages(props.description)
    } else {
      return props.description
    }
  }

  return (
    <section>
      <h2 id={id()} class={classes.title}>
        <span>{title()}</span>
        <Link
          class={classes.fragment}
          href={`#${id()}`}
          onClick={(event) => {
            if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return

            /** Smooth scroll */
            event.preventDefault()
            history.pushState(undefined, '', `#${id()}`)
            event.currentTarget.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          #
        </Link>
      </h2>
      <Show when={description()}>
        <p class={classes.description}>{description()}</p>
      </Show>
      <div class={classes.frame}>
        <div class={classes.list} data-direction={props.direction}>
          {props.children}
        </div>
      </div>
    </section>
  )
}
