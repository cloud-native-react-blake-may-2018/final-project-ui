import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuestion } from '../actions/create'

interface IProps {
  startCreateNewQuestion: (any) => any
}

export class AddQuestion extends Component<IProps> {
  state = {
    quiz: {
      author: '',
      title: '',
      description: '',
      isPrivate: true
    }
  }

  private updateQuiz(e: any, arg1: string) {
    switch (arg1) {
      case 'title':
        this.setState({
          quiz: {
            ...this.state.quiz,
            title: e.target.value
          }
        })
        break
      case 'description':
        this.setState({
          quiz: {
            ...this.state.quiz,
            description: e.target.value
          }
        })
      default:
        break
    }
  }
  render() {
    return (
      <div>
        <form>
          <label htmlFor="add-quiz-title">Title</label>
          <input
            type="text"
            id="add-quiz-title"
            value={this.state.quiz.title}
            onChange={(e: any) => {
              this.updateQuiz(e, 'title')
            }}
          />
          <label htmlFor="add-quiz-description">Description</label>
          <input
            type="text"
            id="add-quiz-description"
            value={this.state.quiz.description}
            onChange={(e: any) => {
              this.updateQuiz(e, 'description')
            }}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  firstname: state.auth.firstname
})

export default connect<any, IProps>(
  undefined,
  { startCreateNewQuestion }
)(AddQuestion)
