import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startCreateNewQuiz } from "../actions/create";

interface IProps {
  startCreateNewQuiz: (any) => any;
  history?: any;
  username?: any;
}

export class AddQuiz extends Component<IProps> {
  state = {
    quiz: {
      author: this.props.username,
      title: "",
      description: "",
      isPrivate: true,
      type: "quiz"
    }
  };

  private updateQuiz = (e: any, arg1: string) => {
    switch (arg1) {
      case "title":
        this.setState({
          quiz: {
            ...this.state.quiz,
            title: e.target.value
          }
        });
        break;
      case "description":
        this.setState({
          quiz: {
            ...this.state.quiz,
            description: e.target.value
          }
        });
      default:
        break;
    }
    console.log(this.state);
  };

  private updatePrivate = (e: any) => {
    switch (e.target.value) {
      case "private":
        this.setState({
          quiz: {
            ...this.state.quiz,
            isPrivate: true
          }
        });
        break;

      default:
        this.setState({
          quiz: {
            ...this.state.quiz,
            isPrivate: false
          }
        });
        break;
    }
  };

  private submitQuiz = (e: any) => {
    this.props
      .startCreateNewQuiz(this.state.quiz)
      .then(res => {
        console.log("add quiz props");
        console.log(this.props);
        this.props.history.push("/add-question");
      })
      .catch(err =>
        console.log(
          "make sure the user knows that the quiz did not make it through"
        )
      );
  };

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
              this.updateQuiz(e, "title");
            }}
          />
          <label htmlFor="add-quiz-description">Description</label>
          <input
            type="text"
            id="add-quiz-description"
            value={this.state.quiz.description}
            onChange={(e: any) => {
              this.updateQuiz(e, "description");
            }}
          />
          <select
            name=""
            id="question-options-dropdown"
            onChange={this.updatePrivate}
          >
            <option value="choose" hidden>
              select
            </option>
            <option value="private">private</option>
            <option value="public">public</option>
          </select>
          <button type="button" onClick={this.submitQuiz}>
            Submit Quiz
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.username
});

export default connect<any, IProps>(
  mapStateToProps,
  { startCreateNewQuiz }
)(AddQuiz);
