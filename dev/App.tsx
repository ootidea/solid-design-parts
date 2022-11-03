import { Route, Router, Routes } from '@solidjs/router'
import { For, JSX } from 'solid-js'
import { Divider } from '../src/Divider'
import { Foldable } from '../src/Foldable'
import { Scrollable } from '../src/Scrollable'
import { StretchLayout } from '../src/StretchLayout'
import classes from './App.module.scss'
import { AutoSizeTextAreaComponent } from './page/AutoSizeTextAreaComponent'
import { ButtonComponent } from './page/ButtonComponent'
import { CalendarComponent } from './page/CalendarComponent'
import { CheckboxComponent } from './page/CheckboxComponent'
import { DataTableComponent } from './page/DataTableComponent'
import { DateInputComponent } from './page/DateInputComponent'
import { DatePickerComponent } from './page/DatePickerComponent'
import { DividerComponent } from './page/DividerComponent'
import { FadeAnimationComponent } from './page/FadeAnimationComponent'
import { FoldableComponent } from './page/FoldableComponent'
import { GravityComponent } from './page/GravityComponent'
import { IconButtonComponent } from './page/IconButtonComponent'
import { IconComponent } from './page/IconComponent'
import { ImageComponent } from './page/ImageComponent'
import { LayerLayoutComponent } from './page/LayerLayoutComponent'
import { ModalComponent } from './page/ModalComponent'
import { MultiSelectComponent } from './page/MultiSelectComponent'
import { PopoverComponent } from './page/PopoverComponent'
import { RadioButtonsComponent } from './page/RadioButtonsComponent'
import { ResizableComponent } from './page/ResizableComponent'
import { ScaleYAnimationComponent } from './page/ScaleYAnimationComponent'
import { ScrollableComponent } from './page/ScrollableComponent'
import { SelectComponent } from './page/SelectComponent'
import { SliderComponent } from './page/SliderComponent'
import { SpeechBubbleComponent } from './page/SpeechBubbleComponent'
import { SpinnerComponent } from './page/SpinnerComponent'
import { StepperComponent } from './page/StepperComponent'
import { StretchLayoutComponent } from './page/StretchLayoutComponent'
import { TabsComponent } from './page/TabsComponent'
import { TextInputComponent } from './page/TextInputComponent'
import { TitleBarLayoutComponent } from './page/TitleBarLayoutComponent'
import { ToastComponent } from './page/ToastComponent'
import { ToggleButtonsComponent } from './page/ToggleButtonsComponent'
import { SidebarMenu } from './SidebarMenu'

function getName(component: Function) {
  return component.name.replace(/Component$/, '')
}

type Component = Function & JSX.Element

type MenuItem = {
  title: string
  children: Component[]
}

function extractComponents(menuItems: MenuItem[]): Component[] {
  return menuItems.flatMap((menuItem) => menuItem.children)
}

export function App() {
  const menuItems: MenuItem[] = [
    { title: 'Action buttons', children: [ButtonComponent, IconButtonComponent] },
    {
      title: 'Selection',
      children: [
        CheckboxComponent,
        RadioButtonsComponent,
        ToggleButtonsComponent,
        SelectComponent,
        MultiSelectComponent,
      ],
    },
    { title: 'Text input', children: [TextInputComponent, AutoSizeTextAreaComponent] },
    {
      title: 'Date and time',
      children: [DateInputComponent, CalendarComponent, DatePickerComponent],
    },
    { title: 'Other inputs', children: [SliderComponent] },
    {
      title: 'Layout',
      children: [
        GravityComponent,
        StretchLayoutComponent,
        LayerLayoutComponent,
        TitleBarLayoutComponent,
        ScrollableComponent,
        ResizableComponent,
        FoldableComponent,
      ],
    },
    { title: 'Floating', children: [ModalComponent, PopoverComponent, ToastComponent] },
    { title: 'Data collections', children: [DataTableComponent, TabsComponent] },
    { title: 'Animations', children: [FadeAnimationComponent, ScaleYAnimationComponent] },
    {
      title: 'Others',
      children: [
        IconComponent,
        ImageComponent,
        DividerComponent,
        SpinnerComponent,
        StepperComponent,
        SpeechBubbleComponent,
      ],
    },
  ]

  return (
    <Router>
      <StretchLayout style={{ height: '100%' }} stretchAt={2}>
        <nav class={classes.sidebar}>
          <Scrollable class={classes.sidebarContent}>
            <For each={menuItems}>
              {(menuItem) => (
                <Foldable title={menuItem.title} unfolded>
                  <For each={menuItem.children}>
                    {(component) => <SidebarMenu componentName={getName(component)} />}
                  </For>
                </Foldable>
              )}
            </For>
          </Scrollable>
        </nav>
        <Divider direction="vertical" />
        <main class={classes.main}>
          <Scrollable style="padding: 1rem 4rem 10rem;">
            <Routes>
              {/* For some reason, it was not displayed using the For component. */}
              {extractComponents(menuItems).map((component) => (
                <Route path={getName(component)} element={component} />
              ))}
            </Routes>
          </Scrollable>
        </main>
      </StretchLayout>
    </Router>
  )
}
