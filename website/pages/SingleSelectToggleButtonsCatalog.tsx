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
      title: 'Basic example',
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
      title: (
        <>
          Binding <code>selected</code> to signal
        </>
      ),
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
