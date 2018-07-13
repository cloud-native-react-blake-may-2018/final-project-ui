import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'
import {
  startBatchCreateQuestions,
  startCreateNewQuestion
} from '../actions/create'
import { editStoreQuiz } from '../actions/quizzes'

interface IProps {
  username?: string
  quizID?: string
  quizUUID?: string
  quizzes?: any[]
  quiz?: any
  editStoreQuiz?: (any) => any
  startCreateNewQuestion?: (any) => any
  startBatchCreateQuestions?: (any) => any
}
// interface IProps extends RouteComponentProps<any> {
//   startCreateNewQuestion: (any) => any
// }
interface AnswerFormat {
  answer: string
  percentPoints: number
  feedback: string
}

interface QuestionFormat {
  author: string
  title: string
  tags: string
  // image?: string;
  answers: AnswerFormat[]
}

export class AddQuestion extends Component<IProps, any> {
  state = {
    displayPhoto: '',
    newQuestions: [],
    currentQuestion: {
      author: this.props.username,
      title: '',
      tags: '',
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
        tags: '',
        answers: []
      }
    },
    editQuestion: 0
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
    let sendQuestionList = []
    for (let item of this.state.newQuestions) {
      //splits array, trims spaces, and puts the return array into a new set to get rid of duplicates
      let set = new Set(
        item.tags.split(',').map(string => {
          return string.trim()
        })
      )
      //spreads set to convert it into an array
      let testArr: any[] = [...set]
      sendQuestionList.push({
        ...item,
        tags: testArr
      })
    }
    const data = {
      quizID: this.props.quizID,
      newQuestions: sendQuestionList
    }
    this.props.startBatchCreateQuestions(data)
    this.updateStore(sendQuestionList)
    this.setState({
      ...this.state,
      newQuestions: []
    })
  }

  private updateFormat = (e: any) => {
    const format = e.target.value
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
  }

  private addToList = (e: any) => {
    // let testValidator = this.formatValidator(this.state.currentQuestion)
    // if (!testValidator) {
    //   return
    // }
    if (this.state.currentQuestion.title) {
      let questionArr = this.state.newQuestions
      questionArr.push(this.state.currentQuestion)
      this.setState({
        ...this.state,
        newQuestions: questionArr,
        currentQuestion: {
          author: this.props.username,
          title: '',
          tags: '',
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
  }

  private updateStore = questionList => {
    if (this.props.quizzes !== []) {
      let modQuiz = this.props.quiz
      modQuiz.questions = modQuiz.questions.concat(questionList)

      let quizList = this.props.quizzes
      for (let i = 0; i < quizList.length; i++) {
        if (quizList[i].uuid === this.props.quizID) {
          quizList.splice(i, 1, modQuiz)
        }
      }
      this.props.editStoreQuiz(quizList)
    }
  }

  // private sendOneQuestion = (e: any) => {
  //   this.props.startCreateNewQuestion(this.state.currentQuestion);
  // };

  // @ts-ignore
  // componentWillReceiveProps = (props, nextProps) =>
  //   console.log("props: ", props, "nextProps: ", nextProps);

  private createTable = () => {
    switch (this.state.currentQuestion.format) {
      case 'true-false':
        return (
          <div>
            <label htmlFor="title">Question</label>
            <input
              type="text"
              id="title"
              value={this.state.currentQuestion.title}
              onChange={this.updateTitle}
            />
            <br />
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={this.state.currentQuestion.tags}
              onChange={this.editTagElement}
            />
            <br />
            <select
              name=""
              id="question-options-dropdown"
              value={this.state.currentQuestion.format}
              onChange={this.updateFormat}
            >
              <option value="true-false">True-or-False</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="multiple-select">Multiple Select</option>
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
          </div>
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
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={this.state.currentQuestion.tags}
              onChange={this.editTagElement}
            />
            <br />
            <br />
            <select
              name=""
              id="question-options-dropdown"
              value={this.state.currentQuestion.format}
              onChange={this.updateFormat}
            >
              <option value="true-false">True-or-False</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="multiple-select">Multiple Select</option>
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

  private changeView = (
    typeOfView: string,
    questionToView?: {},
    i?: number
  ) => {
    if (typeOfView === 'questionDisplay') {
      this.setState({
        mainView: {
          display: 'questionDisplay',
          questionToDisplay: questionToView
        },
        editQuestion: i
      })
    } else {
      this.setState({
        mainView: {
          display: 'inputDisplay',
          questionToDisplay: {}
        },
        editQuestion: 0
      })
    }
    console.log('changeViewCalled', this.state)
  }

  private formatValidator = (questionToValidate: QuestionFormat) => {
    let validObject = true
    let percentPoints = 0

    if (!questionToValidate.title || !questionToValidate.author) {
      return (validObject = false)
    } else {
      for (let item of questionToValidate.answers) {
        if (!item.answer) {
          return (validObject = false)
        }
        percentPoints = percentPoints + item.percentPoints
      }
    }
    console.log('Inside Validator Function', percentPoints, validObject)
    return percentPoints > 99 || false
  }

  private printQuestionsArr = () => {
    return (
      <div>
        {this.state.newQuestions.map((item, i) => {
          return (
            <div
              key={'questions' + i}
              onClick={event => this.changeView('questionDisplay', item, i)}
            >
              Question {i + 1}
            </div>
          )
        })}
      </div>
    )
  }

  private onDrop = (files: any) => {
    const file = files[0]
    const getBase64 = async file => {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      let codeString
      reader.onload = function() {
        codeString = reader.result
        codeString = codeString.split(',', 2)
        this.setState({
          ...this.state,
          currentQuestion: {
            ...this.state.currentQuestion,
            image: codeString[1]
          },
          displayPhoto: codeString.join(',')
        })
      }.bind(this)
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
      return codeString
    }
    getBase64(file)
  }

  private editQuestionElements = (e: any, propertyName) => {
    const index = this.state.editQuestion
    let updatedQuestions = this.state.newQuestions
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [propertyName]: e.target.value
    }
    console.log('propertyname', propertyName)
    this.setState({
      newQuestions: updatedQuestions,
      mainView: {
        ...this.state.mainView,
        questionToDisplay: updatedQuestions[index]
      }
    })
  }

  private editQuizAnswers = (e: any, propertyName, i: number) => {
    const index = this.state.editQuestion
    let updatedQuestions = this.state.newQuestions
    updatedQuestions[index].answers[i] = {
      ...updatedQuestions[index].answers[i],
      [propertyName]: e.target.value
    }
    this.setState({
      newQuestions: updatedQuestions,
      mainView: {
        ...this.state.mainView,
        questionToDisplay: updatedQuestions[index]
      }
    })
  }

  private editTagElement = (e: any) => {
    this.setState({
      currentQuestion: {
        ...this.state.currentQuestion,
        tags: e.target.value
      }
    })
  }

  private renderMainDisplayElement = () => {
    switch (this.state.mainView.display) {
      case 'questionDisplay':
        return (
          <div>
            <label htmlFor="editQuestionTitle">Title:</label>
            <input
              type="text"
              id="editQuestionTitle"
              value={this.state.mainView.questionToDisplay.title}
              onChange={e => {
                this.editQuestionElements(e, 'title')
              }}
            />
            <label htmlFor="editQuestionTag">Tags:</label>
            <input
              type="text"
              id="editQuestionTag"
              value={this.state.mainView.questionToDisplay.tags}
              onChange={e => {
                this.editQuestionElements(e, 'tags')
              }}
            />
            {this.state.mainView.questionToDisplay.answers.map((item, i) => {
              return (
                <div>
                  <label htmlFor="true-false-answer">Answer</label>
                  <input
                    type="text"
                    id="true-false-answer"
                    value={item.answer}
                    onChange={e => {
                      this.editQuizAnswers(e, 'answer', i)
                    }}
                  />
                  <label htmlFor="true-false-percent-points">
                    Percent Points
                  </label>
                  <input
                    type="text"
                    id="true-false-percent-points"
                    value={item.percentPoints}
                    onChange={e => {
                      this.editQuizAnswers(e, 'percentPoints', i)
                    }}
                  />
                  <label htmlFor="true-false-feed-back">feed Back</label>
                  <input
                    type="text"
                    id="true-false-feed-back"
                    value={item.feedback}
                    onChange={e => {
                      this.editQuizAnswers(e, 'feedback', i)
                    }}
                  />
                </div>
              )
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

  // @ts-ignore
  render = () => {
    const { startCreateNewQuestion } = this.props
    return (
      <div className="add-question-container">
        <p className="title">Add Question</p>
        <div className="close">
          {/* <div className="close" onClick={this.deleteQuestion}> */}
          <FontAwesomeIcon icon="times" />
        </div>
        <form>
          {this.renderMainDisplayElement()}
          <br />
        </form>
        <div className="row">
          <div className="col">
            <Dropzone onDrop={this.onDrop}>
              Drop your files here,
              <br />
              or click to select one.
            </Dropzone>
          </div>
          <div className="col">
            {this.state.displayPhoto && (
              <img src={this.state.displayPhoto} alt="img" />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={this.updateReducerStore}
          className="save-question"
        >
          Save
        </button>
        {/* <button onClick={this.sendOneQuestion}>
          Just add this one Question
        </button> */}
        <div>{this.printQuestionsArr()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, parentProps) => ({
  username: state.auth.username,
  quizID: parentProps.quizID || state.create.quizID,
  quizzes: state.quizzes.all,
  quiz:
    state.quizzes.all !== [] &&
    state.quizzes.all.find(
      quiz => quiz.uuid === parentProps.quizID || state.create.quizID
    )
})

export default connect<any, IProps>(
  mapStateToProps,
  { startBatchCreateQuestions, startCreateNewQuestion, editStoreQuiz }
)(AddQuestion)
