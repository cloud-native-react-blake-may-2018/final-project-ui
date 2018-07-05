import React, { Component } from 'react'
import { Link } from 'react-router-dom'

interface IState {
  
}

export class ResetPasswordPage extends Component<null, IState> {
  state = {

  }

// public forgotPassword = () => {
//     CognitoUser.forgotPassword({
//         onSuccess: result => {
//             console.log('call result: ' + result);
//         },
//         onFailure: err => {
//             alert(err);
//         },
//         inputVerificationCode() {
//             let verificationCode = prompt('Please input verification code ' ,'');
//             let newPassword = prompt('Enter new password ' ,'');
//             cognitoUser.confirmPassword(verificationCode, newPassword, this);
//         }
//     });
// }

}