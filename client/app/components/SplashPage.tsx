import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios';
import Querystring from 'query-string';

/** Get the code from the social signin */
const uri = document.location.href;
// console.log(uri);
/** Start after access_token= */
const startIndex = uri.indexOf('access_token=') + 13;
/** End on & before id_token= */
const endIndex = uri.indexOf('id_token=') - 1;
const access_token = uri.slice(startIndex, endIndex);
console.log(access_token);

// Axios.get("https://quizard.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=https://localhost:3222/dashboard")
//   .then(resp => {
//     localStorage.setItem('location', resp.data.Location);
//   })

// const postData = Querystring.stringify({
//   'grant_type': 'authorization_code',
//   'client_id': '1q83lmu6khfnc0v8jjdrde9291',
//   'code': AUTHORIZATION_CODE,
//   // 'redirect_uri': 'https://quizard.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=http://localhost:3222/',
//   'redirect_uri': 'localhost:3222/dashboard'
// })
// const axiosConfig = {
//   'headers': {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     // 'Authorization': 'Basic MXE4M2xtdTZraGZuYzB2OGpqZHJkZTkyOTE='
//   }
// }

// Axios.post("https://quizard.auth.us-east-2.amazoncognito.com/oauth2/token", postData, axiosConfig)
//   .then(resp => {
//     localStorage.setItem('access_token', resp.data.access_token);
//     localStorage.setItem('id_token', resp.data.id_token);
//     localStorage.setItem('type', resp.data.type);
//     localStorage.setItem('expire', resp.data.expire);
//   })
//   .catch(err => {
//     console.log(err);
//   })

const axiosConfig = {
  'headers': {
    'Authorization': `Bearer ${access_token}`
  }
}
Axios.get('https://quizard.auth.us-east-2.amazoncognito.com/oauth2/userInfo', axiosConfig)
  .then(resp => {
    const stringResp = JSON.stringify(resp.data);
    localStorage.setItem('token', stringResp);
    localStorage.setItem('name', JSON.stringify(resp.data.name));
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
