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
          <SpeechBubble backgroundColor="hsl(0 100% 95%)">Background color: hsl(0 100% 95%)</SpeechBubble>
          <SpeechBubble backgroundColor="#e9ffe9">Background color: #e9ffe9</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Radius',
      children: (
        <>
          <SpeechBubble radius="0">Radius: 0</SpeechBubble>
          <SpeechBubble radius="999vh">Radius: 999vh</SpeechBubble>
          <SpeechBubble radius="8px 0 8px 0">Radius: 8px 0 8px 0</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail width',
      children: (
        <>
          <SpeechBubble tailWidth="5px">Tail width: 5px</SpeechBubble>
          <SpeechBubble tailWidth="2em">Tail width: 2em</SpeechBubble>
          <SpeechBubble tailWidth="50%">Tail width: 50%</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail height',
      children: (
        <>
          <SpeechBubble tailHeight="5px">Tail height: 5px</SpeechBubble>
          <SpeechBubble tailHeight="1.2em">Tail height: 1.2em</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail offset',
      children: (
        <>
          <SpeechBubble tailOffsetPercent={80}>Tail offset: 80%</SpeechBubble>
          <SpeechBubble tailOffsetPercent={-30}>Tail offset: -30%</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail skew',
      children: (
        <>
          <SpeechBubble tailSkew="0.16turn">Tail skew: 0.16turn</SpeechBubble>
          <SpeechBubble tailSkew="-45deg">Tail skew: -45deg</SpeechBubble>
        </>
      ),
    },
  ],
}))
