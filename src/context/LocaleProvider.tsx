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
  locale: 'en',
  setLocale: (locale: string) => console.log(locale),
})

class LocaleProvider extends React.Component<LocaleProviderProps, LocaleProviderState> {
  constructor(props) {
    super(props)

    this.state = {
      locale: 'en',
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
