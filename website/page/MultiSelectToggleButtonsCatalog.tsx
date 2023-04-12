import { createRoot, createSignal } from 'solid-js'
import { Icon } from '../../src/Icon'
import { MultiSelectToggleButtons } from '../../src/MultiSelectToggleButtons'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'
import formatAlignLeftIcon from './format-align-left.svg'
import formatAlignRightIcon from './format-align-right.svg'

const [selected1, setSelected1] = createSignal<'en' | 'zh' | undefined>('en')
const [selected2, setSelected2] = createSignal<Set<'en' | 'zh'>>(new Set(), { equals: false })

export const MultiSelectToggleButtonsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <MultiSelectToggleButtons values={['Dog', 'Cat']} />
          <MultiSelectToggleButtons values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} />
        </>
      ),
    },
    {
      title: 'Exclusive (single select)',
      children: (
        <>
          <MultiSelectToggleButtons exclusive values={['Dog', 'Cat']} />
          <MultiSelectToggleButtons exclusive values={['Female', 'Male', 'Other']} selected="Male" />
        </>
      ),
    },
    {
      title: 'Titles',
      children: (
        <>
          <MultiSelectToggleButtons values={['en', 'zh']} labels={{ en: 'English', zh: 'Chinese' }} />
          <MultiSelectToggleButtons values={['en', 'zh', 'jp']} labels={{ en: 'English', zh: 'Chinese' }} />
        </>
      ),
    },
    {
      title: 'Icons',
      children: (
        <>
          <MultiSelectToggleButtons values={['left', 'right']}>
            {({ value }) => (
              <Icon src={{ left: formatAlignLeftIcon, right: formatAlignRightIcon }[value]} color="currentColor" />
            )}
          </MultiSelectToggleButtons>
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>selected</code> to signal
        </>
      ),
      children: (
        <>
          <MultiSelectToggleButtons
            exclusive
            values={['en', 'zh']}
            selected={selected1()}
            onChangeSelected={setSelected1}
          />
          <div>selected1: {toLiteral(selected1())}</div>
          <MultiSelectToggleButtons values={['en', 'zh']} selected={selected2()} onChangeSelected={setSelected2} />
          <div>{`selected: {${[...selected2()].map((value) => JSON.stringify(value)).join(', ')}}`}</div>
        </>
      ),
    },
    {
      title: 'Disable deselection',
      description: 'Disable deselection that occurs when clicking on a selected option.',
      children: (
        <>
          <MultiSelectToggleButtons exclusive values={['Male', 'Female']} disableDeselection />
        </>
      ),
    },
    {
      title: 'Full width',
      children: (
        <>
          <MultiSelectToggleButtons fullWidth values={['Female', 'Male', 'LGBTQQIAAPPO2S']} />
        </>
      ),
    },
  ],
}))
