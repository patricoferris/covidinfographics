import React from 'react'
import { LocaleContext } from './Layout'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import CloudDownload from '@material-ui/icons/CloudDownload'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Accordion from './Accordion'
import Share from './Share'
import { capitaliseFirstLetter, removeUnderscores } from '../utils/strings'
import { Link } from '../main/index'

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'black',
    textDecoraction: 'none',
  },
  download: {
    color: 'black',
  },
}))

interface DownloadProps {
  data: {
    topic: string
    links: Link[]
  }
}

const DownloadLinks: React.SFC<DownloadProps> = ({ data: { topic, links } }) => {
  const classes = useStyles()
  const { locale } = React.useContext(LocaleContext)

  let subTopics = links.map((link) => {
    return link.node.relativePath.split('/')[2]
  })

  subTopics = subTopics.filter((v, i) => subTopics.indexOf(v) === i)

  const data = {}

  subTopics.map((sub) => {
    const ls = links.filter((img) => {
      return img.node.relativeDirectory === `${locale}/${topic}/${sub}`
    })
    data[sub] = ls
  })

  return (
    <Accordion
      names={subTopics.map((sub) => capitaliseFirstLetter(removeUnderscores(sub, ' ')))}
      items={subTopics.map((sub) => {
        return (
          <List key={sub} style={{ width: '100%', overflow: 'auto' }}>
            <Divider />
            {data[sub].map((img, idx) => {
              const { publicURL, name } = img.node
              return (
                <>
                  <ListItem
                    key={publicURL}
                    button
                    onClick={() => (window.location.href = publicURL)}
                  >
                    <ListItemText
                      className={classes.download}
                      primary={capitaliseFirstLetter(removeUnderscores(name, ' '))}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="dowload">
                        <a className={classes.link} href={publicURL} download>
                          <CloudDownload />
                        </a>
                      </IconButton>
                      <Share url={publicURL} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </>
              )
            })}
          </List>
        )
      })}
    />
  )
}

export default DownloadLinks
