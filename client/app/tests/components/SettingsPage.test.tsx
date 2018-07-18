import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { SettingsPage } from '../../components/SettingsPage'

test('should render SettingsPage component', () => {
  const wrapper = shallow(
    <SettingsPage
      email="marty@slackjaw.com"
      username="marty_slackjaw"
      photo="https://martyslack.jpg"
      name="Marty"
      file="https://martyslack.jpg"
      startUpdateUser={() => `placeholder function`}
      startUpdateName={(name: string) => `void`}
      startUpdateEmail={(email: string) => `void`}
    />
  )
  expect(wrapper).toMatchSnapshot()
})
