import { IconButton } from '../library'
import gitHubIcon from './images/github.svg'
import classes from './PageTitle.module.scss'

export function PageTitle(props: { children: string }) {
  document.title = `${props.children} - solid-design-parts`

  function onClick() {
    window.open(`https://github.com/ootidea/solid-design-parts/blob/main/website/pages/${props.children}Catalog.tsx`)
  }

  return (
    <h1 class={classes.root}>
      {props.children}
      {/* TODO: use href instead of onClick. */}
      <IconButton src={gitHubIcon} size="1.2em" iconSize="70%" iconColor="hsl(0 0% 50%)" onClick={onClick} />
    </h1>
  )
}
