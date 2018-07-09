import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';

/** Get the code from the social signin */
const uri = document.location.href;
// console.log(uri);
const index = uri.indexOf('code=') + 5;
const AUTHORIZATION_CODE = uri.slice(index,uri.length);
// console.log(code);

Axios.post("https://quizard.auth.us-east-2.amazoncognito.com/oauth2/token", {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic aSdxd892iujendek328uedj',

    'grant_type': 'authorization_code',
    'client_id': '1q83lmu6khfnc0v8jjdrde9291',
    'code': AUTHORIZATION_CODE,
    'redirect_uri': 'localhost:3222/dashboard'
    }
  })
  .then(resp => {
    localStorage.setItem('access_token', resp.data.access_token);
    localStorage.setItem('id_token', resp.data.id_token);
    localStorage.setItem('type', resp.data.type);
    localStorage.setItem('expire', resp.data.expire);
  })
  .catch(err => {
    console.log(err);
  })

export const SplashPage = () => (
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

export default SplashPage
