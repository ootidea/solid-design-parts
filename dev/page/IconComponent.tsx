import { Icon } from '../../src/Icon'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import chevronLeftIcon from './chevron-left.svg'

export function IconComponent() {
  return (
    <article>
      <PageTitle>Icon</PageTitle>

      <Sample id="basic-example" title="Basic example" direction="horizontal">
        <Icon src={chevronLeftIcon} />
      </Sample>

      <Sample id="size" title="Size" direction="horizontal">
        <Icon src={chevronLeftIcon} size="1em" />
        <Icon src={chevronLeftIcon} size="2rem" />
        <Icon src={chevronLeftIcon} size="40px" />
      </Sample>

      <Sample id="color" title="Color" direction="horizontal">
        <Icon src={chevronLeftIcon} color="red" />
        <Icon src={chevronLeftIcon} color="green" />
      </Sample>

      <Sample id="rotate" title="Rotate" direction="horizontal">
        <Icon src={chevronLeftIcon} rotate="90deg" />
        <Icon src={chevronLeftIcon} rotate="-0.25turn" />
      </Sample>
    </article>
  )
}
