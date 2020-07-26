import './src/global.css'
import React from 'react'
import { LocaleProvider } from './src/context/LocaleProvider'

export const wrapRootElement = ({ element }) => (
  <LocaleProvider locale="en">{element}</LocaleProvider>
)

// A polyfill for safari
export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
