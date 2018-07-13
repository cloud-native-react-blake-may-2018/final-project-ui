import React, { Component } from "react";
import moment from "moment";
import numeral from "numeral";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "react-spinkit";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startDeleteQuestion, startEditQuestion } from "../actions/questions";
import { editStoreQuiz, startUpdateQuestionsDisplay } from "../actions/quizzes";
import AddQuestion from "../components/AddQuestion";

interface IProps {
  username: any;
  quiz: any;
  quizzes: any[];
  editStoreQuiz: (any) => any;
  startEditQuestion: (any) => any;
  startDeleteQuestion: (author: string, title: any) => any;
}

export class EditQuizPage extends Component<IProps> {
  state = {
    displayPhoto: "",
    page: 1,
    clickedQuestion: {
      author: "",
      title: "",
      uuid: "",
      format: "",
      answers: [
        {
          answer: "",
          percentPoints: 0,
          feedback: ""
        }
      ]
    },
    questionNumber: 0,
    updatedQuestions: [],
    clickedAddQuestion: false
  };

  params = window.location.href.split("/");
  quizUUID = this.params[4];

  page1 = () => this.setState({ page: 1 });

  page2 = () => this.setState({ page: 2 });

  private updateArr = (e: any, arg1: number, arg2: string) => {
    let newAnswersArr = this.state.clickedQuestion.answers;
    newAnswersArr[arg1][arg2] = e.target.value;
    this.setState({
      currentQuestion: {
        ...this.state.clickedQuestion,
        answers: newAnswersArr
      }
    });
  };

  private updateQuiz = (e: any) => {
    for (let item of this.state.updatedQuestions)
      this.props.startEditQuestion(item);
  };

  private saveChangeToState = (e: any) => {
    let newQArr = this.state.updatedQuestions;
    newQArr.push(this.state.clickedQuestion);
    this.setState({
      ...this.state,
      updatedQuestions: newQArr
    });
    console.log(this.state.updatedQuestions);
  };

  private deleteQuestion = (e: any) => {
    // Something that asks them if they really want to delete it
    this.updateStore();
    this.props.startDeleteQuestion(
      this.state.clickedQuestion.author,
      this.state.clickedQuestion.title
    );
  };

  private updateStore = () => {
    let modQuiz = this.props.quiz;
    for (let i = 0; i < modQuiz.questions.length; i++) {
      if (modQuiz.questions[i].uuid === this.state.clickedQuestion.uuid) {
        modQuiz.questions.splice(i, 1);
        //here is where we delete a question
      }
    }
    let quizList = this.props.quizzes;
    for (let i = 0; i < quizList.length; i++) {
      if (quizList[i].uuid === this.props.quiz.uuid) {
        quizList.splice(i, 1, modQuiz);
      }
    }
    this.props.editStoreQuiz(quizList);
  };

