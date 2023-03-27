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
          <SpeechBubble radius="999vh">Sample</SpeechBubble>
          <SpeechBubble radius="8px 0 8px 0">Sample</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Triangle width',
      children: (
        <>
          <SpeechBubble triangleWidth="5px">Triangle width</SpeechBubble>
          <SpeechBubble triangleWidth="2em">Triangle width</SpeechBubble>
          <SpeechBubble triangleWidth="50%">Triangle width</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Triangle height',
      children: (
        <>
          <SpeechBubble triangleHeight="5px">Triangle height</SpeechBubble>
          <SpeechBubble triangleHeight="1.2em">Triangle height</SpeechBubble>
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
