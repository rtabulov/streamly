import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut, signIn } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/userinfo.email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) return null;
    if (!this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.auth.signIn}>
          <i className="google icon"></i>
          sign in
        </button>
      );
    }

    return (
      <button className="ui red google button" onClick={this.auth.signOut}>
        <i className="google icon"></i>
        sign out
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { isSignedIn: auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
