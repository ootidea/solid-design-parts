import { createRoot } from 'solid-js'
import { SpeechBubble } from '../../src/SpeechBubble'
import { Catalog } from './ComponentCatalogPage'

export const SpeechBubbleCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: 'Basic example',
      children: (
        <>
          <SpeechBubble>Sample</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Background color',
      children: (
        <>
          <SpeechBubble backgroundColor="hsl(0 100% 95%)">Sample</SpeechBubble>
          <SpeechBubble backgroundColor="#e9ffe9">Sample</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Radius',
      children: (
        <>
          <SpeechBubble radius="0">Sample</SpeechBubble>
          <SpeechBubble radius="10px">Sample</SpeechBubble>
          <SpeechBubble radius="999vh">Sample</SpeechBubble>
          <SpeechBubble radius="1em 0 1em 0">Sample</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Triangle height',
      children: (
        <>
          <SpeechBubble triangleHeight="0.5em">Triangle height</SpeechBubble>
          <SpeechBubble triangleHeight="1.4em">Triangle height</SpeechBubble>
          <SpeechBubble triangleHeight="3em">Triangle height</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Triangle angle',
      children: (
        <>
          <SpeechBubble triangleAngle="20deg">Triangle angle</SpeechBubble>
          <SpeechBubble triangleAngle="2rad">Triangle angle</SpeechBubble>
          <SpeechBubble triangleAngle="0.4turn">Triangle angle</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Triangle x-coordinate',
      children: (
        <>
          <SpeechBubble triangleX="20%">Triangle x-coordinate</SpeechBubble>
          <SpeechBubble triangleX="70%">Triangle x-coordinate</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Triangle skew',
      children: (
        <>
          <SpeechBubble triangleSkew="0.16turn">Triangle skew</SpeechBubble>
          <SpeechBubble triangleSkew="-45deg">Triangle skew</SpeechBubble>
        </>
      ),
    },
  ],
}))
