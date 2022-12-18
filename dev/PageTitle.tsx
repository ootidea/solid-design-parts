import classes from './PageTitle.module.scss'

export function PageTitle(props: { children: string }) {
  document.title = `${props.children} - mantle-ui catalog`
  return <h1 class={classes.root}>{props.children}</h1>
}
