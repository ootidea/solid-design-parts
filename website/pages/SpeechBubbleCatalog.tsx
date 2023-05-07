import { createRoot } from 'solid-js'
import { SpeechBubble } from '../../library'
import { Catalog } from './ComponentCatalogPage'

export const SpeechBubbleCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      children: (
        <>
          <SpeechBubble>
            <div style={{ padding: '0.5em' }}>Sample</div>
          </SpeechBubble>
        </>
      ),
    },
    {
      title: 'Padding',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em">Sample</SpeechBubble>
        </>
      ),
    },
    {
      title: 'Background color',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em" backgroundColor="hsl(0 100% 95%)">
            Background color: hsl(0 100% 95%)
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" backgroundColor="#e9ffe9">
            Background color: #e9ffe9
          </SpeechBubble>
        </>
      ),
    },
    {
      title: 'Radius',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em" radius="0">
            Radius: 0
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" radius="999vh">
            Radius: 999vh
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" radius="8px 0 8px 0">
            Radius: 8px 0 8px 0
          </SpeechBubble>
        </>
      ),
    },
    {
      title: 'Direction',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em" direction="up">
            Direction: up
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" direction="left">
            Direction: left
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" direction="right">
            Direction: right
          </SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail width',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em" tailWidth="5px">
            Tail width: 5px
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" tailWidth="2em">
            Tail width: 2em
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" tailWidth="50%">
            Tail width: 50%
          </SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail height',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em" tailHeight="5px">
            Tail height: 5px
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" tailHeight="1.2em">
            Tail height: 1.2em
          </SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail offset',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em" tailOffsetPercent={10}>
            Tail offset: 10%
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" tailOffsetPercent={75}>
            Tail offset: 75%
          </SpeechBubble>
        </>
      ),
    },
    {
      title: 'Tail skew',
      children: (
        <>
          <SpeechBubble padding="0.3em 0.6em" tailSkew="0.16turn">
            Tail skew: 0.16turn
          </SpeechBubble>
          <SpeechBubble padding="0.3em 0.6em" tailSkew="-45deg">
            Tail skew: -45deg
          </SpeechBubble>
        </>
      ),
    },
  ],
}))
