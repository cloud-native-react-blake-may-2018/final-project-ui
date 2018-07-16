import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { LoginSetupPage } from '../../components/LoginSetupPage'

test('should render LoginSetupPage component', () => {
  const wrapper = shallow(<LoginSetupPage />)
  expect(wrapper).toMatchSnapshot()
})
