import { createSignal } from 'solid-js'
import { Icon } from '../../src/Icon'
import { ToggleButtons } from '../../src/ToggleButtons'
import { toLiteral } from '../other'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import formatAlignLeftIcon from './format-align-left.svg'
import formatAlignRightIcon from './format-align-right.svg'

export function ToggleButtonsComponent() {
  const [selected1, setSelected1] = createSignal<'en' | 'zh' | undefined>('en')
  const [selected2, setSelected2] = createSignal<Set<'en' | 'zh'>>(new Set(), { equals: false })

  return (
    <article>
      <PageTitle>ToggleButtons</PageTitle>

      <Sample title="Basic example">
        <ToggleButtons values={['Dog', 'Cat']} />
        <ToggleButtons values={['Female', 'Male', 'Other']} selected={new Set(['Female', 'Male'])} />
      </Sample>

      <Sample title="Exclusive (single select)">
        <ToggleButtons exclusive values={['Dog', 'Cat']} />
        <ToggleButtons exclusive values={['Female', 'Male', 'Other']} selected="Male" />
      </Sample>

      <Sample title="Titles">
        <ToggleButtons values={['en', 'zh']} titles={{ en: 'English', zh: 'Chinese' }} />
        <ToggleButtons values={['en', 'zh', 'jp']} titles={{ en: 'English', zh: 'Chinese' }} />
      </Sample>

      <Sample title="Icons">
        <ToggleButtons values={['left', 'right']}>
          {({ value }) => <Icon src={{ left: formatAlignLeftIcon, right: formatAlignRightIcon }[value]} />}
        </ToggleButtons>
      </Sample>

      <Sample title="Bind to signal">
        <ToggleButtons exclusive values={['en', 'zh']} selected={selected1()} onChangeSelected={setSelected1} />
        <div>selected1() === {toLiteral(selected1())}</div>
        <ToggleButtons values={['en', 'zh']} selected={selected2()} onChangeSelected={setSelected2} />
        <div>selected2() equals new Set({JSON.stringify([...selected2()])})</div>
      </Sample>

      <Sample
        title="Disable deselection"
        description="Disable deselection that occurs when clicking on a selected option."
      >
        <ToggleButtons exclusive values={['Male', 'Female']} disableDeselection />
      </Sample>

      <Sample title="Full width">
        <ToggleButtons fullWidth values={['Female', 'Male', 'LGBTQQIAAPPO2S']} />
      </Sample>
    </article>
  )
}
