import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'http2'

interface IProps {}

export class ViewQuizzesPage extends Component<IProps> {
  render() {
    return (
      <div className="viewQuizzes-page">
        <h1>View Quizzes</h1>
        {this.props.quizzes.map}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { viewQuizzes }
)(ViewQuizzesPage)
