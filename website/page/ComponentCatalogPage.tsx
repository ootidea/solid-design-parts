import { useLocation } from '@solidjs/router'
import { createRoot, For, JSX, Show } from 'solid-js'
import { createMemoObject } from 'solid-signal-object'
import { Scrollable } from '../../library'
import { PageTitle } from '../PageTitle'
import { Sample, SampleProps } from '../Sample'
import { AwaitCatalog } from './AwaitCatalog'
import { ButtonCatalog } from './ButtonCatalog'
import { CalendarCatalog } from './CalendarCatalog'
import { CheckboxCatalog } from './CheckboxCatalog'
import { CheckboxesCatalog } from './CheckboxesCatalog'
import { CollapsibleCatalog } from './CollapsibleCatalog'
import { DataTableCatalog } from './DataTableCatalog'
import { DateInputCatalog } from './DateInputCatalog'
import { DatePickerCatalog } from './DatePickerCatalog'
import { DividerCatalog } from './DividerCatalog'
import { FadeAnimationCatalog } from './FadeAnimationCatalog'
import { GravityCatalog } from './GravityCatalog'
import { IconButtonCatalog } from './IconButtonCatalog'
import { IconCatalog } from './IconCatalog'
import { ImageCatalog } from './ImageCatalog'
import { LayerLayoutCatalog } from './LayerLayoutCatalog'
import { LinkCatalog } from './LinkCatalog'
import { ModalCatalog } from './ModalCatalog'
import { MultiSelectCatalog } from './MultiSelectCatalog'
import { MultiSelectToggleButtonsCatalog } from './MultiSelectToggleButtonsCatalog'
import { NumberInputCatalog } from './NumberInputCatalog'
import { PopoverCatalog } from './PopoverCatalog'
import { RadioButtonsCatalog } from './RadioButtonsCatalog'
import { ResizableCatalog } from './ResizableCatalog'
import { ScaleYAnimationCatalog } from './ScaleYAnimationCatalog'
import { ScrollableCatalog } from './ScrollableCatalog'
import { SelectCatalog } from './SelectCatalog'
import { SingleSelectToggleButtonsCatalog } from './SingleSelectToggleButtonsCatalog'
import { SliderCatalog } from './SliderCatalog'
import { SpeechBubbleCatalog } from './SpeechBubbleCatalog'
import { SpinnerCatalog } from './SpinnerCatalog'
import { StepperCatalog } from './StepperCatalog'
import { StretchLayoutCatalog } from './StretchLayoutCatalog'
import { TabsCatalog } from './TabsCatalog'
import { TextAreaCatalog } from './TextAreaCatalog'
import { TextInputCatalog } from './TextInputCatalog'
import { TitleBarLayoutCatalog } from './TitleBarLayoutCatalog'
import { ToastCatalog } from './ToastCatalog'
import { TriangleCatalog } from './TriangleCatalog'
import { UrlToLinkCatalog } from './UrlToLinkCatalog'

export type Catalog = {
  introduction?: JSX.Element
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
  MultiSelectToggleButtonsCatalog,
  SingleSelectToggleButtonsCatalog,
  TextInputCatalog,
  NumberInputCatalog,
  TextAreaCatalog,
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
  CollapsibleCatalog: CollapsibleCatalog,
  IconCatalog,
  DividerCatalog,
  ImageCatalog,
  SpinnerCatalog,
  StepperCatalog,
  TriangleCatalog,
  SpeechBubbleCatalog,
  FadeAnimationCatalog,
  ScaleYAnimationCatalog,
  AwaitCatalog,
  UrlToLinkCatalog,
  LinkCatalog,
}))

export function ComponentCatalogPage() {
  const pageInfo = createMemoObject(() => {
    const urlComponentName = useLocation().pathname.match(/\/components\/(\w+)/)?.[1]
    if (urlComponentName === undefined) return undefined

    const catalog = catalogs[`${urlComponentName}Catalog`]
    if (catalog === undefined) return undefined

    return { catalog, componentName: urlComponentName }
  })

  return (
    <Show when={pageInfo.value} keyed={true}>
      {({ catalog, componentName }) => (
        <Scrollable style="padding: 1rem 4rem 10rem;">
          <article>
            <PageTitle>{componentName}</PageTitle>
            <Show when={catalog.introduction}>
              <p>{catalog.introduction}</p>
            </Show>

            <For each={catalog.samples}>{(sample) => <Sample {...sample} />}</For>
          </article>
        </Scrollable>
      )}
    </Show>
  )
}
