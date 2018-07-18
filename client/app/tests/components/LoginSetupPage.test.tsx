import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { SetupLogin } from '../../components/LoginSetupPage'

test('should render LoginSetupPage component', () => {
  const wrapper = shallow(<SetupLogin />)
  expect(wrapper).toMatchSnapshot()
})
