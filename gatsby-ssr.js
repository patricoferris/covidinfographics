import CustomLayout from './wrapPageElement'
import React from 'react'
import Foot from './src/components/Foot'

export const wrapPageElement = CustomLayout

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([<Foot key="footer" />])
}
