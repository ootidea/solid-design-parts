import { useLocation, useNavigate } from '@solidjs/router'
import { createMemo, VoidProps } from 'solid-js'
import classes from './SidebarMenu.module.scss'

export function SidebarMenu(props: VoidProps<{ componentName: string }>) {
  const isActive = createMemo(() => {
    const urlComponentName = useLocation().pathname.match(/\/components\/(\w+)/)?.[1]
    return urlComponentName === props.componentName
  })

  const navigator = useNavigate()
  function onClick(event: MouseEvent) {
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return

    event.preventDefault()
    navigator(`components/${props.componentName}`, { resolve: true })
  }

  return (
    <div>
      <a class={classes.link} href={props.componentName} aria-selected={isActive()} onClick={onClick}>
        {props.componentName}
      </a>
      {/*
      dummy element to prevent width changes caused by bold text.
      classes.link has padding, so even if you set height: 0 for that element, the height will not become 0.
      Therefore, enclose it with a div element and set height: 0.
      https://stackoverflow.com/questions/20827367/why-doesn-t-height-0-hide-my-padded-div-even-with-box-sizing-border-box
      */}
      <div class={classes.hiddenSelected}>
        <a class={classes.link} aria-hidden="true" aria-selected="true">
          {props.componentName}
        </a>
      </div>
    </div>
  )
}
