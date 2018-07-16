import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import dotenv from 'dotenv'

export class SplashPage extends Component {
  // @ts-ignore
  render = () => {
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
            <Link to="/signup" className="item">
              Signup
            </Link>
          </nav>
        </header>
        <main className="splash-body">
          <h1>Quizzard</h1>
          <p>And learn!</p>
        </main>
      </div>
    )
  }
}

export default SplashPage
