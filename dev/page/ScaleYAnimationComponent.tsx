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

      <Sample title="Control by launcher">
        <ScaleYAnimation launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </ScaleYAnimation>
      </Sample>

      <Sample title="Duration of animation">
        <ScaleYAnimation options={1000} launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </ScaleYAnimation>
      </Sample>

      <Sample title="Animation finish callbacks">
        <ScaleYAnimation
          onFinishEnterAnimation={() => showToast('success', 'enter')}
          onFinishExitAnimation={() => showToast('success', 'exit')}
          launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}
        >
          <div>Content</div>
        </ScaleYAnimation>
      </Sample>
    </article>
  )
}
