import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingScreen from 'react-loading-screen'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'
import Axios from 'axios'
import { environment } from '../../../environment'

export class SetupLogin extends Component {
  componentDidMount() {
    setTimeout(this.setToken, 4000)
  }

  /***********************************************************************************
   * PROCESS OF PULLING CODE FROM URL
   ***********************************************************************************/
  setToken = () => {
    const uri = document.location.href
    // console.log(uri);
    /** Pull code from url */
    const startAccessIndex = uri.indexOf('code=') + 5
    let code = uri.slice(startAccessIndex)
    const hashIndex = code.lastIndexOf('#')
    if (hashIndex !== -1) code = code.slice(0, hashIndex)
    console.log('code:\n' + code)
    /***********************************************************************************/

    /***********************************************************************************
     * AUTHORIZE USER (probably dont need this but whatever)
     ***********************************************************************************/
    let redirectUrl =
      process.env.NODE_ENV === 'production'
        ? `${environment.context}/redirect`
        : `${environment.context}/redirect/__webpack_hmr`

    // fetch(`https://quizard.auth.us-east-2.amazoncognito.com/authorize?response_type=code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${
    //         redirectUrl}`)
    //   .then(resp => {
    //     console.log('Authorize', resp)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    /***********************************************************************************/

    /***********************************************************************************
     * RETRIEVE TOKENS (axios does not work when posting code to retrieve tokens. will get 405)
     ***********************************************************************************/

    let bodyParams = {
      grant_type: 'authorization_code',
      client_id: '1q83lmu6khfnc0v8jjdrde9291',
      redirect_uri: redirectUrl,
      code: code
    }
    const searchParams = Object.keys(bodyParams)
      .map(key => {
        return (
          encodeURIComponent(key) + '=' + encodeURIComponent(bodyParams[key])
        )
      })
      .join('&')
    // let bodyParams = `grant_type=authorization_code&client_id=1q83lmu6khfnc0v8jjdrde9291&redirect_uri=${redirectUrl}&code=${code}`;
    fetch('https://quizard.auth.us-east-2.amazoncognito.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: searchParams
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log('tokens', resp)
        localStorage.setItem('access_token', resp.access_token)
        localStorage.setItem('id_token', resp.id_token)
        localStorage.setItem('refresh_token', resp.refresh_token)

        const axiosConfig1 = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        Axios.get(
          'https://quizard.auth.us-east-2.amazoncognito.com/oauth2/userInfo',
          axiosConfig1
        )
          .then(resp => {
            console.log('user info', resp)
            const stringResp = JSON.stringify(resp.data)
            localStorage.setItem('userInfoToken', stringResp)
            localStorage.setItem('name', JSON.stringify(resp.data.name))

            window.location.href =
              process.env.NODE_ENV === 'production'
                ? (window.location.href = `${environment.context}/dashboard`)
                : `${environment.context}/dashboard/__webpack_hmr`

            // working
            window.location.href = `${environment.context}/dashboard`
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // @ts-ignore
  render = () => {
    return (
      <div>
        <LoadingScreen
          loading={true}
          bgColor="#42a6a6"
          spinnerColor="#fcfeff"
          textColor="#ffffff"
          logoSrc="https://vignette.wikia.nocookie.net/2007scape/images/5/59/Blue_wizard_hat_%28t%29_detail.png/revision/latest?cb=20180514220409"
          text="Welcome to the World of Quizzard!"
        />
      </div>
    )
  }
}

export default connect(
  null,
  { startCreateNewQuiz }
)(SetupLogin)
