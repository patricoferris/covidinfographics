import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleContext } from "./Layout"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { makeStyles } from '@material-ui/core/styles'
import Accordion from "./Accordion";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    textDecoraction: "none"
  }
}));

const topics = ["covid19"]

const DownloadLinks = () => {
  const classes = useStyles();
  const { rawData : { edges } } = useStaticQuery(
    graphql`
      query {
        rawData: allFile(filter: {sourceInstanceName: {eq: "infographics"}}) {
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

  const filter = edges.filter(edge => edge.node.ext === ".png")
  const { locale } = React.useContext(LocaleContext)
  const infographics = 
    filter.filter(info => info.node.relativePath.split("/")[0] === locale).map(info => info.node)
  return (
    <Accordion names={topics} items={
      topics.map(topic => {
        return (
          <List style={{width: "100%"}}>
            {infographics.map(node => {
              const { publicURL, name } = node
              return (
                <ListItem key={publicURL} button onClick={() => window.location = publicURL}>
                  <ListItemText primary={name.split("_").reduce((a, b) => a + " " + b)}/>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <a className={classes.link} href={publicURL} download>
                        <CloudDownload />
                      </a>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
        </List>
        )
      })
    }/>
  )
}

export default DownloadLinks