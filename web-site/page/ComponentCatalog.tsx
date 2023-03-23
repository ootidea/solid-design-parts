import { useLocation } from '@solidjs/router'
import { createMemo, createRoot, For, Show } from 'solid-js'
import { PageTitle } from '../PageTitle'
import { Sample, SampleProps } from '../Sample'
import { AutoSizeTextAreaCatalog } from './AutoSizeTextAreaComponent'
import { AwaitCatalog } from './AwaitComponent'
import { ButtonCatalog } from './ButtonComponent'
import { CalendarCatalog } from './CalendarComponent'
import { CheckboxCatalog } from './CheckboxComponent'
import { CheckboxesCatalog } from './CheckboxesComponent'
import { DataTableCatalog } from './DataTableComponent'
import { DateInputCatalog } from './DateInputComponent'
import { DatePickerCatalog } from './DatePickerComponent'
import { DividerCatalog } from './DividerComponent'
import { FadeAnimationCatalog } from './FadeAnimationComponent'
import { FoldableCatalog } from './FoldableComponent'
import { GravityCatalog } from './GravityComponent'
import { IconButtonCatalog } from './IconButtonComponent'
import { IconCatalog } from './IconComponent'
import { ImageCatalog } from './ImageComponent'
import { LayerLayoutCatalog } from './LayerLayoutComponent'
import { ModalCatalog } from './ModalComponent'
import { MultiSelectCatalog } from './MultiSelectComponent'
import { NumberInputCatalog } from './NumberInputComponent'
import { PopoverCatalog } from './PopoverComponent'
import { RadioButtonsCatalog } from './RadioButtonsComponent'
import { ResizableCatalog } from './ResizableComponent'
import { ScaleYCatalog } from './ScaleYAnimationComponent'
import { ScrollableCatalog } from './ScrollableComponent'
import { SelectCatalog } from './SelectComponent'
import { SliderCatalog } from './SliderComponent'
import { SpeechBubbleCatalog } from './SpeechBubbleComponent'
import { SpinnerCatalog } from './SpinnerComponent'
import { StepperCatalog } from './StepperComponent'
import { StretchLayoutCatalog } from './StretchLayoutComponent'
import { TabsCatalog } from './TabsComponent'
import { TextInputCatalog } from './TextInputComponent'
import { TitleBarLayoutCatalog } from './TitleBarLayoutComponent'
import { ToastCatalog } from './ToastComponent'
import { ToggleButtonsCatalog } from './ToggleButtonsComponent'
import { TriangleCatalog } from './TriangleComponent'
import { UrlToLinkCatalog } from './UrlToLinkComponent'

export type Catalog = {
  samples: SampleProps[]
}

const catalogs: Partial<Record<string, Catalog>> = createRoot(() => ({
  ButtonCatalog,
  IconButtonCatalog,
  RadioButtonsCatalog,
  CheckboxCatalog,
  CheckboxesCatalog,
  SelectCatalog,
  MultiSelectCatalog,
  ToggleButtonsCatalog,
  TextInputCatalog,
  NumberInputCatalog,
  AutoSizeTextAreaCatalog,
  CalendarCatalog,
  DatePickerCatalog,
  DateInputCatalog,
  SliderCatalog,
  ModalCatalog,
  PopoverCatalog,
  ToastCatalog,
  DataTableCatalog,
  TabsCatalog,
  GravityCatalog,
  LayerLayoutCatalog,
  StretchLayoutCatalog,
  TitleBarLayoutCatalog,
  ScrollableCatalog,
  ResizableCatalog,
  FoldableCatalog,
  IconCatalog,
  DividerCatalog,
  ImageCatalog,
  SpinnerCatalog,
  StepperCatalog,
  TriangleCatalog,
  SpeechBubbleCatalog,
  FadeAnimationCatalog,
  ScaleYCatalog,
  AwaitCatalog,
  UrlToLinkCatalog,
}))

export function ComponentCatalog() {
  const pageInfo = createMemo(() => {
    const urlComponentName = useLocation().pathname.match(/\/components\/(\w+)/)?.[1]
    if (urlComponentName === undefined) return undefined

    const catalog = catalogs[`${urlComponentName}Catalog`]
    if (catalog === undefined) return undefined

    return { catalog, componentName: urlComponentName }
  })

  return (
    <article>
      <Show when={pageInfo()} keyed={true}>
        {({ catalog, componentName }) => (
          <>
            <PageTitle>{componentName}</PageTitle>

            <For each={catalog.samples}>{(sample) => <Sample {...sample} />}</For>
          </>
        )}
      </Show>
    </article>
  )
}
