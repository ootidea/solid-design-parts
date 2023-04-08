import { Route, Router, Routes } from '@solidjs/router'
import { For } from 'solid-js'
import { Gravity, Select } from '../src'
import { Divider } from '../src/Divider'
import { Foldable } from '../src/Foldable'
import { Scrollable } from '../src/Scrollable'
import { StretchLayout } from '../src/StretchLayout'
import { i18n } from '../src/utility/i18n'
import classes from './App.module.scss'
import { ComponentCatalogPage } from './page/ComponentCatalogPage'
import { SidebarMenu } from './SidebarMenu'

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
      children: ['DateInput', 'DatePicker', 'Calendar'],
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
      children: ['Icon', 'Image', 'Divider', 'Spinner', 'Triangle', 'Stepper', 'SpeechBubble', 'Link'],
    },
    { title: 'Utility', children: ['Await', 'UrlToLink'] },
  ]

  return (
    <Router>
      <StretchLayout direction="vertical" stretchAt={2} style={{ height: '100%' }}>
        <header class={classes.header}>
          <Gravity.right>
            <Select
              placeholder="language"
              values={['en', 'ja']}
              showClearButton
              onChangeSelected={(selected) => i18n.forceLanguage(selected)}
            />
          </Gravity.right>
        </header>
        <Divider />
        <StretchLayout stretchAt={2} style={{ height: '100%' }}>
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
                <Route path="components/*" element={ComponentCatalogPage} />
              </Routes>
            </Scrollable>
          </main>
        </StretchLayout>
      </StretchLayout>
    </Router>
  )
}
