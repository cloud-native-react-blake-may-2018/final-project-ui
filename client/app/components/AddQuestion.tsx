import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  startBatchCreateQuestions,
  startCreateNewQuestion
} from '../actions/create'
import { faDivide } from '@fortawesome/fontawesome-free-solid'

interface IProps {
  username?: string
  quizID?: string
  questionIDs?: string[]
  startCreateNewQuestion: (any) => any
  startBatchCreateQuestions: (any) => any
}
// interface IProps extends RouteComponentProps<any> {
//   startCreateNewQuestion: (any) => any
// }

export class AddQuestion extends Component<IProps, any> {
  state = {
    newQuestions: [],
    currentQuestion: {
      author: this.props.username,
      title: '',
      answers: [
        {
          answer: '',
          percentPoints: 0,
          feedback: 'no feedback for this question'
        },
        {
          answer: '',
          percentPoints: 0,
          feedback: 'no feedback for this question'
        }
      ],
      format: 'true-false'
    },
    mainView: {
      display: 'inputDisplay',
      questionToDisplay: {
        title: '',
        answers: []
      }
    }
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

  updateReducerStore = () => {
    const data = {
      quizID: this.props.quizID,
      newQuestions: this.state.newQuestions
    }
    this.props.startBatchCreateQuestions(data) // works

    // .then(res => {
    //   if (this.props.questionIDs) {
    //     this.props
    //       .startaddJunctionItem(this.props.quizID, this.props.questionIDs)
    //       .then(resp => {
    //         console.log(resp);
    //       })
    //       .catch(err => {});
    //   }
    // })
    // .catch(err => {});
    // this.props.startCreateNewQuestion(this.state.currentQuestion)
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
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            },
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            }
          ]
        }
      })
    } else {
      this.setState({
        currentQuestion: {
          ...this.state.currentQuestion,
          format: format,
          answers: [
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            },
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            },
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            },
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            }
          ]
        }
      })
    }
    console.log('updateFormat Called')
    console.log(this.state)
  }

  private addToList = (e: any) => {
    if (this.state.currentQuestion.title) {
      let questionArr = this.state.newQuestions
      questionArr.push(this.state.currentQuestion)
      this.setState({
        ...this.state,
        newQuestions: questionArr,
        currentQuestion: {
          author: this.props.username,
          title: '',
          answers: [
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            },
            {
              answer: '',
              percentPoints: 0,
              feedback: 'no feedback for this question'
            }
          ],
          format: 'true-false'
        }
      })
      console.log('added Q to list', this.state)
    } // else...
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
    console.log(this.state)
  }

  // // @ts-ignore
  // componentWillReceiveProps = (props, nextProps) =>
  //   console.log("props: ", props, "nextProps: ", nextProps);

  private createTable = () => {
    switch (this.state.currentQuestion.format) {
      case 'true-false':
        return (
          <form>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={this.state.currentQuestion.title}
              onChange={this.updateTitle}
            />
            <br />
            <select
              name=""
              id="question-options-dropdown"
              value={this.state.currentQuestion.format}
              onChange={this.updateFormat}
            >
              <option value="true-false">true false</option>
              <option value="multiple-choice">multiple choice</option>
              <option value="multiple-select">multiple select</option>
            </select>
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
            <button type="button" onClick={this.addToList}>
              Add Question
            </button>
          </form>
        )
      default:
        return (
          <form>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={this.state.currentQuestion.title}
              onChange={this.updateTitle}
            />
            <br />
            <select
              name=""
              id="question-options-dropdown"
              value={this.state.currentQuestion.format}
              onChange={this.updateFormat}
            >
              <option value="true-false">true false</option>
              <option value="multiple-choice">multiple choice</option>
              <option value="multiple-select">multiple select</option>
            </select>
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
            <button type="button" onClick={this.addToList}>
              Add Question
            </button>
          </form>
        )
    }
  }

  private changeView = (typeOfView: string, questionToView?: {}) => {
    if (typeOfView === 'questionDisplay') {
      this.setState({
        mainView: {
          display: 'questionDisplay',
          questionToDisplay: questionToView
        }
      })
      console.log('got to questioView', questionToView)
    } else {
      this.setState({
        mainView: {
          display: 'inputDisplay',
          questionToDisplay: {}
        }
      })
    }
    console.log('changeViewCalled', this.state)
  }

  private printQuestionsArr = () => {
    return (
      <div>
        {this.state.newQuestions.map((item, i) => {
          return (
            <div onClick={event => this.changeView('questionDisplay', item)}>
              Question {i + 1}
            </div>
          )
        })}
      </div>
    )
  }

  private renderMainDisplayElement = () => {
    switch (this.state.mainView.display) {
      case 'questionDisplay':
        return (
          <div>
            <div>Title: {this.state.mainView.questionToDisplay.title}</div>
            {this.state.mainView.questionToDisplay.answers.map(item => {
              return <div>{item.answer}</div>
            })}
            <button
              onClick={() => {
                this.changeView('inputDisplay')
              }}
            >
              Create New Question
            </button>
          </div>
        )
      default:
        return <div>{this.createTable()}</div>
    }
  }

  render() {
    const { startCreateNewQuestion } = this.props
    return (
      <div>
        <form>
          {this.renderMainDisplayElement()}
          <br />
        </form>
        <button type="button" onClick={this.updateReducerStore}>
          Save
        </button>
        <div>{this.printQuestionsArr()}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  quizID: state.create.quizID,
  questionIDs: state.create.questionIDs
})

export default connect<any, IProps>(
  mapStateToProps,
  { startBatchCreateQuestions, startCreateNewQuestion }
)(AddQuestion)
