import React from 'react'
import { shallow } from 'enzyme'
import Share from './Share'
import { IconButton } from '@material-ui/core'

test('Render closed share correctly', () => {
  const wrapper = shallow(<Share url={'testing.png'} />)
  expect(wrapper).toMatchSnapshot()
})

test('Render opened share correctly', () => {
  const wrapper = shallow(<Share url={'testing.png'} />)
  wrapper.find(IconButton).simulate('click', { currentTarget: IconButton })
  expect(wrapper).toMatchSnapshot()
})
