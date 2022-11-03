import { Icon } from '../../src/Icon'
import { IconButton } from '../../src/IconButton'
import { TitleBarLayout } from '../../src/TitleBarLayout'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import chevronLeftIcon from './chevron-left.svg'
import chevronRightIcon from './chevron-right.svg'

export function TitleBarLayoutComponent() {
  return (
    <article>
      <PageTitle>TitleBarLayout</PageTitle>

      <Sample title="Basic example">
        <TitleBarLayout right={<IconButton src={chevronRightIcon} iconSize="100%" />}>Sample title</TitleBarLayout>
        <TitleBarLayout left={<IconButton src={chevronLeftIcon} iconSize="100%" />}>Sample title</TitleBarLayout>
        <TitleBarLayout
          left={<IconButton src={chevronLeftIcon} iconSize="100%" />}
          right={<IconButton src={chevronRightIcon} iconSize="100%" />}
        >
          Sample title
        </TitleBarLayout>
      </Sample>

      <Sample title="Multiple children" description="Children in any slot are arranged horizontally.">
        <TitleBarLayout
          right={
            <>
              Next
              <Icon src={chevronRightIcon} />
            </>
          }
        >
          April
        </TitleBarLayout>
      </Sample>
    </article>
  )
}
