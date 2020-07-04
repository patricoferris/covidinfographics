import './src/global.css'
import React from 'react'
import Foot from './src/components/Foot'
import { LocaleProvider } from './src/context/LocaleProvider'

export const wrapRootElement = ({ element }) => (
  <LocaleProvider locale="en">{element}</LocaleProvider>
)
