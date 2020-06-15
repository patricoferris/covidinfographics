import React from 'react'
import { Translations } from '../utils/useTranslations'
import { shallow } from 'enzyme'
import { PureNavigation } from './Navigation'

const pages = ['home', 'about', 'partners', 'media', 'involved']

const translations: Translations = {
  localised: {
    pages: {
      home: 'Home',
      about: 'About us',
      partners: 'Partners',
      media: 'Media',
      involved: 'Get Involved',
    },
    index: {
      missionTitle: 'Our Mission',
      mission:
        'As a group of doctors, medical students and volunteers, we’ve created infographics to help summarise key points about COVID-19 in a variety of languages to get the right information, in an easy to understand format, to these communities.',
      stepOneTitle: 'Step 1',
      stepOne: 'First, select your preferred language.',
      stepTwoTitle: 'Step 2',
      stepTwo:
        'View or download infographics from the list below by clicking either of the two options.',
      wellBeing: 'Well-Being',
      wellBeingText:
        'We have created a list of all the services offering support to BAME groups in each region of the UK.',
      wellBeingLink: 'Click here to find one near you.',
    },
    resources: {
      placeholder: 'Resources coming soon...',
    },
  },
  backup: {},
}

test('Should render the five pages correctly', () => {
  const wrapper = shallow(<PureNavigation title="MyNavBar" pages={pages} ts={translations} />)
  expect(wrapper).toMatchSnapshot()
})