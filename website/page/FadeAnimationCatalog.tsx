import { call } from 'base-up'
import { createRoot, createSignal } from 'solid-js'
import { Button } from '../../library/Button'
import { FadeAnimation } from '../../library/FadeAnimation'
import { showToast } from '../../library/Toasts'
import { Catalog } from './ComponentCatalogPage'

const [shown, setShown] = createSignal(true)

export const FadeAnimationCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <Button onClick={() => setShown(!shown())}>Toggle</Button>
          <FadeAnimation shown={shown()}>
            <div>Content</div>
          </FadeAnimation>
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
                <FadeAnimation shown={shown()} durationMs={1000}>
                  <div>Content</div>
                </FadeAnimation>
              </>
            )
          })}
        </>
      ),
    },
    {
      title: 'Controlling by non boolean value',
      children: (
        <>
          {call(() => {
            const [shown, setShown] = createSignal<string | undefined>('First value')
            return (
              <>
                <Button onClick={() => setShown('Second value')}>Show</Button>
                <Button.ghost onClick={() => setShown(undefined)}>Hide</Button.ghost>
                <FadeAnimation shown={shown()}>{(value) => <div>{value}</div>}</FadeAnimation>
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
                <FadeAnimation
                  shown={shown()}
                  onFinishEnterAnimation={() => showToast('success', 'enter')}
                  onFinishExitAnimation={() => showToast('success', 'exit')}
                >
                  <div>Content</div>
                </FadeAnimation>
              </>
            )
          })}
        </>
      ),
    },
  ],
}))
