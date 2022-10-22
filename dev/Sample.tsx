import { JSX, mergeProps, Show } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import classes from './Sample.module.scss'

type SampleProps = ParentProps<{
  id: string
  title: string
  description?: JSX.Element
  direction?: 'horizontal' | 'vertical'
}>

export function Sample(rawProps: SampleProps) {
  const props = mergeProps({ direction: 'vertical' }, rawProps)

  return (
    <section>
      <Show when={props.title}>
        <h2 id={props.id} class={classes.title}>
          {props.title}
          <a class={classes.fragment} href={`#${props.id}`}>
            #
          </a>
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
