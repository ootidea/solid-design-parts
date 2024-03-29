import { createRoot, createSignal } from 'solid-js'
import { Icon, SingleSelectToggleButtons } from '../../library'
import formatAlignLeftIcon from '../images/format-align-left.svg'
import formatAlignRightIcon from '../images/format-align-right.svg'
import { toLiteral } from '../other'
import { Catalog } from './ComponentCatalogPage'

const [selected, setSelected] = createSignal<'Python' | 'TypeScript' | 'Kotlin' | 'Swift' | undefined>(undefined)

export const SingleSelectToggleButtonsCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <SingleSelectToggleButtons values={['Dog', 'Cat']} />
          <SingleSelectToggleButtons values={['Female', 'Male', 'Other']} selected="Male" />
        </>
      ),
    },
    {
      title: 'Labels',
      children: (
        <>
          <SingleSelectToggleButtons values={['en', 'zh', 'jp']} labels={{ en: 'English', zh: 'Chinese' }} />
          <SingleSelectToggleButtons
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
          <SingleSelectToggleButtons
            values={['Python', 'TypeScript', 'Kotlin', 'Swift']}
            selected={selected()}
            onChangeSelected={setSelected}
          />
          <div>selected: {toLiteral(selected())}</div>
        </>
      ),
    },
    {
      title: <>Full width</>,
      children: (
        <>
          <SingleSelectToggleButtons values={['Python', 'TypeScript', 'Kotlin', 'Swift']} fullWidth />
        </>
      ),
    },
  ],
}))
