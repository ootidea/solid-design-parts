import classes from './PageTitle.module.scss'

export function PageTitle(props: { children: string }) {
  document.title = `${props.children} - solid-design-parts catalog`
  return <h1 class={classes.root}>{props.children}</h1>
}
