import { createRoot, createSignal } from 'solid-js'
import { AnimatedShow, Button, showToast } from '../../library'
import { Const } from '../../library/Const'
import { createFadeAnimation, createScaleYAnimation } from '../../library/SolidDesignPartsAnimation'
import { Catalog } from './ComponentCatalogPage'

export const AnimatedShowCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>AnimatedShow</code> is a component that execute an animation when elements appear and disappear. It has an
      interface almost identical to <code>Show</code>.
    </>
  ),
  samples: [
    {
      title: 'Basic example',
      children: (
        <Const value={createSignal(true)}>
          {([when, setWhen]) => (
            <>
              <Button onClick={() => setWhen(!when())}>Toggle</Button>
              <AnimatedShow when={when()} animation={createFadeAnimation()}>
                <div>Content</div>
              </AnimatedShow>
            </>
          )}
        </Const>
      ),
    },
    {
      title: 'Controlling by non boolean value',
      children: (
        <>
          <Const value={createSignal<string | undefined>('First value')}>
            {([when, setWhen]) => (
              <>
                <div style={{ display: 'inline-grid', 'grid-auto-flow': 'column', gap: '1em' }}>
                  <Button onClick={() => setWhen('Second value')}>Show</Button>
                  <Button.ghost onClick={() => setWhen(undefined)}>Hide</Button.ghost>
                </div>
                <AnimatedShow when={when()} animation={createScaleYAnimation()}>
                  {(value) => <div>{value}</div>}
                </AnimatedShow>
              </>
            )}
          </Const>
        </>
      ),
    },
    {
      title: 'Animation finish callbacks',
      children: (
        <>
          <Const value={createSignal(true)}>
            {([when, setWhen]) => (
              <>
                <Button onClick={() => setWhen(!when())}>Toggle</Button>
                <AnimatedShow
                  when={when()}
                  animation={createFadeAnimation({ duration: 1000 })}
                  onFinishEnterAnimation={() => showToast('success', 'enter')}
                  onFinishExitAnimation={() => showToast('success', 'exit')}
                >
                  <div>Content</div>
                </AnimatedShow>
              </>
            )}
          </Const>
        </>
      ),
    },
  ],
}))
