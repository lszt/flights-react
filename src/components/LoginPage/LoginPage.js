import React, { Component } from 'react';
import './LoginPage.scss';
import LabeledComponent from '../LabeledComponent';
import auth from '../../util/auth';
import { authenticate } from '../../util/firebase';

class LoginPage extends Component {

  render() {
    const { username, password, submitting, failure, updateUsername, updatePassword } = this.props;
    const logoImagePath = require('../../resources/mfgt_logo_transp.png');
    const usernameInput = (
      <input
        type="text"
        value={username}
        autoFocus={true}
        readOnly={submitting}
        onChange={e => { updateUsername(e.target.value); }}
      />
    );
    const passwordInput = (
      <input
        type="password"
        value={password}
        readOnly={submitting}
        onChange={e => { updatePassword(e.target.value); }}
      />
    );
    return (
      <div className="LoginPage">
        <header>
          <a href="#/"><img className="logo" src={logoImagePath}/></a>
        </header>
        <div className="main">
          <form onSubmit={this.submitLogin.bind(this)} disabled={this.props.submitting}>
            <LabeledComponent label="Benutzername" component={usernameInput}/>
            <LabeledComponent label="Passwort" component={passwordInput}/>
            <div className="failure">{failure ? 'Login fehlgeschlagen' : '\u00a0'}</div>
            {this.props.showCancel === true && <button type="button" onClick={this.props.onCancel}>Abbrechen</button>}
            <button type="submit" disabled={submitting || username.length === 0 || password.length === 0}>
              <i className="material-icons">send</i>&nbsp;Anmelden
            </button>
          </form>
        </div>
      </div>
    );
  }

  submitLogin(e) {
    e.preventDefault();
    this.props.authenticate(this.props.username, this.props.password);
  }
}

LoginPage.propTypes = {
  authenticate: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  showCancel: React.PropTypes.bool.isRequired,
  username: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  failure: React.PropTypes.bool.isRequired,
};

export default LoginPage;
