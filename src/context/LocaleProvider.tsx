import React, { ReactElement } from 'react'

interface LocaleProviderProps {
  children: React.ReactChild
  locale: string
}

interface LocaleProviderState {
  locale: string
}

// Use ContextAPI for creating an active locale
const LocaleContext = React.createContext({
  locale: 'window.location.href',
  setLocale: (locale: string) => console.log(window.location.href),
})

const initState = () => {
  if (window.location.href.split('/')[3]) {
    if (window.location.href.split('/')[3].length <= 3) {
      return window.location.href.split('/')[3]
    }
  }
  return 'en'
}

class LocaleProvider extends React.Component<LocaleProviderProps, LocaleProviderState> {
  constructor(props) {
    super(props)

    this.state = {
      locale: initState(),
    }
  }

  setLocale = (locale: string): void => {
    this.setState({
      locale: locale,
    })
  }

  render(): ReactElement {
    return (
      <LocaleContext.Provider value={{ locale: this.state.locale, setLocale: this.setLocale }}>
        {this.props.children}
      </LocaleContext.Provider>
    )
  }
}

export default LocaleContext
export { LocaleProvider }
