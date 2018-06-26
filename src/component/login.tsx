import * as React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@blueprintjs/core';
import VirtualKeyboard from './virtualKeyboard';
import s from '../language/login/en';
import gs from '../language/common/en';
import Footer from './footer';
import Button from './button';

const headerLogo = require('../assets/images/headerLogo.png');

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
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <img className="loginLogo" src={headerLogo} alt="autorecon logo"/>
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;