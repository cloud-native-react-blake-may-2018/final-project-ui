import React from 'react'
import { Link } from 'react-router-dom'
import * as awsCognito from 'amazon-cognito-identity-js'
import AWS = require('aws-sdk')

// let redirectUrl = 'https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/?code=1055adc3-2668-4679-9fe0-731f518e5485'
// Old routes: "/login"

let id_token = location.hash.substr(1)
id_token && {
  AWS: AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:2bf920c2-7094-49a7-bfd0-eec2d6f36ee4',
    Logins: {
        'cognito-idp:us-east-2:492203503159:userpool/us-east-2_fMMquWRem': id_token
    }
  })
  
}
id_token && console.log(AWS.config.credentials)

export const SplashPage = () => (
  <div>
    <header>
      <nav className="splash-nav">
        
        <Link to="/" className="item">
          Logo
        </Link>
        <Link to={"/login"} className="item">
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
