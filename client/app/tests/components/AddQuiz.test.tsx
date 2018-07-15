import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { AddQuiz } from '../../components/AddQuiz'

/* add mock function for startCreateNewQuiz */

test('should render AddQuiz component', () => {
  const wrapper = shallow(<AddQuiz startCreateNewQuiz={() => 'function'} />)
  expect(wrapper).toMatchSnapshot()
})