  public showQuizQuestion = (question: any, count: number, e: any) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      questionNumber: count,
      clickedQuestion: question,
      clickedAddQuestion: false
    });
    if (question.image) {
      this.setState({
        displayPhoto: question.image
      });
    }
  };

  private setAddQuestion = (e: any) => {
    this.setState({
      // we may not need this because if the component reloads this will be blank anyway
      ...this.state,
      clickedQuestion: {
        author: "",
        title: "",
        uuid: "",
        format: "",
        answers: [
          {
            answer: "",
            percentPoints: 0,
            feedback: ""
          }
        ]
      },
      clickedAddQuestion: true
    });
  };

  private photoUpload: HTMLInputElement;

  fileSelectedHandler = e => this.setState({ selectedFile: e.target.files[0] });

  private onDrop = (files: any) => {
    const file = files[0];
    const getBase64 = async file => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let codeString;
      reader.onload = function() {
        codeString = reader.result;
        codeString = codeString.split(",", 2);
        this.setState({
          ...this.state,
          // clickedQuestion: {
          //   ...this.state.clickedQuestion,
          //   image: codeString[1]
          // },
          displayPhoto: codeString.join(",")
        });
      }.bind(this);
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
      return codeString;
    };
    getBase64(file);
  };

  // @ts-ignore
  render = () => {
    const { quiz } = this.props;
    const {
      page,
      clickedQuestion,
      questionNumber,
      clickedAddQuestion
    } = this.state;
    let count = 0;
    return (
      <div className="edit-quiz-page">
        {quiz.tags === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {console.log("this is what quiz looks like", quiz)}
        {quiz.tags !== undefined && (
          <main>
            <div className="quiz-container">
              <h1 className="title">{quiz.title}</h1>
              <div className="close">
                {/* <div className="close" onClick={this.onClose}> */}
                <FontAwesomeIcon icon="times" />
              </div>
              <div className="tags">
                {quiz.tags.length === 0 && <p className="tag">No tags</p>}
                {quiz.tags.length > 0 &&
                  quiz.tags.map(tag => (
                    <p key={tag.allLowerCase} className="tag">
                      {tag.allLowerCase}
                    </p>
                  ))}
              </div>
              <p className="add-tag">+ tag</p>
              <div className="questions">
                {quiz.questions.map(tag => (
                  <div key={tag.allLowerCase}>
                    <p
                      className="question"
                      onClick={this.showQuizQuestion.bind(
                        this,
                        quiz.questions[count],
                        count + 1
                      )}
                    >
                      Question {(count += 1)}
                    </p>
                  </div>
                ))}
                <p
                  onClick={e => this.setAddQuestion(e)}
                  className="add-question"
                >
                  + question
                </p>
              </div>
              <button onClick={this.updateQuiz} className="save-quiz">
                Save Quiz
              </button>

              {/* <Link
                to={`/take-quiz/${quiz.uuid}`}
                className="unset-anchor nav-link"
              >
                <div style={quizButton}>Test Quiz</div>
              </Link> */}
            </div>

            {clickedQuestion.title && (
              <div key={clickedQuestion.uuid} className="question-container">
                <p className="title">Edit question</p>
                <div className="close" onClick={this.deleteQuestion}>
                  <FontAwesomeIcon icon="times" />
                </div>
                {page === 1 && (
                  <form className="details">
                    <div className="group">
                      <label>Question {questionNumber}</label>
                      <input placeholder={clickedQuestion.title} />
                      {/* // Should not be an input. */}
                    </div>
                    <div className="group">
                      <label>Tags</label>
                      <input placeholder="Assign tags to this question" />
                    </div>
                    <div
                      className="group photo-container"
                      onClick={() => this.photoUpload.click()}
                      // This is not a thing
                    >
                      <div className="group">
                        <h2 className="label">Image</h2>
                        <Dropzone onDrop={this.onDrop} className="dropzone">
                          <p className="button">+ Upload</p>
                        </Dropzone>
                        {this.state.displayPhoto}
                        {/* Put in ability to display picture that is an S3 URL, stored in this.state.displayPhoto */}
                        <input
                          className="file-upload"
                          style={{ display: "none" }}
                          name="file"
                          type="file"
                          onChange={this.fileSelectedHandler}
                          ref={photoUpload => (this.photoUpload = photoUpload)}
                        />
                      </div>
                    </div>
                  </form>
                )}
                {page === 2 && (
                  <form className="options">
                    {clickedQuestion.answers.map((ans, index) => (
                      <div key={ans.percentPoints}>
                        <div className="group">
                          <label htmlFor="true-false-answer" className="label">
                            Choice
                          </label>
                          <textarea
                            id="true-false-answer"
                            value={ans.answer}
                            className="input"
                            onChange={(e: any) => {
                              this.updateArr(e, index, "answer");
                            }}
                          />
                        </div>
                        <div className="group">
                          <label
                            htmlFor="true-false-percent-points"
                            className="input"
                          >
                            Percent Points
                          </label>
                          <textarea
                            id="true-false-percent-points"
                            value={ans.percentPoints}
                            onChange={(e: any) => {
                              this.updateArr(e, index, "percentPoints");
                            }}
                          />
                        </div>
                        <div className="group">
                          <label htmlFor="true-false-feed-back">Feedback</label>
                          <textarea
                            id="true-false-feed-back"
                            value={ans.feedback}
                            className="input"
                            onChange={(e: any) => {
                              this.updateArr(e, index, "feedback");
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </form>
                )}
                <div className="page-navigation">
                  <p
                    className={page === 1 ? "page-1 active" : "page-1"}
                    onClick={this.page1}
                  >
                    1
                  </p>
                  <p
                    className={page === 2 ? "page-2 active" : "page-2"}
                    onClick={this.page2}
                  >
                    2
                  </p>
                </div>
                {page === 2 && (
                  <button
                    onClick={this.saveChangeToState}
                    className="save-question"
                  >
                    Save
                  </button>
                )}
              </div>
            )}

            {clickedAddQuestion && (
              <AddQuestion quizID={this.props.quiz.uuid} />
            )}
          </main>
        )}
      </div>
    );
  };
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz:
    state.quizzes.all !== undefined &&
    state.quizzes.all.find(
      quiz =>
        quiz.uuid === props.match.params.uuid ||
        quiz.uuid === window.location.href.split("/")[4]
    ),
  quizzes: state.quizzes.all
});

export default connect(
  mapStateToProps,
  {
    editStoreQuiz,
    startDeleteQuestion,
    startEditQuestion
  }
)(EditQuizPage);
