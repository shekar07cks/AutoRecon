import * as React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@blueprintjs/core';
import VirtualKeyboard from './virtualKeyboard';
import s from '../language/login/en';
import gs from '../language/common/en';
import Footer from './footer';
import Button from './button';

const headerLogo = require('../assets/images/headerLogo.png');
const loginBanner = require('../assets/images/loginBanner.jpg');

interface ILoginState {
  isEnabled: boolean;
}

interface ILoginProps { }

class Login extends React.Component<ILoginProps,
  ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      isEnabled: true
    };
  }

  toggleVirtualKeyboard = () => {
    this.setState({ isEnabled: !this.state.isEnabled });
  }

  render() {
    return (
      <div className="login verticalhorizontalMiddle">
        <div className="loginContainer row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <img className="loginLogo" src={headerLogo} alt="autorecon logo"/>
            {/* <VirtualKeyboard className="m-t-20 hideVirtualKeyboard" inputType={gs.text} label={gs.BusinessArea}/> */}
            <VirtualKeyboard className={(this.state.isEnabled ? '' : ' hideVirtualKeyboard')} inputType={gs.Text} label={gs.UserName}/>
            <VirtualKeyboard className={(this.state.isEnabled ? '' : ' hideVirtualKeyboard')} inputType={gs.Password} label={gs.Password}/>
            <div className="row loginFooter">
              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 no-padding">
                <Checkbox checked={this.state.isEnabled} onClick={this.toggleVirtualKeyboard}>
                  Virtual Keyboard
              </Checkbox>
              </div>
              <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 no-padding">
              <Link to="/DataTable"><Button className="defaultButton primaryButton pt-large" >{s.Login}</Button></Link>
              </div>
            </div>
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 loginSlider">
              <img src={loginBanner} alt="autorecon logo" />
            <div className="securityInformation">
              <h4>Important security information</h4>
                <ul>
                  <li>Before logging in, please ensure that the URL address on the address bar of your internet browser starts with https:</li>
                  <li>Never provide your User ID or password to any one on phone or in response to a mail</li>
                  <li>Do not enter login or other sensitive information in any pop up window</li>
                  <li>Verify the site's security certificate by clicking on the padlock icon of your internet browser.</li>

                </ul>
            </div>  
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;