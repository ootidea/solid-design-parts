import { createRoot, createSignal } from 'solid-js'
import { Select } from '../../library'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const [selected, setSelected] = createSignal<'Female' | 'Male' | 'Other' | undefined>('Female')

export const SelectCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <Select values={['Female', 'Male', 'Other']} />
          <Select values={['Female', 'Male', 'Other']} placeholder="placeholder" />
          <Select values={['Female', 'Male', 'Other']} selected="Male" />
        </>
      ),
    },
    {
      title: {
        default: (
          <>
            Binding <code>selected</code> to a signal
          </>
        ),
        ja: (
          <>
            <code>selected</code>とsignalの双方向バインディング
          </>
        ),
      },
      children: (
        <>
          <Select values={['Female', 'Male', 'Other']} selected={selected()} onChangeSelected={setSelected} />
          <div>selected: {toLiteral(selected())}</div>
        </>
      ),
    },
    {
      title: 'Disabled',
      children: (
        <>
          <Select values={['Female', 'Male', 'Other']} placeholder="placeholder" disabled />
          <Select values={['Female', 'Male', 'Other']} selected="Male" disabled />
        </>
      ),
    },
    {
      title: { default: 'Showing the clear button', ja: 'クリアボタンを表示' },
      children: (
        <>
          <Select placeholder="gender" values={['Female', 'Male', 'Other']} selected="Female" showClearButton />
        </>
      ),
    },
    {
      title: 'Error state',
      children: (
        <>
          <Select placeholder="gender" values={['Female', 'Male', 'Other']} error="Something went wrong." />
          <Select placeholder="gender" values={['Female', 'Male', 'Other']} error />
        </>
      ),
    },
    {
      title: 'Required',
      children: (
        <>
          <Select values={['Female', 'Male', 'Other']} selected="Male" required showClearButton />
        </>
      ),
    },
    {
      title: 'Validation function',
      children: (
        <>
          <Select
            values={['left', 'center', 'right']}
            error={(selected) => selected === 'center' && 'Currently, center is not available.'}
          />
        </>
      ),
    },
    {
      title: 'Validate initial value',
      description: (
        <>
          If <code>validateImmediately</code> option is set, it perform validation even if the user did not edit it.
        </>
      ),
      children: (
        <>
          <Select
            values={['left', 'center', 'right']}
            error={(selected) => selected !== 'center' && 'Must be center'}
            validateImmediately
          />
        </>
      ),
    },
    {
      title: 'Search',
      children: (
        <>
          <Select
            showSearchBox
            values={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
          />
        </>
      ),
    },
    {
      title: 'Full width',
      children: (
        <>
          <Select fullWidth values={['Female', 'Male', 'Other']} placeholder="placeholder" />
        </>
      ),
    },
  ],
}))
