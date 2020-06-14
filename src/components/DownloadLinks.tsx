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

interface Node {
  ext: string
  name: string
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

const topics = ['covid19']

const DownloadLinks: React.SFC<{ style?: CSS.Properties }> = () => {
  const classes = useStyles()
  const {
    rawData: { edges },
  }: { rawData: { edges: Edge[] } } = useStaticQuery(
    graphql`
      query {
        rawData: allFile(filter: { sourceInstanceName: { eq: "infographics" } }) {
          edges {
            node {
              ext
              name
              relativePath
              publicURL
            }
          }
        }
      }
    `
  )

  // Filter out anything that isn't images
  const filter: Edge[] = edges.filter((edge) => edge.node.ext === '.png')
  const { locale } = React.useContext(LocaleContext)

  // Extract the nodes based on them being a part of the right locale
  const infographics: Node[] = filter
    .filter((info) => info.node.relativePath.split('/')[0] === locale)
    .map((info) => info.node)

  return (
    <Accordion
      names={topics}
      items={topics.map((topic) => {
        return (
          <List key={topic} style={{ width: '100%' }}>
            <Divider />
            {infographics.map((node) => {
              const { publicURL, name } = node
              return (
                <>
                  <ListItem
                    key={publicURL}
                    button
                    onClick={() => (window.location.href = publicURL)}
                  >
                    <ListItemText
                      className={classes.download}
                      primary={name.split('_').reduce((a, b) => a + ' ' + b)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <a className={classes.link} href={publicURL} download>
                          <CloudDownload />
                        </a>
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
