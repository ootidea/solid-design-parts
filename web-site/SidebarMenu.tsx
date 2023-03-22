import { useLocation, useNavigate } from '@solidjs/router'
import { createMemo, VoidProps } from 'solid-js'
import classes from './SidebarMenu.module.scss'

export function SidebarMenu(props: VoidProps<{ componentName: string }>) {
  const isActive = createMemo(() => {
    const pathLastEntry = useLocation().pathname.match(/\w+/)?.[0]
    return pathLastEntry === props.componentName
  })

  const navigator = useNavigate()
  function onClick(event: MouseEvent) {
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return

    event.preventDefault()
    navigator(props.componentName, { resolve: true })
  }

  return (
    <a class={classes.root} href={props.componentName} aria-selected={isActive()} onClick={onClick}>
      {props.componentName}
    </a>
  )
}
