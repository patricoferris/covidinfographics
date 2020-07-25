import React from 'react'
import { Layout } from '../components/Layout'
import { Typography, Grid } from '@material-ui/core'
import localised from '../utils/text'
import Form from '../components/Form'

type ContactContent = Record<string, unknown>

interface ContactProps {
  pageContext: {
    local: ContactContent
    english: ContactContent
  }
}

const Contact: React.SFC<ContactProps> = ({ pageContext: { local, english } }) => (
  <Layout>
    <div className="global-wrapper">
      <Grid container spacing={3}>
        <Grid item sm={false} md={1} />
        <Grid item sm={12} md={10} spacing={3}>
          <Typography variant="h5">{localised(local, english, 'title')}</Typography>
          <Form />
        </Grid>
      </Grid>
    </div>
  </Layout>
)

export default Contact
