import React from 'react'
import { Link } from 'react-router-dom'

let redirectUrl = 'https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/?code=1055adc3-2668-4679-9fe0-731f518e5485'
// Old routes: "/login"

export const SplashPage = () => (
  <div>
    <header>
      <nav className="splash-nav">
        
        <Link to="/" className="item">
          Logo
        </Link>
        <Link to={redirectUrl} className="item">
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

export default SplashPage
