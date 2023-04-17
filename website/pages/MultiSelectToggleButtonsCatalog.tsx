import { createRoot, createSignal } from 'solid-js'
import { Icon, MultiSelectToggleButtons } from '../../library'
import { Catalog } from './ComponentCatalogPage'
import formatAlignLeftIcon from './format-align-left.svg'
import formatAlignRightIcon from './format-align-right.svg'

const [selected, setSelected] = createSignal<Set<'Walking' | 'Bicycle' | 'Car' | 'Train'>>(new Set())

export const MultiSelectToggleButtonsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <MultiSelectToggleButtons values={['Dog', 'Cat']} />
          <MultiSelectToggleButtons values={['PC', 'Smartphone', 'Tablet']} selected={new Set(['PC', 'Smartphone'])} />
        </>
      ),
    },
    {
      title: 'Labels',
      children: (
        <>
          <MultiSelectToggleButtons values={['en', 'zh', 'jp']} labels={{ en: 'English', zh: 'Chinese' }} />
        </>
      ),
    },
    {
      title: 'Icons',
      children: (
        <>
          <MultiSelectToggleButtons
            values={['left', 'right']}
            labels={(value) => (
              <Icon src={{ left: formatAlignLeftIcon, right: formatAlignRightIcon }[value]} color="currentColor" />
            )}
          />
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
            values={['Walking', 'Bicycle', 'Car', 'Train']}
            selected={selected()}
            onChangeSelected={setSelected}
          />
          <div>{`selected: {${[...selected()].map((value) => JSON.stringify(value)).join(', ')}}`}</div>
        </>
      ),
    },
    {
      title: 'Full width',
      children: (
        <>
          <MultiSelectToggleButtons fullWidth values={['Walking', 'Bicycle', 'Car', 'Train']} />
        </>
      ),
    },
  ],
}))
