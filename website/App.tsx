import { Navigate, Route, Router, Routes } from '@solidjs/router'
import { For } from 'solid-js'
import { Collapsible, Divider, Gravity, Scrollable, Select, StretchLayout } from '../library'
import { forceCurrentLanguage } from '../library/utility/i18n'
import classes from './App.module.scss'
import { ComponentCatalogPage } from './pages/ComponentCatalogPage'
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
      children: [
        'Checkbox',
        'Checkboxes',
        'RadioButtons',
        'Select',
        'MultiSelect',
        'SingleSelectToggleButtons',
        'MultiSelectToggleButtons',
      ],
    },
    { title: 'Text input', children: ['TextInput', 'TextArea', 'NumberInput'] },
    {
      title: 'Date and time',
      children: ['DateInput', 'DatePicker', 'Calendar'],
    },
    { title: 'Other inputs', children: ['Slider'] },
    { title: 'Floating', children: ['Modal', 'Popover', 'Toast'] },
    { title: 'Data collections', children: ['DataTable', 'Pagination', 'Tabs', 'Carousel'] },
    { title: 'Animations', children: ['AnimatedShow', 'AnimateOnView'] },
    {
      title: 'Layout',
      children: ['Scrollable', 'Collapsible', 'Resizable', 'Gravity', 'TitleBarLayout', 'StretchLayout'],
    },
    {
      title: 'Others',
      children: ['Icon', 'Divider', 'Spinner', 'Triangle', 'SpeechBubble', 'ProgressBar', 'Stepper', 'Link', 'Image'],
    },
    { title: 'Utility', children: ['Await', 'Const', 'UrlToLink'] },
  ]

  return (
    <Router>
      <StretchLayout direction="vertical" stretchAt={2} style={{ height: '100%' }}>
        <header class={classes.header}>
          <a class={classes.libraryLogo} href="/">
            solid-design-parts
          </a>
          <Select
            placeholder="language"
            values={['en', 'ja']}
            labels={{ en: 'English', ja: '日本語' }}
            showClearButton
            onChangeSelected={(selected) => forceCurrentLanguage(selected)}
          />
        </header>
        <Divider />
        <StretchLayout stretchAt={2} style={{ height: '100%' }}>
          <nav class={classes.sidebar}>
            <Scrollable class={classes.sidebarContent}>
              <For each={menuItems}>
                {(menuItem) => (
                  <Collapsible
                    title={menuItem.title}
                    titleAreaProps={{
                      class: classes.sideBarCollapsibleSummary,
                    }}
                  >
                    <For each={menuItem.children}>{(name) => <SidebarMenu componentName={name} />}</For>
                  </Collapsible>
                )}
              </For>
            </Scrollable>
          </nav>
          <Divider direction="vertical" />
          <main class={classes.main}>
            <Routes>
              <Route path="components/*" component={ComponentCatalogPage} />
              {/* TODO: Since there is no homepage, a temporary redirect is in place. */}
              <Route path="/" element={<Navigate href="components/Button" />} />
            </Routes>
          </main>
        </StretchLayout>
      </StretchLayout>
    </Router>
  )
}
