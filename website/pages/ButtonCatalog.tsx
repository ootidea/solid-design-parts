import { createRoot } from 'solid-js'
import { Button, Icon } from '../../library'
import calendarIcon from '../images/calendar.svg'
import { Catalog } from './ComponentCatalogPage'

async function awaitSomeSeconds() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

export const ButtonCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic examples', ja: '基本例' },
      direction: 'horizontal',
      children: (
        <>
          <Button>Button</Button>
          <Button color="achromatic">Button</Button>
          <Button color="error">Button</Button>
        </>
      ),
    },
    {
      title: { default: 'Ghost buttons', ja: 'ゴーストボタン' },
      direction: 'horizontal',
      children: (
        <>
          <Button.ghost>Button</Button.ghost>
          <Button.ghost color="achromatic">accept</Button.ghost>
          <Button.ghost color="error">delete</Button.ghost>
        </>
      ),
    },
    {
      title: { default: 'Link buttons', ja: 'リンクボタン' },
      description: {
        default: (
          <>
            When the <code>href</code> is set, it becomes <code>&lt;a&gt;</code>-based instead of{' '}
            <code>&lt;button&gt;</code>-based.
          </>
        ),
        ja: (
          <>
            <code>href</code>を設定するとbutton要素ベースではなくa要素ベースになります。
          </>
        ),
      },
      direction: 'horizontal',
      children: (
        <>
          <Button href="https://google.com">Google</Button>
          <Button.ghost href="https://google.com" color="achromatic">
            Google
          </Button.ghost>
        </>
      ),
    },
    {
      title: 'Disabled',
      direction: 'horizontal',
      children: (
        <>
          <Button disabled>Button</Button>
          <Button href="./confirm" color="achromatic" disabled>
            accept
          </Button>
          <Button.ghost disabled>cancel</Button.ghost>
          <Button.ghost color="error" disabled>
            delete
          </Button.ghost>
        </>
      ),
    },
    {
      title: { default: 'Button with icon', ja: 'アイコン付きボタン' },
      direction: 'horizontal',
      children: (
        <>
          <Button>
            <Icon style="margin-right: 0.2em;" src={calendarIcon} color="currentColor" size="1.2em" />
            Reserve
          </Button>
        </>
      ),
    },
    {
      title: { default: 'Async onClick handlers', ja: '非同期onClickハンドラ' },
      description: {
        default: (
          <>
            If the <code>onClick</code> handler returns a <code>Promise</code>, the button will be disabled and show a{' '}
            <code>Spinner</code> until the <code>Promise</code> is resolved.
          </>
        ),
        ja: (
          <>
            <code>onClick</code>ハンドラが<code>Promise</code>を返した場合、それが完了するまでボタンはdisabledになり、
            <code>Spinner</code>が表示されます。
          </>
        ),
      },
      direction: 'horizontal',
      children: (
        <>
          <Button onClick={awaitSomeSeconds}>Submit</Button>
          <Button.ghost onClick={awaitSomeSeconds}>Send</Button.ghost>
          <Button color="achromatic" onClick={awaitSomeSeconds}>
            Save
          </Button>
          <Button.ghost color="achromatic" onClick={awaitSomeSeconds}>
            Purchase
          </Button.ghost>
          <Button color="error" onClick={awaitSomeSeconds}>
            Delete
          </Button>
          <Button.ghost color="error" onClick={awaitSomeSeconds}>
            Post
          </Button.ghost>
        </>
      ),
    },
    {
      title: 'Full width',
      description: 'Option to be a block element.',
      children: (
        <>
          <Button fullWidth>Button</Button>
          <Button.ghost fullWidth>accept</Button.ghost>
        </>
      ),
    },
    {
      title: { default: 'Changing the radius', ja: 'radiusを変更' },
      direction: 'horizontal',
      children: (
        <>
          <Button radius="0">Button</Button>
          <Button.ghost radius="999vh">cancel</Button.ghost>
          <Button radius="1em" color="achromatic">
            OK
          </Button>
          <Button.ghost radius="50%" color="achromatic">
            previous
          </Button.ghost>
        </>
      ),
    },
  ],
}))
