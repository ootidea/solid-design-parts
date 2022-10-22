import { ParentProps } from 'solid-js/types/render/component'
import classes from './PageTitle.module.scss'

export function PageTitle(props: ParentProps) {
  return <h1 class={classes.root}>{props.children}</h1>
}
