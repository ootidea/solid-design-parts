import { createSignal } from 'solid-js'
import { Select } from '../../src/Select'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalog'

const [selected, setSelected] = createSignal<'Female' | 'Male' | 'Other' | undefined>('Female')

export const SelectCatalog: Catalog = {
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Select values={['Female', 'Male', 'Other']} />
          <Select values={['Female', 'Male', 'Other']} placeholder="placeholder" />
          <Select values={['Female', 'Male', 'Other']} selected="Male" />
        </>
      ),
    },
    {
      title: 'Bind to signal',
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
      title: 'Clear button',
      children: (
        <>
          <Select placeholder="gender" values={['Female', 'Male', 'Other']} selected="Female" showClearButton />
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
}
