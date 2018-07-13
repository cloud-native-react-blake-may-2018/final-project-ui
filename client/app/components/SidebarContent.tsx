import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuIcon from '../../public/icons/menu-icon.svg'
import AddQuizIcon from '../../public/icons/add-quiz-icon.svg'
import ViewQuizzesIcon from '../../public/icons/view-quizzes-icon.svg'
import AchievementsIcon from '../../public/icons/achievements-icon.svg'
import CartIcon from '../../public/icons/cart-icon.svg'
import SettingsIcon from '../../public/icons/settings-icon.svg'

import { generateUuid } from '../helpers/helpers'
import { loadModal } from '../actions/modal'
import { questionsReducer } from '../reducers/questions'
// import { NEW_WORD_MODAL } from '../constants/modaltypes'

interface IProps extends RouteComponentProps<any> {
  username?: string
  questions?: any
  startAddTopic?: (nextTopic: any) => any
  loadModal?: (string) => void
}

interface IState {
  takingQuiz: boolean
  isEditing: boolean
}

export class SidebarContent extends Component<IProps, IState> {
  state = {
    takingQuiz: false,
    isEditing: false,
    topic: ''
  }

  onFieldChange = e => {
    let { name, value }: { name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  handleSubmit = e => {
    e.preventDefault()
    let topic = this.state.topic
    let id = generateUuid()
    let username = this.props.username
    let nextTopic = {
      uid: id,
      owner: username,
      topic: topic
    }
    this.props.startAddTopic(nextTopic)
  }

  // spawnWordModal = () => this.props.loadModal(NEW_WORD_MODAL)

  toggle = e => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  // @ts-ignore
  componentWillReceiveProps = props => {
    const quizInProgress = this.props.location.pathname.includes('take-quiz')

    if (quizInProgress) this.setState({ takingQuiz: true })
  }

  // @ts-ignore
  render = () => {
    const { topic, takingQuiz } = this.state
    const { questions } = this.props
    return (
      <div className="content">
        <div className="cover" />
        {!takingQuiz && (
          <div className="container">
            <Link to="/dashboard" className="link">
              <MenuIcon className="svg menu" />
            </Link>
            <Link to="/add-quiz" className="link">
              <AddQuizIcon className="svg add-quiz" />
            </Link>
            <Link to="/quizzes/created" className="link">
              <ViewQuizzesIcon className="svg view-quizzes" />
            </Link>
            <Link to="/achievements" className="link">
              <AchievementsIcon className="svg achievements" />
            </Link>
            <Link to="/store" className="link">
              <CartIcon className="svg store" />
            </Link>
            <Link to="/settings" className="link">
              <SettingsIcon className="svg settings" />
            </Link>
          </div>
        )}
        {takingQuiz && (
          <div className="container">
            {questions.map((question, number) => (
              <p className="link">{number + 1}</p>
            ))}
          </div>
        )}
      </div>
    )
  }
}

/* // @ts-ignore
  render = () => {
    const { topic, takingQuiz } = this.state
    return (
      <div className="content">
        <div className="cover" />
        <Link to="/dashboard" className="link">
          <MenuIcon className="svg menu" />
        </Link>
        <Link to="/add-quiz" className="link">
          <AddQuizIcon className="svg add-quiz" />
        </Link>
        <Link to="/quizzes/created" className="link">
          <ViewQuizzesIcon className="svg view-quizzes" />
        </Link>
        <Link to="/achievements" className="link">
          <AchievementsIcon className="svg achievements" />
        </Link>
        <Link to="/store" className="link">
          <CartIcon className="svg store" />
        </Link>
        <Link to="/settings" className="link">
          <SettingsIcon className="svg settings" />
        </Link>
      </div>
    )
  }
}
*/

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  questions:
    state.takeQuiz.quizAttemptInfoObj !== null &&
    state.takeQuiz.quizAttemptInfoObj.questions
})

export default withRouter(
  connect<any, any>(
    mapStateToProps,
    { loadModal },
    undefined,
    { pure: false }
  )(SidebarContent)
)
