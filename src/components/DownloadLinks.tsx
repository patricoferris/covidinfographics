import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
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
import CSS from 'csstype'
import Share from './Share'
import { capitaliseFirstLetter, removeUnderscores } from '../utils/strings'
import { Link } from '..main/index'

interface Node {
  ext: string
  name: string
  relativeDirectory: string
  relativePath: string
  publicURL: string
}

interface Edge {
  node: Node
}

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'black',
    textDecoraction: 'none',
  },
  download: {
    color: theme.palette.primary.main,
  },
}))

const DownloadLinks: React.SFC<{ links: Link[]; style?: CSS.Properties }> = ({ links }) => {
  const classes = useStyles()
  // Filter out anything that isn't images
  const { locale } = React.useContext(LocaleContext)

  const data = {}

  let topics = ['covid19', 'school_advice']
  topics.map((topic) => {
    const ls = links.filter((img) => {
      return img.node.relativeDirectory === `${locale}/${topic}`
    })
    data[topic] = ls
  })

  Object.keys(data).map((topic) => {
    if (data[topic].length === 0) {
      delete data[topic]
    }
  })

  topics = Object.keys(data)

  return (
    <Accordion
      names={topics.map((topic) => capitaliseFirstLetter(removeUnderscores(topic, ' ')))}
      items={topics.map((topic) => {
        return (
          <List key={topic} style={{ width: '100%' }}>
            <Divider />
            {data[topic].map((img) => {
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
                      <IconButton edge="end" aria-label="dowload">
                        <Share url={publicURL} />
                      </IconButton>
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
