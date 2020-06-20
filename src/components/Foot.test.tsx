import React from 'react'
import { shallow } from 'enzyme'
import Foot from './Foot'

test('Render footer correctly', () => {
  const wrapper = shallow(<Foot />)
  expect(wrapper).toMatchSnapshot()
})
