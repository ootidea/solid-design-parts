import { createRoot, createSignal } from 'solid-js'
import { Icon } from '../../src/Icon'
import { ToggleButtons } from '../../src/ToggleButtons'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalog'
import formatAlignLeftIcon from './format-align-left.svg'
import formatAlignRightIcon from './format-align-right.svg'

const [selected1, setSelected1] = createSignal<'en' | 'zh' | undefined>('en')
const [selected2, setSelected2] = createSignal<Set<'en' | 'zh'>>(new Set(), { equals: false })

export const ToggleButtonsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <ToggleButtons values={['Dog', 'Cat']} />
          <ToggleButtons values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} />
        </>
      ),
    },
    {
      title: 'Exclusive (single select)',
      children: (
        <>
          <ToggleButtons exclusive values={['Dog', 'Cat']} />
          <ToggleButtons exclusive values={['Female', 'Male', 'Other']} selected="Male" />
        </>
      ),
    },
    {
      title: 'Titles',
      children: (
        <>
          <ToggleButtons values={['en', 'zh']} labels={{ en: 'English', zh: 'Chinese' }} />
          <ToggleButtons values={['en', 'zh', 'jp']} labels={{ en: 'English', zh: 'Chinese' }} />
        </>
      ),
    },
    {
      title: 'Icons',
      children: (
        <>
          <ToggleButtons values={['left', 'right']}>
            {({ value }) => <Icon src={{ left: formatAlignLeftIcon, right: formatAlignRightIcon }[value]} />}
          </ToggleButtons>
        </>
      ),
    },
    {
      title: 'Bind to signal',
      children: (
        <>
          <ToggleButtons exclusive values={['en', 'zh']} selected={selected1()} onChangeSelected={setSelected1} />
          <div>selected1: {toLiteral(selected1())}</div>
          <ToggleButtons values={['en', 'zh']} selected={selected2()} onChangeSelected={setSelected2} />
          <div>{`selected: {${[...selected2()].map((value) => JSON.stringify(value)).join(', ')}}`}</div>
        </>
      ),
    },
    {
      title: 'Disable deselection',
      description: 'Disable deselection that occurs when clicking on a selected option.',
      children: (
        <>
          <ToggleButtons exclusive values={['Male', 'Female']} disableDeselection />
        </>
      ),
    },
    {
      title: 'Full width',
      children: (
        <>
          <ToggleButtons fullWidth values={['Female', 'Male', 'LGBTQQIAAPPO2S']} />
        </>
      ),
    },
  ],
}))
