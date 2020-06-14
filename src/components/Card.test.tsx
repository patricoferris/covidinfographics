import React from 'react'
import SimpleCard from './Card'
import renderer from 'react-test-renderer'

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <SimpleCard title="my title" content="some content">
      <h1>A child component</h1>
    </SimpleCard>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
