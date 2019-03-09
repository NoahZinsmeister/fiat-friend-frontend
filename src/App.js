import React from 'react';
import firebase from 'firebase'
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import './App.css';
import Splash from './components/Splash'
import VenmoGenerator from './components/VenmoGenerator'
import RevolutGenerator from './components/RevolutGenerator'
import Dashboard from './components/Dashboard'

const config = {
  apiKey: "AIzaSyA01UMyTQPEFmHvPc49LRm8J-cY185PDrE",
  authDomain: "fiatfriends.firebaseapp.com",
  databaseURL: "https://fiatfriends.firebaseio.com",
  projectId: "fiatfriends",
  storageBucket: "fiatfriends.appspot.com",
  messagingSenderId: "887264308370"
}


const theme = createMuiTheme({ typography: { useNextVariants: true } });

export default function App () {
  return (
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <header className="App-header">
              <Switch>
                <Route
                  exact path="/"
                  render={() => <Splash />}
                />
                <Route
                  exact path="/venmo"
                  render={() => <VenmoGenerator />}
                />
                <Route
                  exact path="/revolut"
                  render={() => <RevolutGenerator />}
                />
                <Route
                  exact path="/dashboard/:provider"
                  render={({ match }) => <Redirect to={{ pathname: '/dashboard', state: { provider: match.params.provider } }} />}
                />
                <Route
                  exact path="/dashboard"
                  render={({ location }) => {
                    return (<Dashboard provider={location.state && location.state.provider}/>)
                  }}
                />
                <Redirect to='/' />
              </Switch>
            </header>
          </div>
        </Router>
      </ThemeProvider>
    </FirebaseDatabaseProvider>
  );
}
