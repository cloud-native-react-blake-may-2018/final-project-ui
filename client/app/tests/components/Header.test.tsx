import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header'

test('should render Header component', () => {
  const wrapper = shallow(
    <Header
      isAuthenticated={true}
      username="react"
      startLogout={() => console.log('placeholder')}
    />
  )
  expect(wrapper).toMatchSnapshot()
})
