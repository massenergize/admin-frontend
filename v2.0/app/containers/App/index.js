import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import firebase, { googleProvider, facebookProvider } from './fire-config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { redLoadUser } from './../../components/Forms/ReduxAuthActions';
import { apiCall } from './../../utils/messenger';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
import {reduxCallIdToken} from './../../../app/redux/redux-actions/adminActions';

const localUser = localStorage.getItem('authUser');
// check local storage to see if user exists, 
//while checking onAuthStateChanged with firebase, 
//if local storage is positive, move on the the homepage, 
//if firebase is positive, replace the localStorage with firebase return value 
// if all is negative, redirect to login 
//while logging in, save user to local storage  
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localUser ? JSON.parse(localUser) : null,
      error: null
    };
    this.signOut = this.signOut.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.normalLogin = this.normalLogin.bind(this);
  }


  componentDidMount() {
    this.authListener();
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("authUser");
      localStorage.removeItem("idToken");
      this.setState({ user: null, error: null });
      console.log("I have signed out");
    });
  }

  loginWithFacebook = () => {
    firebase.auth().signInWithPopup(facebookProvider).then(res => {
      localStorage.setItem('authUser', JSON.stringify(res.user));
      this.setState({ user: res.user });
    })
      .catch(err => {
        console.log('Error', err);
        this.setState({ error: err });
      });
  }

  loginWithGoogle = () => {
    firebase.auth().signInWithPopup(googleProvider).then(res => {
      
      apiCall("/auth.verify").then(u =>{
        console.log("I am the user profile",u);
      });
      localStorage.setItem('authUser', JSON.stringify(res.user));
      localStorage.setItem('idToken', JSON.stringify(idToken));
      this.setState({ user: res.user });
    }) 
      .catch(err => {
        console.log('Error', err);
        this.setState({ error: err });
      });
  }

  normalLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
      this.setState({ user: res.user });
    })
      .catch(err => {
        console.log('Error:', err.message);
        this.setState({ error: err });
      });
  }

  getAuthenticatedUserProfile = () => {

  }

  getIDToken(){
    if(firebase){
      firebase.auth().currentUser.getIdToken(true).then(token =>{
        console.log("I am the token",token);
        localStorage.setItem('idToken',token.toString()); 
        //set it to redux
      })
      .catch(err=>{
        localStorage.setItem('idToken','null'); 
        console.log(err);
      })
    }
  }
  authListener() {
    if (firebase) {
      firebase.auth().onAuthStateChanged(u => {
        this.props.reduxCallIdToken();
        if (u) {
          console.log("I am the listen", u);
          localStorage.setItem('authUser', JSON.stringify(u));
          //will be removed later
          this.setState({ user: u });
        }
      });
    }
  }

  render() {
    const { user, error } = this.state;

    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode) => (
            <Switch>
              <Route
                path="/login"
                exact
                render={(props) => (
                  <LoginDedicated
                    {...props}
                    signOutFxn={this.signOut}
                    error={error}
                    user={user}
                    normalLoginFxn={this.normalLogin}
                    loginWithFacebookFxn={this.loginWithFacebook}
                    loginWithGoogleFxn={this.loginWithGoogle}
                  />
                )}
              />
              <Route
                path="/logout"
                exact
                render={(props) => (
                  <LoginDedicated
                    {...props}
                    signOutFxn={this.signOut}
                    error={error}
                    user={user}
                    normalLoginFxn={this.normalLogin}
                    loginWithFacebookFxn={this.loginWithFacebook}
                    loginWithGoogleFxn={this.loginWithGoogle}
                  />
                )}
              />


              {/* <Route path="/login" exact render={(props) => <LoginDedicated {...props} signOutFxn={this.signOut.bind(this)} user={this.state.user} error={this.state.error} normalLoginFxn={this.normalLogin.bind(this)} loginWithFacebookFxn={this.loginWithFacebook.bind(this)} loginWithGoogleFxn={this.loginWithGoogle.bind(this)} />} /> */}
              {user
                && (
                  <Route
                    path="/"
                    render={(props) => <Application {...props} changeMode={changeMode} signOut = {this.signOut} />}
                  />
                )
              }
              {!user
                && (
                  <Route
                    path="/"
                    exact
                    render={(props) => (
                      <LoginDedicated
                        {...props}
                        signOutFxn={this.signOut}
                        error={error}
                        user={user}
                        normalLoginFxn={this.normalLogin}
                        loginWithFacebookFxn={this.loginWithFacebook}
                        loginWithGoogleFxn={this.loginWithGoogle}
                      />
                    )}
                  />
                ) 
              }
 
              {/* <Route
                path="/admin"
                render={(props) => <Application {...props} changeMode={changeMode} signOut = {this.signOut}/>}
              /> */}
              <Route component={Auth} />
              <Route component={NotFound} />
            </Switch>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    reduxCallIdToken: reduxCallIdToken
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
