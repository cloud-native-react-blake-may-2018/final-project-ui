import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom'

export class DashboardPage extends Component {
  //@ts-ignore
  render = () => {
    return (
      <div className="dashboard-page">
        {this.props.children}
        <h1>dashboard</h1>
        <Link to="/create-quiz" className="link">
          Create A Quiz
        </Link>
        <Link to="/view-quizzes" className="link">
          Take A Quiz
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
})

export default connect(mapStateToProps)(DashboardPage)
