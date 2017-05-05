import React, { Component } from "react";

import retrieveUuid from "../api/retrieveUuid";

import { Row } from "react-flexbox-grid";
import styled from "styled-components";

import firebaseui from "firebaseui";
import * as firebase from "firebase";

import Card from "./Card";

let successURL = "https://mydevoxx-dashboard.eu-gb.mybluemix.net/";
const mockSuccessURL = "http://localhost:3000/report";

const LoginPage = styled(Row)`
  height: 100%;
  width: 100%;
  flex: 1;
`;

const LoginCard = styled(Card)`
  margin-top: 2em;
  padding: 2em;
  width: 90%;
  max-width: 400px;
  padding-top: 1em;
  padding-bottom: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-bottom: 50px;
  & form {
    width: 100%;
  }
`;

if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  successURL = mockSuccessURL;
}

// Initialize the FirebaseUI Widget using Firebase.

// The start method will wait until the DOM is loaded.

class LoginForm extends Component {
  uiConfig = {
    signInSuccessUrl: successURL,
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "https://mydevoxx-dashboard.eu-gb.mybluemix.net/"
  };

  fbConfig = {
    apiKey: "AIzaSyC2U3FefH8JEC6403QqM-igdtuM2LGy1y8",
    authDomain: "devoxx-dashboard.firebaseapp.com",
    databaseURL: "https://devoxx-dashboard.firebaseio.com",
    projectId: "devoxx-dashboard",
    storageBucket: "devoxx-dashboard.appspot.com",
    messagingSenderId: "594341536588"
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      value: null,
      loading: false,
      loginError: false
    };
    firebase.initializeApp(this.fbConfig);
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.goFetchUUID = this.goFetchUUID.bind(this);
    this.logIn = this.logIn.bind(this);
    this.registerListeners = this.registerListeners.bind(this);
    this.registerListeners();
  }

  logIn() {
    this.ui.start("#firebaseui-auth-container", this.uiConfig);
  }

  goFetchUUID(email) {
    this.setState({ loading: true });
    retrieveUuid
      .getUUID(email)
      .then(uuid => {
        if (!uuid || uuid.length === 0) {
          this.setState({ loading: false });
          throw new Error("Missing UUID");
        }
        this.props.db.record.add({ id: "0", uuid: uuid });
        this.props.onSignIn().then(() => {
          this.setState({ redirect: true, loading: false });
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  registerListeners() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.

        let email = user.email;

        this.goFetchUUID(email);
      } else {
        // User is signed out.
      }
    }, function(error) {
      console.log(error);
    });
  }

  componentDidMount() {
    try {
      this.logIn();
    } catch (error) {
      this.setState({ loginError: true });
    }
  }
  render() {
    return (
      <section>
        <LoginPage center="xs" middle="xs">
          <LoginCard>
            <h3> Please login with your email </h3>
            {this.state.loginError &&
              <p>Error loading login, please try again later.</p>}
            <div id="firebaseui-auth-container" />
          </LoginCard>
        </LoginPage>
      </section>
    );
  }
}

export default LoginForm;