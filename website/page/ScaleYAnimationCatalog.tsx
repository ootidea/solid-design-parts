import { call } from 'base-up'
import { createRoot, createSignal } from 'solid-js'
import { Button } from '../../library/Button'
import { ScaleYAnimation } from '../../library/ScaleYAnimation'
import { showToast } from '../../library/Toasts'
import { Catalog } from './ComponentCatalogPage'

const [shown, setShown] = createSignal(true)

export const ScaleYAnimationCatalog: Catalog = createRoot(() => ({
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
                <ScaleYAnimation shown={shown()} durationMs={1000}>
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
