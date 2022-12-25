import { call } from 'base-up'
import { createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { ScaleYAnimation } from '../../src/ScaleYAnimation'
import { showToast } from '../../src/Toasts'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ScaleYAnimationComponent() {
  const [shown, setShown] = createSignal(true)

  return (
    <article>
      <PageTitle>ScaleYAnimation</PageTitle>

      <Sample title="Basic example">
        <Button onClick={() => setShown(!shown())}>Toggle</Button>
        <ScaleYAnimation shown={shown()}>
          <span>Content</span>
        </ScaleYAnimation>
      </Sample>

      <Sample title="Duration of animation">
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
      </Sample>

      <Sample title="Control by non boolean value">
        {call(() => {
          const [shown, setShown] = createSignal<string | undefined>('First value')
          return (
            <>
              <Button onClick={() => setShown('Second value')}>Show</Button>
              <Button ghost onClick={() => setShown(undefined)}>
                Hide
              </Button>
              <ScaleYAnimation shown={shown()}>{(value) => <div>{value}</div>}</ScaleYAnimation>
            </>
          )
        })}
      </Sample>

      <Sample title="Animation finish callbacks">
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
      </Sample>
    </article>
  )
}
