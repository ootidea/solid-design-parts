import { IconButton } from '../../src/IconButton'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import chevronLeftIcon from './chevron-left.svg'
import chevronRightIcon from './chevron-right.svg'

export function IconButtonComponent() {
  async function awaitSomeSeconds() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  return (
    <article>
      <PageTitle>IconButton</PageTitle>

      <Sample title="Basic example" direction="horizontal">
        <IconButton src={chevronLeftIcon} />
        <IconButton src={chevronRightIcon} />
      </Sample>

      <Sample title="Icon color" direction="horizontal">
        <IconButton src={chevronLeftIcon} iconColor="#F05A4D" />
        <IconButton src={chevronRightIcon} iconColor="hsl(180, 60%, 40%)" />
      </Sample>

      <Sample title="Background color" direction="horizontal">
        <IconButton src={chevronLeftIcon} backgroundColor="hsl(0 0% 90%)" />
        <IconButton src={chevronRightIcon} backgroundColor="hsl(0 0% 90%)" />
        <IconButton src={chevronLeftIcon} backgroundColor="hsl(200 100% 93%)" />
        <IconButton src={chevronRightIcon} backgroundColor="hsl(200 100% 93%)" />
        <IconButton src={chevronLeftIcon} backgroundColor="hsl(200 100% 40%)" iconColor="white" />
        <IconButton src={chevronRightIcon} backgroundColor="hsl(200 100% 40%)" iconColor="white" />
      </Sample>

      <Sample title="Button size" direction="horizontal">
        <IconButton src={chevronLeftIcon} size="40px" />
        <IconButton src={chevronRightIcon} size="1.5em" />
      </Sample>

      <Sample title="Icon size (without button size)" direction="horizontal">
        <IconButton src={chevronLeftIcon} iconSize="50%" />
        <IconButton src={chevronRightIcon} iconSize="100%" />
      </Sample>

      <Sample title="onClick function that returns a Promise" direction="horizontal">
        <IconButton src={chevronLeftIcon} onClick={awaitSomeSeconds} />
        <IconButton src={chevronRightIcon} onClick={awaitSomeSeconds} />
      </Sample>

      <Sample title="Rotate" direction="horizontal">
        <IconButton src={chevronLeftIcon} rotate="90deg" />
        <IconButton src={chevronRightIcon} rotate="0.25turn" />
      </Sample>
    </article>
  )
}
