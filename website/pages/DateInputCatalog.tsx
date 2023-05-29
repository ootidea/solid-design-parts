import { createRoot, createSignal } from 'solid-js'
import { DateInput } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const [value, setValue] = createSignal<Date | undefined>(new Date())

export const DateInputCatalog: Catalog = createRoot(() => ({
  introduction: {
    default: (
      <>
        <code>DateInput</code> is a component for inputting a date, specifically year, month, and day.
      </>
    ),
    ja: (
      <>
        <code>DateInput</code>は日付を入力するためのコンポーネントです。
      </>
    ),
  },
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      direction: 'horizontal',
      children: (
        <>
          <DateInput />
          <DateInput placeholder="a little long placeholder" />
          <DateInput value={new Date()} />
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
          <DateInput value={value()} onChangeValue={setValue} />
          <div>value: {value() === undefined ? 'undefined' : value()?.toLocaleDateString()}</div>
        </>
      ),
    },
    {
      title: { default: 'Minimum and maximum date', ja: '日付の上限、下限を設定' },
      direction: 'horizontal',
      children: (
        <>
          <DateInput min={new Date()} placeholder="next reservation date" />
          <DateInput max={new Date()} placeholder="previous reservation date" />
        </>
      ),
    },
    {
      title: 'Disabled',
      direction: 'horizontal',
      children: (
        <>
          <DateInput placeholder="placeholder" disabled />
          <DateInput value={new Date()} disabled />
        </>
      ),
    },
    {
      title: { default: 'Disabling the specified dates', ja: '指定した日付をdisable' },
      direction: 'horizontal',
      children: (
        <>
          <DateInput disabledDate={(date) => date.getDay() % 3 === 0} />
        </>
      ),
    },
    {
      title: { default: 'Showing the clear button', ja: 'クリアボタンを表示' },
      direction: 'horizontal',
      children: (
        <>
          <DateInput placeholder="placeholder" value={new Date()} showClearButton />
        </>
      ),
    },
    {
      title: { default: 'Changing date format', ja: '日付表示形式を変更' },
      direction: 'horizontal',
      children: (
        <>
          <DateInput format={({ value }) => value?.toISOString()} />
        </>
      ),
    },
  ],
}))
