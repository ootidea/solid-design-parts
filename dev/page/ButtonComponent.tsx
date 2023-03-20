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

      <Sample title="Basic examples" direction="horizontal">
        <Button>Button</Button>
        <Button color="achromatic">Button</Button>
        <Button color="error">Button</Button>
      </Sample>

      <Sample title="Ghost buttons" direction="horizontal">
        <Button.ghost>Button</Button.ghost>
        <Button.ghost color="achromatic">accept</Button.ghost>
        <Button.ghost color="error">delete</Button.ghost>
      </Sample>

      <Sample title="Specify href" direction="horizontal">
        <Button href="https://google.com">Google</Button>
        <Button.ghost href="https://google.com" color="achromatic">
          Google
        </Button.ghost>
      </Sample>

      <Sample title="Disabled" direction="horizontal">
        <Button disabled>Button</Button>
        <Button href="./confirm" color="achromatic" disabled>
          accept
        </Button>
        <Button.ghost disabled>cancel</Button.ghost>
        <Button.ghost color="error" disabled>
          delete
        </Button.ghost>
      </Sample>

      <Sample title="Button with icon">
        <Button>
          <Icon style="margin-right: 0.2em;" src={calendarIcon} color="currentColor" size="1.2em" />
          Reserve
        </Button>
      </Sample>

      <Sample title="onClick function that returns a Promise" direction="horizontal">
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
      </Sample>

      <Sample title="Full width" description="Option to be a block element.">
        <Button fullWidth>Button</Button>
        <Button.ghost fullWidth>accept</Button.ghost>
      </Sample>

      <Sample title="Radius" direction="horizontal">
        <Button radius="0">Button</Button>
        <Button.ghost radius="999vh">cancel</Button.ghost>
        <Button radius="1em" color="achromatic">
          OK
        </Button>
        <Button.ghost radius="50%" color="achromatic">
          previous
        </Button.ghost>
      </Sample>
    </article>
  )
}
