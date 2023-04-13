import { createRoot } from 'solid-js'
import { UrlToLink } from '../../library/UrlToLink'
import { Catalog } from './ComponentCatalogPage'

const text = `https://lp.example.com/pc/001.php?waad=aBcDXxXx&utm_medium=cpc#description contains fragment(hash).
whatsapp://send?text=Hello+World
[Qiita](http://qiita.com)

Domain is not a link: google.com
file:///C:/something.txt`

export const UrlToLinkCatalog: Catalog = createRoot(() => ({
  samples: [{ title: 'Basic example', children: <UrlToLink>{text}</UrlToLink> }],
}))
