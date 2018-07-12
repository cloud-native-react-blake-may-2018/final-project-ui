import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
// import Querystring from 'query-string'

export class SplashPage extends Component {
  // @ts-ignore
  componentDidMount = () => console.log('environment: ', process.env.NODE_ENV)

  // @ts-ignore
  render = () => {
    return (
      <div>
        <header>
          <nav className="splash-nav">
            <Link to="/" className="item">
              Logo
            </Link>
            <Link to="/login" className="item">
              Login
            </Link>
            <Link to="/signup" className="item">
              Signup
            </Link>
          </nav>
        </header>
        <main className="splash-body">
          <h1>{'<App name>'}</h1>
          <p>Create and take quizzes</p>
          <p>{'<splash page image>'}</p>
        </main>
      </div>
    )
  }
}

export default SplashPage
