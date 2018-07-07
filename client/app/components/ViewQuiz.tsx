import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

interface IProps {
  username: any
  quiz: any
  // startGetUserQuizzes: (username: string) => any
}
const quizStyle = {
  background: '#86b2d8',
  borderRadius: 20,
  // margin: "20px",
  padding: '20px',
  width: '20%'
}

export class ViewQuizPage extends Component<IProps> {
  params = window.location.href.split('/')
  quizUUID = this.params[4]
  render() {
    const { quiz } = this.props
    console.log(quiz)
    console.log(this.quizUUID)
    return (
      <div className="viewQuizzes-page">
        <h1>My Quiz</h1>
        <h4>{quiz.title}</h4>
        <h4>{quiz.tags}</h4>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz: state.quizzes.quizzes.find(
    quiz => quiz.uuid === props.match.params.uuid
  )
})

export default connect(mapStateToProps)(ViewQuizPage)
