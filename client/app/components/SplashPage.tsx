import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import TypeWriter from 'react-typewriter'
import MouseIcon from '../../public/icons/mouse-icon.svg'

const chars = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'C-',
  'D+',
  'D',
  'D-',
  'F+',
  'F',
  'F-',
  '100%',
  '99%',
  '94%',
  '91%',
  '87%',
  '85%',
  '77%',
  '74%',
  '67%',
  '64%',
  '62%',
  '59%',
  '58%',
  '33%',
  '23%',
  '14%',
  '8%',
  'true',
  'false'
]

interface IState {
  name: string
  points: string
}

export class SplashPage extends Component<any, any> {
  state = {
    verb: 'make   ',
    iteration: 1,
    dir: 1,
    char: 'a',
    name: false,
    secretQuiz: ['false', 'false', 'false']
  }

  questionPool1: any = [
    {
      question: 'What comes after 0?',
      answers: ['0.1', '0.00001', 'a surreal number']
    },
    {
      question: '',
      answers: {}
    },
    {
      question: '',
      answers: {}
    }
  ]

  questionPool2: any = [
    {
      question: 'Would you rather live forever, or never have existed at all?',
      answers: ['live forever', 'never existed at all']
    },
    {
      question: '',
      answers: []
    },
    {
      question: '',
      answers: []
    }
  ]
  questionPool3: any = [
    {
      question:
        'Would you rather have a rewind button for your life, or a pause button?',
      answers: ['rewind button', 'pause button']
    },
    {
      question: '',
      answers: []
    },
    {
      question: '',
      answers: []
    }
  ]

  randomChar = () => chars[Math.floor(Math.random() * chars.length)]

  alternate = () => {
    const { iteration, dir } = this.state

    this.setState((prevState: any) => ({
      iteration: prevState.iteration + 1 < 3 ? prevState.iteration + 1 : 1,
      dir: this.state.dir === 1 ? -1 : 1
    }))

    if (this.state.iteration === 2)
      this.setState((prevState: any) => ({
        verb: prevState.verb === 'make ' ? 'take ' : 'make '
      }))
  }

  onFieldChange = ({ target }) => {
    let { name, value }: { name: keyof IState; value: string } = target
    this.setState({
      [name]: value
    } as any)
  }

  // @ts-ignore
  componentDidMount = () =>
    this.setState({
      char: this.randomChar()
    })

  // @ts-ignore
  render = () => {
    const randomNum1 = 0
    const randomNum2 = 0
    const randomNum3 = 0
    const { verb } = this.state
    return (
      <div className="splash-page">
        <header>
          <nav className="splash-nav">
            <Link to="/" className="item">
              Quizzard
            </Link>
            <Link to="/login" className="item">
              Login
            </Link>
            <p>or</p>
            <Link to="/signup" className="item">
              Signup
            </Link>
          </nav>
          <div className="title-container">
            <TypeWriter
              className="verb"
              minDelay={400}
              maxDelay={800}
              typing={this.state.dir}
              onTypingEnd={this.alternate}
            >
              {verb}
            </TypeWriter>
            <p className="static"> Quizzes</p>
          </div>
          <form
            className="easy-5"
            onChange={() => this.setState({ name: true })}
          >
            <div className="group">
              <label htmlFor="name">name</label>
              <input type="text" name="name" />
            </div>
            <div className="group">
              <label htmlFor="date">date</label>
              <input type="text" name="date" placeholder="DD/MM/YYYY" />
            </div>
          </form>
          <div className="scroll-link">
            <MouseIcon />
          </div>
        </header>
        <main>
          <section className="topics" />
          <section className="row top">
            <div className="text-block">
              <h3>Create quizzes</h3>
              <h2>Build quizzes at the click of a button</h2>
              <p>
                Create questions and configure the type and score of the
                answers.
              </p>
            </div>
            <div className="panel" />

            <form
              className="question"
              onChange={() => {
                let quiz = this.state.secretQuiz
                quiz[0] = 'true'
                this.setState({ secretQuiz: quiz })
              }}
            >
              <label className="title">
                {this.questionPool1[randomNum1].question}
              </label>
              {this.questionPool1[randomNum1].answers.map(answer => (
                <label key={answer} className="container">
                  <input type="radio" name="radio" value="Incorrect" />
                  <p className="reason">{answer}</p>
                  <span className="checkmark" />
                </label>
              ))}
            </form>
          </section>
          <section className="strip" />
          <section className="row middle">
            <div className="text-block">
              <h3>Take quizzes</h3>
              <h2>Take quizzes created by others or test your own</h2>
              <p>
                With enough high scores, you might even place in the
                leaderboards.
              </p>
            </div>
            <div className="panel" />

            <form
              className="question"
              onChange={() => {
                let quiz = this.state.secretQuiz
                quiz[1] = 'true'
                this.setState({ secretQuiz: quiz })
              }}
            >
              <label className="title">
                {this.questionPool2[randomNum2].question}
              </label>
              {
                this.questionPool2[randomNum2].answers.map(answer => (
                  <label key={answer} className="container">
                    <input type="radio" name="radio" value="Incorrect" />
                    <p className="reason">{answer}</p>
                    <span className="checkmark" />
                  </label>
                )) as any
              }
            </form>
          </section>
          <section className="strip" />
          <section className="row bottom">
            <div className="text-block">
              <h3>Earn rewards</h3>
              <h2>Use power-ups to help on difficult questions</h2>
              <p>The better you do on quizzes, the more coins you receive.</p>
            </div>
            <div className="panel" />

            <form
              className="question"
              onChange={() => {
                let quiz = this.state.secretQuiz
                quiz[2] = 'true'
                this.setState({ secretQuiz: quiz })
              }}
            >
              <label className="title">
                {this.questionPool3[randomNum3].question}
              </label>
              {this.questionPool3[randomNum3].answers.map(answer => (
                <label key={answer} className="container">
                  <input type="radio" name="radio" value="Incorrect" />
                  <p className="reason">{answer}</p>
                  <span className="checkmark" />
                </label>
              ))}
            </form>
          </section>
          {/* <Link to="/signup" className="item">
          Signup
        </Link> */}
          {this.state.name && (
            <button
              className="secret-button"
              onClick={() => {
                let points = 0
                const { secretQuiz, name } = this.state
                if (name) points += 5
                const answered = secretQuiz.filter(bool => bool === 'true')
                  .length

                const grade = answered * 5
                points += grade
                localStorage.secretQuiz = points
                this.props.history.push('/signup')
              }}
            >
              Save quiz and Sign up!
            </button>
          )}
        </main>
        <footer>
          <p>Quizzard Copyright © 2018</p>
        </footer>
      </div>
    )
  }
}

export default connect()(SplashPage)
