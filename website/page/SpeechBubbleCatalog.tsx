import { createRoot } from 'solid-js'
import { SpeechBubble } from '../../library/SpeechBubble'
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
      title: 'Tail width',
      children: (
        <>
          <SpeechBubble tailWidth="5px">Tail width</SpeechBubble>
          <SpeechBubble tailWidth="2em">Tail width</SpeechBubble>
          <SpeechBubble tailWidth="50%">Tail width</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail height',
      children: (
        <>
          <SpeechBubble tailHeight="5px">Tail height</SpeechBubble>
          <SpeechBubble tailHeight="1.2em">Tail height</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail offset',
      children: (
        <>
          <SpeechBubble tailOffsetPercent={80}>Tail offset</SpeechBubble>
          <SpeechBubble tailOffsetPercent={-30}>Tail offset</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail skew',
      children: (
        <>
          <SpeechBubble tailSkew="0.16turn">Tail skew</SpeechBubble>
          <SpeechBubble tailSkew="-45deg">Tail skew</SpeechBubble>
        </>
      ),
    },
  ],
}))
