import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { CreateQuiz } from '../../components/CreateQuiz'

test('should render CreateQuiz component', () => {
  const wrapper = shallow(<CreateQuiz />)
  expect(wrapper).toMatchSnapshot()
})
