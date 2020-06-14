import React from 'react'
import LocalizedLink from './LocalizedLink'

const isHash = (str) => /^#/.test(str)
const isInternal = (to) => /^\/(?!\/)/.test(to)

interface MdxProps {
  hrref: string
  [x: string]: any
}

// Only use <LocalizedLink /> for internal links
const MdxLink: React.SFC<MdxProps> = ({ href, ...props }) => {
  if (isHash(href) || !isInternal(href)) {
    return <a {...props} href={href} />
  }
  return <LocalizedLink {...props} to={href} />
}

export default MdxLink
