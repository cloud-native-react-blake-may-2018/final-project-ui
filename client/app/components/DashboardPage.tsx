import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import {
  startGetUserQuizzes,
  clearResults,
  clearQuizAttempt
} from '../actions/quizzes'

import CoinIcon from '../../public/icons/coin-icon.svg'
import ArrowIcon from '../../public/icons/arrow-icon.svg'
import ParseIcon from '../../public/icons/parse-icon.svg'
import DoubleIcon from '../../public/icons/double-icon.svg'
import ForgiveIcon from '../../public/icons/forgive-icon.svg'
import Spinner from 'react-spinkit'

interface IProps {
  username: string
  quizzes: any
  allAttempts: any
  clearResults?: () => any
  clearQuizAttempt?: (reset: number) => void
}

export class DashboardPage extends Component<IProps> {
  constructor(props) {
    super(props)
  }

  state = {
    oscillate: false
  }
  start = () => this.setState({ oscillate: true })

  stop = () => this.setState({ oscillate: false })

  clearResults = (e: any) => {
    this.props.clearResults()
    this.props.clearQuizAttempt(0)
    console.log('clearing results')
  }

  //@ts-ignore
  render = () => {
    const { quizzes, allAttempts } = this.props
    const { oscillate } = this.state
    return (
      <div className="dashboard-page">
        {quizzes === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quizzes !== undefined &&
          allAttempts !== undefined && (
            <div className="blocks">
              <div className="main">
                <section className="quizzes">
                  <h2 className="quizzes-title">Quizzes</h2>
                  <main>
                    <div className="quizzes-created">
                      <p className="count">{quizzes.length}</p>
                      <p className="label">/ created</p>
                      <Link to="/quizzes/created" className="link">
                        <ArrowIcon
                          className={oscillate ? 'arrow animate' : 'arrow'}
                          onMouseOver={this.start}
                          onAnimationEnd={this.stop}
                        />
                      </Link>
                    </div>
                    <div className="quizzes-taken">
                      <p className="count">{allAttempts.length}</p>
                      <p className="label">/ taken</p>
                      <Link
                        to="/quizzes/taken"
                        className="link"
                        onClick={this.clearResults}
                      >
                        <ArrowIcon className="arrow" />
                      </Link>
                    </div>
                  </main>
                </section>
                <section className="achievements">
                  <h2 className="header-title">Achievements</h2>
                  <p className="text">
                    You have not earned any achievements yet.
                  </p>
                </section>
              </div>
              <aside className="side-top">
                <h2 className="header-title">Power-ups</h2>
                <main>
                  <div className="container">
                    <DoubleIcon className="icon" />
                    <p className="name">Multiplier</p>
                    <p className="amount">x8</p>
                  </div>
                  <div className="container">
                    <ParseIcon className="icon" />
                    <p className="name">Parser</p>
                    <p className="amount">x3</p>
                  </div>
                  <div className="container">
                    <ForgiveIcon className="icon present" />
                    <p className="name">Forgiving</p>
                    <p className="amount">x1</p>
                  </div>
                </main>
              </aside>
              <aside className="side-bottom">
                <h2 className="header-title">Leaderboards</h2>
                <main>
                  <div className="container">
                    <p className="username">wave_forms</p>
                    <p className="total">217</p>
                    <CoinIcon className="coin" />
                  </div>
                  <div className="container">
                    <p className="username">pillowlava</p>
                    <p className="total">138</p>
                    <CoinIcon className="coin" />
                  </div>
                  <div className="container">
                    <p className="username">malin_2</p>
                    <p className="total">74</p>
                    <CoinIcon className="coin" />
                  </div>
                </main>
              </aside>
            </div>
          )}
      </div>
      // <div className="dashboard-page">
      //   <h1>dashboard</h1>
      //   <Link to="/create-quiz" className="link">
      //     Create A Quiz
      //   </Link>
      //   <Link to="/my-quizzes" className="link">
      //     Take A Quiz
      //   </Link>
      // </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  username: state.auth.username,
  quizzes: state.quizzes.all,
  allAttempts: state.quizzes.allAttempts
})

export default connect(
  mapStateToProps,
  {
    startGetUserQuizzes,
    clearResults,
    clearQuizAttempt
  }
)(DashboardPage)
