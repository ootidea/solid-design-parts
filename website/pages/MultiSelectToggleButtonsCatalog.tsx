import { createRoot, createSignal } from 'solid-js'
import { Icon, MultiSelectToggleButtons } from '../../library'
import formatAlignLeftIcon from '../images/format-align-left.svg'
import formatAlignRightIcon from '../images/format-align-right.svg'
import { Catalog } from './ComponentCatalogPage'

const [selected, setSelected] = createSignal<Set<'Walking' | 'Bicycle' | 'Car' | 'Train'>>(new Set())

export const MultiSelectToggleButtonsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
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
