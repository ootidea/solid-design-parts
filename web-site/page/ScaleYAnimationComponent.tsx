import { call } from 'base-up'
import { createRoot, createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { ScaleYAnimation } from '../../src/ScaleYAnimation'
import { showToast } from '../../src/Toasts'
import { Catalog } from './ComponentCatalog'

const [shown, setShown] = createSignal(true)

export const ScaleYCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Button onClick={() => setShown(!shown())}>Toggle</Button>
          <ScaleYAnimation shown={shown()}>
            <span>Content</span>
          </ScaleYAnimation>
        </>
      ),
    },
    {
      title: 'Duration of animation',
      children: (
        <>
          {call(() => {
            const [shown, setShown] = createSignal(true)
            return (
              <>
                <Button onClick={() => setShown(!shown())}>Toggle</Button>
                <ScaleYAnimation shown={shown()} options={1000}>
                  <div>Content</div>
                </ScaleYAnimation>
              </>
            )
          })}
        </>
      ),
    },
    {
      title: 'Control by non boolean value',
      children: (
        <>
          {call(() => {
            const [shown, setShown] = createSignal<string | undefined>('First value')
            return (
              <>
                <Button onClick={() => setShown('Second value')}>Show</Button>
                <Button.ghost onClick={() => setShown(undefined)}>Hide</Button.ghost>
                <ScaleYAnimation shown={shown()}>{(value) => <div>{value}</div>}</ScaleYAnimation>
              </>
            )
          })}
        </>
      ),
    },
    {
      title: 'Animation finish callbacks',
      children: (
        <>
          {call(() => {
            const [shown, setShown] = createSignal(true)
            return (
              <>
                <Button onClick={() => setShown(!shown())}>Toggle</Button>
                <ScaleYAnimation
                  shown={shown()}
                  onFinishEnterAnimation={() => showToast('success', 'enter')}
                  onFinishExitAnimation={() => showToast('success', 'exit')}
                >
                  <div>Content</div>
                </ScaleYAnimation>
              </>
            )
          })}
        </>
      ),
    },
  ],
}))
