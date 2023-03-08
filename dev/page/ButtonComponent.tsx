import { Button } from '../../src/Button'
import { Icon } from '../../src/Icon'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import calendarIcon from './calendar.svg'

export function ButtonComponent() {
  async function awaitSomeSeconds() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  return (
    <article>
      <PageTitle>Button</PageTitle>

      <Sample title="Basic example" direction="horizontal">
        <Button>Button</Button>
        <Button variant="ghost">accept</Button>
      </Sample>

      <Sample title="Achromatic color" direction="horizontal">
        <Button color="achromatic">Button</Button>
        <Button variant="ghost" color="achromatic">
          accept
        </Button>
      </Sample>

      <Sample title="Error color" direction="horizontal">
        <Button color="error">Button</Button>
        <Button variant="ghost" color="error">
          accept
        </Button>
      </Sample>

      <Sample title="Ghost" direction="horizontal">
        <Button variant="ghost">Button</Button>
        <Button variant="ghost" color="achromatic">
          accept
        </Button>
        <Button variant="ghost" color="error">
          delete
        </Button>
      </Sample>

      <Sample title="Specify href" direction="horizontal">
        <Button href="https://google.com">Google</Button>
        <Button href="https://google.com" variant="ghost" color="achromatic">
          Google
        </Button>
      </Sample>

      <Sample title="Disabled" direction="horizontal">
        <Button disabled>Button</Button>
        <Button href="./confirm" color="achromatic" disabled>
          accept
        </Button>
        <Button variant="ghost" disabled>
          cancel
        </Button>
        <Button variant="ghost" color="achromatic" disabled>
          OK
        </Button>
      </Sample>

      <Sample title="Button with icon">
        <Button>
          <Icon style="margin-right: 0.2em;" src={calendarIcon} color="currentColor" size="1.2em" />
          Reserve
        </Button>
      </Sample>

      <Sample title="onClick function that returns a Promise" direction="horizontal">
        <Button onClick={awaitSomeSeconds}>Submit</Button>
        <Button variant="ghost" onClick={awaitSomeSeconds}>
          Send
        </Button>
        <Button color="achromatic" onClick={awaitSomeSeconds}>
          Save
        </Button>
        <Button variant="ghost" color="achromatic" onClick={awaitSomeSeconds}>
          Purchase
        </Button>
      </Sample>

      <Sample title="Full width" description="Option to be a block element.">
        <Button fullWidth>Button</Button>
        <Button fullWidth variant="ghost">
          accept
        </Button>
      </Sample>

      <Sample title="Radius" direction="horizontal">
        <Button radius="0">Button</Button>
        <Button radius="999vh" variant="ghost">
          cancel
        </Button>
        <Button radius="1em" color="achromatic">
          OK
        </Button>
        <Button radius="50%" variant="ghost" color="achromatic">
          previous
        </Button>
      </Sample>
    </article>
  )
}
