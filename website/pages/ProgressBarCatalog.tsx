import { createRoot } from 'solid-js'
import { Catalog } from './ComponentCatalogPage'
import { ProgressBar } from '../../library/ProgressBar'
import { Const } from '../../library/Const'
import { createSignalObject } from 'solid-signal-object'
import { Button } from '../../library'

export const ProgressBarCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <ProgressBar />
          <ProgressBar value={0.5} />
          <ProgressBar value={1} />
        </>
      ),
    },
    {
      title: (
        <>
          Binding <code>value</code> to a signal
        </>
      ),
      children: (
        <Const value={createSignalObject(0.5)}>
          {(valueSignal) => (
            <>
              <ProgressBar value={valueSignal.value} />
              <Button.ghost onClick={() => (valueSignal.value = 0.25)}>value = 0.25</Button.ghost>
              <Button.ghost onClick={() => (valueSignal.value = 0.75)}>value = 0.75</Button.ghost>
            </>
          )}
        </Const>
      ),
    },
  ],
}))
