import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startcreateNewQuestion } from '../actions/create'

export class AddQuestion extends Component {
  state = {
    newQuestions: [],
    currentQuestion: {
      author: 'dserna',
      answers: [
        { answer: '', percentPoints: 0, feedback: '' },
        { answer: '', percentPoints: 0, feedback: '' }
      ],
      format: 'true-false'
    },
    answerItem: {}
  }

  private updateTitle = (e: any) => {
    const title = e.target.value
    this.setState({
      currentQuestion: {
        ...this.state.currentQuestion,
        title
      }
    })
  }

  private updateFormat = (e: any) => {
    console.log(e.target.value)
    const format = e.target.value
    console.log('format ', format)
    if (format === 'true-false') {
      this.setState({
        currentQuestion: {
          ...this.state.currentQuestion,
          format: format,
          answers: [
            { answer: '', percentPoints: 0, feedback: '' },
            { answer: '', percentPoints: 0, feedback: '' }
          ]
        }
      })
    } else {
      this.setState({
        currentQuestion: {
          ...this.state.currentQuestion,
          format: format,
          answers: [
            { answer: '', percentPoints: 0, feedback: '' },
            { answer: '', percentPoints: 0, feedback: '' },
            { answer: '', percentPoints: 0, feedback: '' },
            { answer: '', percentPoints: 0, feedback: '' }
          ]
        }
      })
    }
    console.log('updateFormat Called')
    console.log(this.state)
  }

  private updateArr = (e: any, arg1: number, arg2: string) => {
    let newAnswersArr = this.state.currentQuestion.answers
    newAnswersArr[arg1][arg2] = e.target.value
    this.setState({
      currentQuestion: {
        ...this.state.currentQuestion,
        answers: newAnswersArr
      }
    })
    console.log('updateArr called')
    console.log(this.state)
  }

