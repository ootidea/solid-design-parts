import { createRoot, createSignal } from 'solid-js'
import { DatePicker } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal<Date | undefined>(undefined)

export const DatePickerCatalog: Catalog = createRoot(() => ({
  introduction: {
    default: (
      <>
        <code>DatePicker</code> is a component for selecting a date from a calendar.
      </>
    ),
    ja: (
      <>
        <code>DatePicker</code>はカレンダーから日付を選ぶコンポーネントです。
      </>
    ),
  },
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <DatePicker />
          <DatePicker value={new Date()} />
        </>
      ),
    },
    {
      title: { default: 'Showing the specified month', ja: '指定した月を表示' },
      children: (
        <>
          <DatePicker month={new Date(1999, 0)} />
        </>
      ),
    },
    {
      title: {
        default: (
          <>
            Binding <code>value</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>value</code>とsignalの双方向バインディング
          </>
        ),
      },
      children: (
        <>
          <DatePicker value={value()} onChangeValue={setValue} />
          <div>value: {value() === undefined ? 'undefined' : value()?.toLocaleDateString()}</div>
        </>
      ),
    },
    {
      title: { default: 'Minimum and maximum value', ja: '最小値、最大値を設定' },
      children: (
        <>
          <DatePicker min={new Date()} />
          <DatePicker max={new Date()} />
        </>
      ),
    },
    {
      title: { default: 'Disabling the specified date', ja: '指定した日付をdisable' },
      children: (
        <>
          <DatePicker disabled={(date) => date.getDay() % 3 === 0} />
        </>
      ),
    },
    {
      title: { default: 'Enabling deselection', ja: '選択解除機能を有効化' },
      description: {
        default: (
          <>
            If the <code>enableDeselection</code> option is set, clicking the selected date again will deselect it.
          </>
        ),
        ja: (
          <>
            <code>enableDeselection</code>オプションを設定すると、選択済みの日付を再度クリックして選択解除できます。
          </>
        ),
      },
      children: (
        <>
          <DatePicker value={new Date()} enableDeselection />
        </>
      ),
    },
  ],
}))
