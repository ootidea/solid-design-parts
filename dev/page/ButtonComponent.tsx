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
        <Button ghost>accept</Button>
      </Sample>

      <Sample title="Achromatic color" direction="horizontal">
        <Button color="achromatic">Button</Button>
        <Button color="achromatic" ghost>
          accept
        </Button>
      </Sample>

      <Sample title="Error color" direction="horizontal">
        <Button color="error">Button</Button>
        <Button color="error" ghost>
          accept
        </Button>
      </Sample>

      <Sample title="Ghost" direction="horizontal">
        <Button ghost>Button</Button>
        <Button ghost color="achromatic">
          accept
        </Button>
        <Button ghost color="error">
          delete
        </Button>
      </Sample>

      <Sample title="Specify href" direction="horizontal">
        <Button href="https://google.com">Google</Button>
        <Button href="https://google.com" color="achromatic" ghost>
          Google
        </Button>
      </Sample>

      <Sample title="Disabled" direction="horizontal">
        <Button disabled>Button</Button>
        <Button href="./confirm" color="achromatic" disabled>
          accept
        </Button>
        <Button ghost disabled>
          cancel
        </Button>
        <Button color="achromatic" ghost disabled>
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
        <Button ghost onClick={awaitSomeSeconds}>
          Send
        </Button>
        <Button color="achromatic" onClick={awaitSomeSeconds}>
          Save
        </Button>
        <Button color="achromatic" ghost onClick={awaitSomeSeconds}>
          Purchase
        </Button>
      </Sample>

      <Sample title="Full width" description="Option to be a block element.">
        <Button fullWidth>Button</Button>
        <Button fullWidth ghost>
          accept
        </Button>
      </Sample>

      <Sample title="Radius" direction="horizontal">
        <Button radius="0">Button</Button>
        <Button radius="9999px" ghost>
          cancel
        </Button>
        <Button radius="1em" color="achromatic">
          OK
        </Button>
        <Button radius="50%" color="achromatic" ghost>
          previous
        </Button>
      </Sample>
    </article>
  )
}
