import { Route, Router, Routes } from '@solidjs/router'
import { For, JSX } from 'solid-js'
import { Divider } from '../src/Divider'
import { Foldable } from '../src/Foldable'
import { Scrollable } from '../src/Scrollable'
import { StretchLayout } from '../src/StretchLayout'
import classes from './App.module.scss'
import { ComponentCatalog } from './page/ComponentCatalog'
import { SidebarMenu } from './SidebarMenu'

function getName(component: Function) {
  return component.name.replace(/Component$/, '')
}

type Component = Function & JSX.Element

type MenuItem = {
  title: string
  children: string[]
}

export function App() {
  const menuItems: MenuItem[] = [
    { title: 'Action buttons', children: ['Button', 'IconButton'] },
    {
      title: 'Selection',
      children: ['Checkbox', 'Checkboxes', 'RadioButtons', 'ToggleButtons', 'Select', 'MultiSelect'],
    },
    { title: 'Text input', children: ['TextInput', 'AutoSizeTextArea', 'NumberInput'] },
    {
      title: 'Date and time',
      children: ['DateInput', 'Calendar', 'DatePicker'],
    },
    { title: 'Other inputs', children: ['Slider'] },
    {
      title: 'Layout',
      children: ['Gravity', 'StretchLayout', 'LayerLayout', 'TitleBarLayout', 'Scrollable', 'Resizable', 'Foldable'],
    },
    { title: 'Floating', children: ['Modal', 'Popover', 'Toast'] },
    { title: 'Data collections', children: ['DataTable', 'Tabs'] },
    { title: 'Animations', children: ['FadeAnimation', 'ScaleYAnimation'] },
    {
      title: 'Others',
      children: ['Icon', 'Image', 'Divider', 'Spinner', 'Triangle', 'Stepper', 'SpeechBubble'],
    },
    { title: 'Utility', children: ['Await', 'UrlToLink'] },
  ]

  return (
    <Router>
      <StretchLayout style={{ height: '100%' }} stretchAt={2}>
        <nav class={classes.sidebar}>
          <Scrollable class={classes.sidebarContent}>
            <For each={menuItems}>
              {(menuItem) => (
                <Foldable title={menuItem.title} unfolded>
                  <For each={menuItem.children}>{(name) => <SidebarMenu componentName={name} />}</For>
                </Foldable>
              )}
            </For>
          </Scrollable>
        </nav>
        <Divider direction="vertical" />
        <main class={classes.main}>
          <Scrollable style="padding: 1rem 4rem 10rem;">
            <Routes>
              <Route path="components/*" element={ComponentCatalog} />
            </Routes>
          </Scrollable>
        </main>
      </StretchLayout>
    </Router>
  )
}