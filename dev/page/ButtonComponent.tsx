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

      <Sample id="basic-example" title="Basic example" direction="horizontal">
        <Button>Button</Button>
        <Button ghost>accept</Button>
        <Button rounded>cancel</Button>
        <Button ghost rounded>
          OK
        </Button>
      </Sample>

      <Sample id="achromatic-color" title="Achromatic color" direction="horizontal">
        <Button color="achromatic">Button</Button>
        <Button color="achromatic" ghost>
          accept
        </Button>
        <Button color="achromatic" rounded>
          cancel
        </Button>
        <Button color="achromatic" ghost rounded>
          OK
        </Button>
      </Sample>

      <Sample id="error-color" title="Error color" direction="horizontal">
        <Button color="error">Button</Button>
        <Button color="error" ghost>
          accept
        </Button>
        <Button color="error" rounded>
          cancel
        </Button>
        <Button color="error" ghost rounded>
          OK
        </Button>
      </Sample>

      <Sample id="ghost" title="Ghost" direction="horizontal">
        <Button ghost>Button</Button>
        <Button ghost color="achromatic">
          accept
        </Button>
        <Button ghost color="error">
          delete
        </Button>
        <Button ghost rounded>
          cancel
        </Button>
        <Button ghost color="achromatic" rounded>
          OK
        </Button>
        <Button ghost color="error" rounded>
          close
        </Button>
      </Sample>

      <Sample id="promise" title="Rounded" direction="horizontal">
        <Button rounded>Button</Button>
        <Button rounded color="achromatic">
          accept
        </Button>
        <Button rounded ghost>
          cancel
        </Button>
        <Button rounded color="achromatic" ghost>
          OK
        </Button>
      </Sample>

      <Sample id="href" title="Specify href" direction="horizontal">
        <Button href="https://google.com" rounded>
          Google
        </Button>
        <Button href="https://google.com" color="achromatic" ghost>
          Google
        </Button>
      </Sample>

      <Sample id="disabled" title="Disabled" direction="horizontal">
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

      <Sample id="with-icon" title="Button with icon">
        <Button>
          <Icon style="margin-right: 0.2em;" src={calendarIcon} color="currentColor" size="1.2em" />
          Reserve
        </Button>
      </Sample>

      <Sample id="promise" title="onClick function that returns a Promise" direction="horizontal">
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

      <Sample id="full-width" title="Full width" description="Option to be a block element.">
        <Button fullWidth>Button</Button>
        <Button fullWidth ghost>
          accept
        </Button>
        <Button fullWidth color="achromatic" rounded>
          cancel
        </Button>
        <Button fullWidth color="achromatic" ghost rounded>
          OK
        </Button>
      </Sample>
    </article>
  )
}
