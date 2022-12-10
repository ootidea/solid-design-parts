import { UrlToLink } from '../../src/UrlToLink'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function UrlToLinkComponent() {
  const text = `https://lp.example.com/pc/001.php?waad=aBcDXxXx&utm_medium=cpc#description contains fragment(hash).
whatsapp://send?text=Hello+World
[Qiita](http://qiita.com)

Domain is not a link: google.com
file:///C:/something.txt`

  return (
    <article>
      <PageTitle>UrlToLink</PageTitle>

      <Sample title="Basic example">
        <UrlToLink>{text}</UrlToLink>
      </Sample>
    </article>
  )
}
