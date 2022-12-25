import { call } from 'base-up'
import { createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { FadeAnimation } from '../../src/FadeAnimation'
import { showToast } from '../../src/Toasts'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function FadeAnimationComponent() {
  const [shown, setShown] = createSignal(true)

  return (
    <article>
      <PageTitle>FadeAnimation</PageTitle>

      <Sample title="Basic example">
        <Button onClick={() => setShown(!shown())}>Toggle</Button>
        <FadeAnimation shown={shown()}>
          <div>Content</div>
        </FadeAnimation>
      </Sample>

      <Sample title="Duration of animation">
        {call(() => {
          const [shown, setShown] = createSignal(true)
          return (
            <>
              <Button onClick={() => setShown(!shown())}>Toggle</Button>
              <FadeAnimation shown={shown()} options={1000}>
                <div>Content</div>
              </FadeAnimation>
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
              <FadeAnimation shown={shown()}>{(value) => <div>{value}</div>}</FadeAnimation>
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
      </Sample>
    </article>
  )
}
