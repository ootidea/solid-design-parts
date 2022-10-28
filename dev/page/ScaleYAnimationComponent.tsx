import { createSignal } from 'solid-js'
import { Button } from '../../src/Button'
import { ScaleYAnimation } from '../../src/ScaleYAnimation'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ScaleYAnimationComponent() {
  const [shown, setShown] = createSignal(true)

  return (
    <article>
      <PageTitle>ScaleYAnimation</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Button onClick={() => setShown(!shown())}>Toggle</Button>
        <ScaleYAnimation shown={shown()}>
          <span>Content</span>
        </ScaleYAnimation>
      </Sample>

      <Sample id="control-by-laucher" title="Control by launcher">
        <ScaleYAnimation launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </ScaleYAnimation>
      </Sample>

      <Sample id="duration-of-animation" title="Duration of animation">
        <ScaleYAnimation options={1000} launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}>
          <div>Content</div>
        </ScaleYAnimation>
      </Sample>

      <Sample id="on-finish-animation" title="onFinishAnimation">
        <ScaleYAnimation
          onFinishAnimation={(type) => console.log(type)}
          launcher={({ toggle }) => <Button onClick={toggle}>Toggle</Button>}
        >
          <div>Content</div>
        </ScaleYAnimation>
      </Sample>
    </article>
  )
}