  private createTable = () => {
    switch (this.state.currentQuestion.format) {
      case 'true-false':
        return (
          <form>
            <div className="row">
              <label htmlFor="true-false-answer">Answer</label>
              <input
                type="text"
                id="true-false-answer"
                value={this.state.currentQuestion.answers[0].answer}
                onChange={(e: any) => {
                  this.updateArr(e, 0, 'answer')
                }}
              />
              <label htmlFor="true-false-percent-points">Percent Points</label>
              <input
                type="text"
                id="true-false-percent-points"
                value={this.state.currentQuestion.answers[0].percentPoints}
                onChange={(e: any) => {
                  this.updateArr(e, 0, 'percentPoints')
                }}
              />
              <label htmlFor="true-false-feed-back">feed Back</label>
              <input
                type="text"
                id="true-false-feed-back"
                value={this.state.currentQuestion.answers[0].feedback}
                onChange={(e: any) => {
                  this.updateArr(e, 0, 'feedback')
                }}
              />
            </div>
            <div className="row">
              <label htmlFor="true-false-answer">Answer</label>
              <input
                type="text"
                id="true-false-answer"
                value={this.state.currentQuestion.answers[1].answer}
                onChange={(e: any) => {
                  this.updateArr(e, 1, 'answer')
                }}
              />
              <label htmlFor="true-false-percent-points">Percent Points</label>
              <input
                type="text"
                id="true-false-percent-points"
                value={this.state.currentQuestion.answers[1].percentPoints}
                onChange={(e: any) => {
                  this.updateArr(e, 1, 'percentPoints')
                }}
              />
              <label htmlFor="true-false-feed-back">feed Back</label>
              <input
                type="text"
                id="true-false-feed-back"
                value={this.state.currentQuestion.answers[1].feedback}
                onChange={(e: any) => {
                  this.updateArr(e, 1, 'feedback')
                }}
              />
            </div>
          </form>
        )
      default:
        return (
          <form>
            <div className="row">
              <label htmlFor="true-false-answer">Answer</label>
              <input
                type="text"
                id="true-false-answer"
                value={this.state.currentQuestion.answers[0].answer}
                onChange={(e: any) => {
                  this.updateArr(e, 0, 'answer')
                }}
              />
              <label htmlFor="true-false-percent-points">Percent Points</label>
              <input
                type="text"
                id="true-false-percent-points"
                value={this.state.currentQuestion.answers[0].percentPoints}
                onChange={(e: any) => {
                  this.updateArr(e, 0, 'percentPoints')
                }}
              />
              <label htmlFor="true-false-feed-back">feed Back</label>
              <input
                type="text"
                id="true-false-feed-back"
                value={this.state.currentQuestion.answers[0].feedback}
                onChange={(e: any) => {
                  this.updateArr(e, 0, 'feedback')
                }}
              />
            </div>
            <div className="row">
              <label htmlFor="true-false-answer">Answer</label>
              <input
                type="text"
                id="true-false-answer"
                value={this.state.currentQuestion.answers[1].answer}
                onChange={(e: any) => {
                  this.updateArr(e, 1, 'answer')
                }}
              />
              <label htmlFor="true-false-percent-points">Percent Points</label>
              <input
                type="text"
                id="true-false-percent-points"
                value={this.state.currentQuestion.answers[1].percentPoints}
                onChange={(e: any) => {
                  this.updateArr(e, 1, 'percentPoints')
                }}
              />
              <label htmlFor="true-false-feed-back">feed Back</label>
              <input
                type="text"
                id="true-false-feed-back"
                value={this.state.currentQuestion.answers[1].feedback}
                onChange={(e: any) => {
                  this.updateArr(e, 1, 'feedback')
                }}
              />
            </div>
            <div className="row">
              <label htmlFor="true-false-answer">Answer</label>
              <input
                type="text"
                id="true-false-answer"
                value={this.state.currentQuestion.answers[2].answer}
                onChange={(e: any) => {
                  this.updateArr(e, 2, 'answer')
                }}
              />
              <label htmlFor="true-false-percent-points">Percent Points</label>
              <input
                type="text"
                id="true-false-percent-points"
                value={this.state.currentQuestion.answers[2].percentPoints}
                onChange={(e: any) => {
                  this.updateArr(e, 2, 'percentPoints')
                }}
              />
              <label htmlFor="true-false-feed-back">feed Back</label>
              <input
                type="text"
                id="true-false-feed-back"
                value={this.state.currentQuestion.answers[2].feedback}
                onChange={(e: any) => {
                  this.updateArr(e, 2, 'feedback')
                }}
              />
            </div>
            <div className="row">
              <label htmlFor="true-false-answer">Answer</label>
              <input
                type="text"
                id="true-false-answer"
                value={this.state.currentQuestion.answers[3].answer}
                onChange={(e: any) => {
                  this.updateArr(e, 3, 'answer')
                }}
              />
              <label htmlFor="true-false-percent-points">Percent Points</label>
              <input
                type="text"
                id="true-false-percent-points"
                value={this.state.currentQuestion.answers[3].percentPoints}
                onChange={(e: any) => {
                  this.updateArr(e, 3, 'percentPoints')
                }}
              />
              <label htmlFor="true-false-feed-back">feed Back</label>
              <input
                type="text"
                id="true-false-feed-back"
                value={this.state.currentQuestion.answers[3].feedback}
                onChange={(e: any) => {
                  this.updateArr(e, 3, 'feedback')
                }}
              />
            </div>
          </form>
        )
    }
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={this.updateTitle} />
          <select
            name=""
            id="question-options-dropdown"
            onChange={this.updateFormat}
          >
            <option value="true-false">true false</option>
            <option value="multiple-choice">multiple choice</option>
            <option value="best-choice">one right answer</option>
          </select>
          {this.createTable()}
          <button
            type="button"
            onClick={(e: any) => {
              // this.props.startcreateNewQuestion(this.state.currentQuestion)
            }}
          >
            Submit Question
          </button>
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

export default connect(
  undefined,
  { startcreateNewQuestion }
)(AddQuestion)
