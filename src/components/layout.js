import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Navigation from "./navigation"
import MdxLink from "./mdxLink"

// The locale context is created around the the Layout as all
// components will be children of this
const LocaleContext = React.createContext()

const Layout = ({ children, pageContext: { locale } }) => (
  <LocaleContext.Provider value={{ locale }}>
    <div className="global-wrapper">
      <header className="global-header">
        <Navigation />
      </header>
      <MDXProvider components={{ a: MdxLink }}>
        <main>{children}</main>
      </MDXProvider>
    </div>
  </LocaleContext.Provider>
)

export { Layout, LocaleContext }
