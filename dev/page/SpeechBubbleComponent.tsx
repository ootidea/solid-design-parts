import { SpeechBubble } from '../../src/SpeechBubble'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function SpeechBubbleComponent() {
  return (
    <article>
      <PageTitle>SpeechBubble</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <SpeechBubble>Sample</SpeechBubble>
      </Sample>

      <Sample id="triangle-height" title="Customize triangle height">
        <SpeechBubble triangleHeight="0.5em">Customize triangle height</SpeechBubble>
        <SpeechBubble triangleHeight="1.4em">Customize triangle height</SpeechBubble>
        <SpeechBubble triangleHeight="3em">Customize triangle height</SpeechBubble>
      </Sample>

      <Sample id="triangle-angle" title="Customize triangle angle">
        <SpeechBubble triangleAngle="20deg">Customize triangle angle</SpeechBubble>
        <SpeechBubble triangleAngle="2rad">Customize triangle angle</SpeechBubble>
        <SpeechBubble triangleAngle="150deg">Customize triangle angle</SpeechBubble>
      </Sample>
    </article>
  )
}
