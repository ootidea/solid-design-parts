import { SpeechBubble } from '../../src/SpeechBubble'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function SpeechBubbleComponent() {
  return (
    <article>
      <PageTitle>SpeechBubble</PageTitle>

      <Sample title="Basic example">
        <SpeechBubble>Sample</SpeechBubble>
      </Sample>

      <Sample title="Background color">
        <SpeechBubble backgroundColor="hsl(0 100% 95%)">Sample</SpeechBubble>
        <SpeechBubble backgroundColor="#e9ffe9">Sample</SpeechBubble>
      </Sample>

      <Sample title="Border color">
        <SpeechBubble borderColor="hsl(0 100% 40%)">Sample</SpeechBubble>
      </Sample>

      <Sample title="Customize triangle height">
        <SpeechBubble triangleHeight="0.5em">Customize triangle height</SpeechBubble>
        <SpeechBubble triangleHeight="1.4em">Customize triangle height</SpeechBubble>
        <SpeechBubble triangleHeight="3em">Customize triangle height</SpeechBubble>
      </Sample>

      <Sample title="Customize triangle angle">
        <SpeechBubble triangleAngle="20deg">Customize triangle angle</SpeechBubble>
        <SpeechBubble triangleAngle="2rad">Customize triangle angle</SpeechBubble>
        <SpeechBubble triangleAngle="150deg">Customize triangle angle</SpeechBubble>
      </Sample>
    </article>
  )
}
