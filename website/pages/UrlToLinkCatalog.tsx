import { createRoot } from 'solid-js'
import { UrlToLink } from '../../library'
import { Catalog } from './ComponentCatalogPage'

const text = `https://lp.example.com/pc/001.php?waad=aBcDXxXx&utm_medium=cpc#description contains fragment(hash).
whatsapp://send?text=Hello+World
[Qiita](http://qiita.com)

Domain is not a link: google.com
file:///C:/something.txt`

export const UrlToLinkCatalog: Catalog = createRoot(() => ({
  introduction: (
    <>
      <code>UrlToLink</code> is a component that replaces URLs within content with clickable links.
    </>
  ),
  samples: [{ title: { default: 'Basic example', ja: '基本例' }, children: <UrlToLink>{text}</UrlToLink> }],
}))
