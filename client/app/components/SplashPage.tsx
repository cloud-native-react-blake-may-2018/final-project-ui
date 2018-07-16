import React, { Component } from 'react'
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

export class SplashPage extends Component {
  state = {
    verb: 'make   ',
    iteration: 1,
    dir: 1,
    char: 'a'
  }

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

  // @ts-ignore
  componentDidMount = () =>
    this.setState({
      char: this.randomChar()
    })

  // @ts-ignore
  render = () => {
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
          <form className="easy-5">
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
        <main />
      </div>
    )
  }
}

export default SplashPage
