import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { SignInRedirectPage } from '../../components/SignInRedirectPage'

/**
 * @jest-environment jsdom
 */

test('should render SignInRedirectPage component', () => {
  window.location.assign = jest.fn()
  const wrapper = shallow(<SignInRedirectPage />)

  expect(wrapper).toMatchSnapshot()
})
