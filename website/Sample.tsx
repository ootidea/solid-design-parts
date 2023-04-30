import { JSX, mergeProps, Show } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import { Link } from '../library'
import { extractContainedTexts } from '../library/utility/dom'
import classes from './Sample.module.scss'

export type SampleProps = ParentProps<{
  title: JSX.Element
  description?: JSX.Element
  direction?: 'horizontal' | 'vertical'
}>

export function Sample(rawProps: SampleProps) {
  const props = mergeProps({ direction: 'vertical' }, rawProps)
  const id = () => extractContainedTexts(props.title).join(' ').replaceAll(' ', '-')

  return (
    <section>
      <Show when={props.title}>
        <h2 id={id()} class={classes.title}>
          <span>{props.title}</span>
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
      </Show>
      <Show when={props.description}>
        <p class={classes.description}>{props.description}</p>
      </Show>
      <div class={classes.frame}>
        <div class={classes.list} data-direction={props.direction}>
          {props.children}
        </div>
      </div>
    </section>
  )
}
