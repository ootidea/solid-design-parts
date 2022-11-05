import classes from './PageTitle.module.scss'

export function PageTitle(props: { children: string }) {
  document.title = `${props.children} - skel catalog`
  return <h1 class={classes.root}>{props.children}</h1>
}
