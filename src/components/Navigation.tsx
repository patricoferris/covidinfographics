// Much of this code comes from https://material-ui.com/components/drawers/

import React from 'react'
import LocalizedLink from './LocalizedLink'
import Selector from './Selector'
import locales from '../../config/i18n'
import useTranslations, { Translations } from '../utils/useTranslations'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import clsx from 'clsx'
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  IconButton,
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  Grid,
  Hidden,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import localizeText from '../utils/localizeText'

interface NavigationProps {
  title: string
  pages: string[]
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  navContainer: {
    padding: '0px',
    color: 'black',
  },
  navButton: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'black',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    boxShadow: 'none',
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
  navDrawerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'black',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    boxShadow: 'none',
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

type PureNavigationProps = NavigationProps & { ts: Translations }

export const PureNavigation: React.SFC<PureNavigationProps> = ({ title, pages, ts }) => {
  const classes = useStyles()
  const theme: Theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(open)
  }

  return (
    <div>
      <AppBar
        position="static"
        elevation={3}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={5}>
              <LocalizedLink to={`/`}>
                <Hidden smDown>
                  <Typography variant="h6" noWrap>
                    {title}
                  </Typography>
                </Hidden>
                <Hidden mdUp>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap>
                      CHIP
                    </Typography>
                    <Selector languages={Object.keys(locales).map((locale) => locales[locale])} />
                  </div>
                </Hidden>
              </LocalizedLink>
            </Grid>
            <Hidden smDown>
              <Grid item md={7}>
                <List className={classes.flexContainer}>
                  <ListItem className={classes.navContainer}>
                    <Selector languages={Object.keys(locales).map((locale) => locales[locale])} />
                  </ListItem>
                  {pages.map((page) => (
                    <ListItem className={classes.navContainer} key={page} button>
                      <LocalizedLink
                        className={classes.navButton}
                        to={`/${page !== 'home' ? page : ''}`}
                      >
                        {localizeText({ translations: ts, category: 'pages', id: page })}
                      </LocalizedLink>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <SwipeableDrawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleDrawer(false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {pages.map((page) => (
              <ListItem className={classes.navContainer} key={page} button>
                <LocalizedLink
                  className={classes.navDrawerButton}
                  to={`/${page !== 'home' ? page : ''}`}
                >
                  {localizeText({ translations: ts, category: 'pages', id: page })}
                </LocalizedLink>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </Hidden>
    </div>
  )
}

const Navigation: React.SFC<NavigationProps> = ({ title, pages }) => {
  const ts = useTranslations()
  return <PureNavigation title={title} pages={pages} ts={ts}></PureNavigation>
}

export default Navigation
