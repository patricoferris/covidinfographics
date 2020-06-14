import React from 'react'
import renderer from 'react-test-renderer'
import Selector from './Selector'
import { shallow } from 'enzyme'

/* Fake data */
const locales = [
  {
    default: true,
    path: `en`,
    name: `English`,
    locale: `en-UK`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `en`,
    ogLanguage: `en_UK`,
    defaultTitle: `COVID19 Infographics`,
    defaultDescription: `The COVID19 website`,
  },
  {
    default: false,
    path: `fr`,
    name: `Français`,
    locale: `fr-FR`,
    dateFormat: `DD.MM.YYYY`,
    siteLanguage: `fr`,
    ogLanguage: `fr_FR`,
    defaultTitle: `Infographie de COVID19`,
    defaultDescription: `Le site de COVID19`,
  },
]

test('Clicking on selector reveals options for language', () => {
  const wrapper = shallow(<Selector languages={locales} />)
  expect(wrapper).toMatchSnapshot()
})
