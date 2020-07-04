import React from 'react'
import { Button, Input, TextField } from '@material-ui/core'

const Form: React.SFC = () => {
  return (
    <form
      style={{ marginTop: '20px' }}
      name="contact"
      method="post"
      action="/contact/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input type="hidden" name="form-name" value="contact" />
      <div hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </div>
      <TextField className="field" id="outlined-multiline-static" label="Name" variant="outlined" />
      <TextField
        className="field"
        id="outlined-multiline-static"
        label="Email"
        variant="outlined"
      />
      <TextField
        className="field"
        id="outlined-multiline-static"
        label="Message"
        multiline
        rows={4}
        variant="outlined"
      />
      <div className="field">
        <Button variant="contained" color="secondary" type="submit">
          Send
        </Button>
      </div>
    </form>
  )
}

export default Form
