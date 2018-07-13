import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { startCreateNewQuiz } from '../actions/create'
import Axios from '../../../node_modules/axios';
import { environment } from '../../../environment'
import LoadingScreen from 'react-loading-screen';

export class SetupLogin extends Component {
  componentDidMount () {
    setTimeout(this.setToken, 4000)
  }

/***********************************************************************************
 * PROCESS OF PULLING TOKEN FROM URL
 ***********************************************************************************/
  setToken = () => {
    const uri = document.location.href;
      // console.log(uri);
      /** Start after access_token= */
      const startAccessIndex = uri.indexOf('access_token=') + 13;
      /** End on & before id_token= */
      const endAccessIndex = uri.indexOf('&',startAccessIndex);
      const access_token = uri.slice(startAccessIndex, endAccessIndex);
      console.log("access_token:\n"+access_token);
      /** Start after id_token= */
      const startIdIndex = uri.indexOf('id_token=') + 9;
      /** End on & */
      const endIdIndex = uri.indexOf('&',startIdIndex);
      const id_token = uri.slice(startIdIndex, endIdIndex);
      console.log("id_token:\n"+id_token);
/***********************************************************************************/
     
  const axiosConfig = {
        'headers': {
          'Authorization': `Bearer ${access_token}`
        }
      }
  Axios.get('https://quizard.auth.us-east-2.amazoncognito.com/oauth2/userInfo', axiosConfig)
      .then(resp => {
        console.log('just before auth.')
        const stringResp = JSON.stringify(resp.data)
        localStorage.setItem('userInfoToken', stringResp)
        localStorage.setItem('name', JSON.stringify(resp.data.name))
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('token', id_token)

        window.location.href =
          process.env.NODE_ENV === 'production'
            ? (window.location.href = `${environment.context}/dashboard`)
            : `${environment.context}/dashboard/__webpack_hmr`

        // working
        // window.location.href = `${environment.context}/dashboard`
      })
       .catch(err => {
         console.log(err.stack);
      })
  }

  // @ts-ignore
  render = () => {
    return (
      <div>
        <LoadingScreen
          loading={true}
          bgColor='#42a6a6'
          spinnerColor='#fcfeff'
          textColor='#ffffff'
          logoSrc='https://vignette.wikia.nocookie.net/2007scape/images/5/59/Blue_wizard_hat_%28t%29_detail.png/revision/latest?cb=20180514220409'
          text='Welcome to the World of Quizzard!'
        /> 
     </div>
    
    )
  }
}
  
export default connect(
  undefined,
  { startCreateNewQuiz }
)(SetupLogin)