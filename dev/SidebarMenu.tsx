import { useLocation, useNavigate } from '@solidjs/router'
import { createMemo, VoidProps } from 'solid-js'
import classes from './SidebarMenu.module.scss'

export function SidebarMenu(props: VoidProps<{ componentName: string }>) {
  const isActive = createMemo(() => {
    const pathLastEntry = useLocation().pathname.match(/\w+/)?.[0]
    return pathLastEntry === props.componentName
  })

  const navigator = useNavigate()
  function onClick() {
    navigator(props.componentName, { resolve: true })
  }

  return (
    <div class={classes.root} classList={{ [classes.active]: isActive() }} onClick={onClick}>
      {props.componentName}
    </div>
  )
}
