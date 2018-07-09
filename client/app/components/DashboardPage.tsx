import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { startGetUserQuizzes } from '../actions/quizzes'

interface IProps {
  username: string
  startGetUserQuizzes: any
}

export class DashboardPage extends Component<IProps> {
  //@ts-ignore
  componentDidMount = () => {
    const username = 'Medlock'
    console.log(username)
    const {
      // username,
      startGetUserQuizzes
    } = this.props
    // console.log(username)
    startGetUserQuizzes(username)
  }

  //@ts-ignore
  render = () => {
    return (
      <div className="dashboard-page">
        <h1>dashboard</h1>
        <Link to="/create-quiz" className="link">
          Create A Quiz
        </Link>
        <Link to="/my-quizzes" className="link">
          Take A Quiz
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  username: state.auth.username
})

export default connect(
  mapStateToProps,
  { startGetUserQuizzes }
)(DashboardPage)
