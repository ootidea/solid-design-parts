import { createRoot } from 'solid-js'
import { IconButton } from '../../library'
import badIcon from '../images/bad.svg'
import chevronLeftIcon from '../images/chevron-left.svg'
import chevronRightIcon from '../images/chevron-right.svg'
import gitHubIcon from '../images/github.svg'
import goodIcon from '../images/good.svg'
import { Catalog } from './ComponentCatalogPage'

async function awaitSomeSeconds() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

export const IconButtonCatalog: Catalog = createRoot(() => ({
  samples: [
    {
      title: { default: 'Basic example', ja: '基本例' },
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} />
          <IconButton src={chevronRightIcon} />
        </>
      ),
    },
    {
      title: { default: 'Changing the icon color', ja: 'アイコン色を変更' },
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={goodIcon} iconColor="hsl(132 39% 63%)" />
          <IconButton src={badIcon} iconColor="#ea777a" />
        </>
      ),
    },
    {
      title: { default: 'Changing the background color', ja: '背景色を変更' },
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 90%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 80%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 50%)" iconColor="white" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 30%)" iconColor="white" />
          <IconButton
            src={chevronLeftIcon}
            backgroundColor="var(--solid-design-parts-primary-color)"
            iconColor="white"
          />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 90%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 80%)" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 40%)" iconColor="white" />
          <IconButton src={chevronLeftIcon} backgroundColor="hsl(20 80% 30%)" iconColor="white" />
        </>
      ),
    },
    {
      title: { default: 'Changing the button radius', ja: 'ボタンのradiusを変更' },
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} radius="0" backgroundColor="hsl(0 0% 90%)" />
          <IconButton src={chevronLeftIcon} radius="0.6em" backgroundColor="hsl(0 0% 90%)" />
        </>
      ),
    },
    {
      title: { default: 'Changing the button size', ja: 'ボタンのサイズを変更' },
      description: {
        default: (
          <>
            Setting the <code>size</code> will change both the button's width and height.
          </>
        ),
        ja: (
          <>
            <code>size</code>を設定するとボタンのwidthとheightの両方が変わります。
          </>
        ),
      },
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} size="40px" />
          <IconButton src={chevronRightIcon} size="1.5em" />
        </>
      ),
    },
    {
      title: { default: 'Changing the icon size', ja: 'アイコンのサイズを変更' },
      description: {
        default: (
          <>
            Setting the <code>iconSize</code> will change the size of the icon, but the size of the button will not
            change.
          </>
        ),
        ja: (
          <>
            <code>iconSize</code>を設定するとアイコンのサイズが変わります。ただしボタンのサイズは変わりません。
          </>
        ),
      },
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} iconSize="50%" />
          <IconButton src={chevronRightIcon} iconSize="100%" />
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
          <IconButton src={chevronLeftIcon} onClick={awaitSomeSeconds} />
          <IconButton src={chevronRightIcon} onClick={awaitSomeSeconds} />
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
          <IconButton src={gitHubIcon} href={`https://github.com/ootidea/solid-design-parts/`} />
        </>
      ),
    },
    {
      title: 'Rotate',
      direction: 'horizontal',
      children: (
        <>
          <IconButton src={chevronLeftIcon} rotate="90deg" />
          <IconButton src={chevronRightIcon} rotate="0.25turn" />
        </>
      ),
    },
  ],
}))
