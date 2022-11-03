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

      <Sample title="Control by launcher">
        <FadeAnimation launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </FadeAnimation>
      </Sample>

      <Sample title="Duration of animation">
        <FadeAnimation options={1000} launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </FadeAnimation>
      </Sample>

      <Sample title="Animation finish callbacks">
        <FadeAnimation
          onFinishEnterAnimation={() => showToast('success', 'enter')}
          onFinishExitAnimation={() => showToast('success', 'exit')}
          launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}
        >
          <div>Content</div>
        </FadeAnimation>
      </Sample>
    </article>
  )
}
