import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AchievementsPage extends Component {
  //@ts-ignore
  render = () => {
    return (
      <div>
        <h1>Achievements</h1>
      </div>
    )
  }
}

export default connect()(AchievementsPage)
