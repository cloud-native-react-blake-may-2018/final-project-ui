import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { DashboardPage } from '../../components/DashboardPage'

/* add mock data for quizzes and allAttempts */

test('should render DashboardPage component', () => {
  const wrapper = shallow(
    <DashboardPage
      username="named_manager"
      quizzes="quiz array placeholder"
      allAttempts="allAttempts array placeholder"
    />
  )
  expect(wrapper).toMatchSnapshot()
})
