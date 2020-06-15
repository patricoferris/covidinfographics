import React from 'react'
import { Popover, List, ListItem, IconButton } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'

interface ShareProps {
  url: string
}

const domain = 'https://c19info-test.netlify.app/'

const generateFbPost = (url: string): string => {
  const main = 'https://facebook.com/sharer/sharer.php?u='
  return main + domain + url
}

const generateTweet = (url: string): string => {
  const main = 'https://twitter.com/intent/tweet/?text=COVID-19%20information%20in%20English&url='
  return main + domain + url
}

const generateEmail = (url: string): string => {
  const main = 'mailto:?subject=COVID-19%20information%20in%20English&body='
  return main + domain + url
}

const Share: React.SFC<ShareProps> = ({ url }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <IconButton id="popover-anchor" aria-describedby={id} onClick={handleClick}>
        <ShareIcon />
      </IconButton>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItem component="a" href={generateFbPost(url)} button>
            Facebook
          </ListItem>
          <ListItem component="a" href={generateTweet(url)} button>
            Twitter
          </ListItem>
          <ListItem component="a" href={generateEmail(url)} button>
            Email
          </ListItem>
        </List>
      </Popover>
    </div>
  )
}

export default Share
