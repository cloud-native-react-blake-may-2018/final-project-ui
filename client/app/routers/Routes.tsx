import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidebar from 'react-sidebar'
import createHistory from 'history/createBrowserHistory'

import SidebarContent from '../components/SidebarContent'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import SplashPage from '../components/SplashPage'
import LoginPage from '../components/LoginPage'
import SignupPage from '../components/SignupPage'
import DashboardPage from '../components/DashboardPage'
import MyQuizzesPage from '../components/MyQuizzesPage'
import EditQuizPage from '../components/EditQuizPage'
import ViewQuizPage from '../components/ViewQuizPage'
import TakeQuizPage from '../components/TakeQuizPage'
import QuizResultsPage from '../components/QuizResultsPage'
import QuizAttemptReviewPage from '../components/QuizAttemptReviewPage'
import SignInRedirectPage from '../components/SignInRedirectPage'
import AchievementsPage from '../components/AchievementsPage'
import StorePage from '../components/StorePage'
import ResetPasswordPage from '../components/ResetPasswordPage'
import AddQuestion from '../components/AddQuestion'
import CreateQuizPage from '../components/CreateQuizPage'

import SettingsPage from '../components/SettingsPage'
import ProfilePage from '../components/ProfilePage'
import NotFoundPage from '../components/NotFoundPage'
import LoginSetupPage from '../components/LoginSetupPage'
import SignUpRedirectPage from '../components/SignUpRedirectPage'

export const history = createHistory()
const mql = window.matchMedia(`(min-width: 800px)`)

interface IProps {
  history?: any
  sidebarOpen?: any
}
interface IState {
  mql: MediaQueryList
  sidebarDocked: boolean
  // sidebarOpen: boolean
}

// sidebar content
const sidebar = <SidebarContent />

export class Pages extends Component<IProps, IState> {
  state = {
    mql: mql,
    sidebarDocked: false
    // sidebarOpen: true
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: this.state.mql.matches })
  }

  // onSetSidebarOpen = () =>
  //   this.setState({ sidebarOpen: !this.state.sidebarOpen })

  // @ts-ignore
  componentWillMount = () => {
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mql, sidebarDocked: mql.matches })
  }

  // @ts-ignore
  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  // @ts-ignore
  // componentWillReceiveProps = (props, nextProps) => {
  //   console.log('...old props?', props)
  //   console.log('...new props?', nextProps)
  //   this.setState({ sidebarDocked: nextProps.sidebarOpen })
  // }

  // @ts-ignore
  // shouldComponentUpdate = () => false

  // @ts-ignore
  render = () => {
    const { sidebarDocked } = this.state
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={SplashPage} />
          <PublicRoute path="/signup" component={SignUpRedirectPage} />
          <PublicRoute path="/login" component={SignInRedirectPage} />
          <PublicRoute path="/resetpassword" component={ResetPasswordPage} />
          <PublicRoute path="/redirect" component={LoginSetupPage} />
          <Sidebar
            sidebar={sidebar}
            docked={sidebarDocked}
            // open={false}
            // onSetOpen={this.onSetSidebarOpen}
            sidebarClassName="sidebar"
            rootClassName="root-class"
            contentClassName="content-class"
            overlayClassName="overlay-class"
            shadow={false}
          >
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/quizzes/:type" component={MyQuizzesPage} />
            <PrivateRoute path="/view-quiz/:uuid" component={ViewQuizPage} />
            <PrivateRoute
              path="/review-quiz/:attemptUUID"
              component={QuizAttemptReviewPage}
            />
            <PrivateRoute path="/edit-quiz/:uuid" component={EditQuizPage} />
            <PrivateRoute path="/take-quiz/:uuid" component={TakeQuizPage} />
            <PrivateRoute
              path="/quiz-results/:quizUUID"
              component={QuizResultsPage}
            />
            {/* <PrivateRoute path="/create-quiz" component={CreateQuiz} /> */}
            <PrivateRoute path="/add-question" component={AddQuestion} />
            <PrivateRoute path="/create-quiz" component={CreateQuizPage} />
            <PrivateRoute path="/achievements" component={AchievementsPage} />
            <PrivateRoute path="/store" component={StorePage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute path="/settings" component={SettingsPage} />
          </Sidebar>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.app.sidebarOpen
})

export default connect(mapStateToProps)(Pages)
