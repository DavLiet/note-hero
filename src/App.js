import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
// var firebase = require('firebase');
// import 'firebase/auth';
// import app from 'firebase/app';
import { auth } from './firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// navbar components
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserNotes from './components/UserNotes';
import ImageForm from './components/ImageForm';
import NavBar from './components/NavBar';
import YourNote from './components/YourNote';
import Home from './components/Home';

class App extends Component {

  constructor() {
    super()
    // app.initializeApp({
    //   apiKey: "AIzaSyBulew_BaByeY3dozl-MM537yQUS9-K8P8",
    //   authDomain: "final-project-4678c.firebaseapp.com",
    //   databaseURL: "https://final-project-4678c.firebaseio.com",
    //   projectId: "final-project-4678c",
    //   storageBucket: "final-project-4678c.appspot.com",
    //   messagingSenderId: "942991858994"
    // });

    // this.auth = app.auth();

    // this.registerUserEmailAndPassword = this.registerUserEmailAndPassword.bind(this);
    // this.signInUserEmailAndPassword = this.signInUserEmailAndPassword.bind(this);
    // this.signOut = this.signOut.bind(this);

    this.state = {
      authState: null,
    }

  }

  // registerUserEmailAndPassword(email, password) {
  //   this.auth.createUserWithEmailAndPassword(email, password);
  // }

  // signInUserEmailAndPassword(email, password) {
  //   this.auth.signInWithEmailAndPassword(email, password);
  // }

  // signOut() {
  //   this.auth.signOut();
  // }

  componentDidMount() {
    auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authState: authUser })
        : this.setState({ authState: null });

    }
    );
  }

  render() {
    console.log(`AUTH STATE: ${this.state.authState}`)
    return (
      <div className="App">
        <Router>
          <div id="app">
            <NavBar authState={this.state.authState} />
            {/* <Route path="/09-final-project-david_lie-tjauw/" component={Home} /> */}

            <Route exact path="/09-final-project-david_lie-tjauw/" component={Home} />
            <Route path="/09-final-project-david_lie-tjauw/signIn/" component={SignIn} />
            <Route path="/09-final-project-david_lie-tjauw/signUp/" component={SignUp} />
            <Route path="/09-final-project-david_lie-tjauw/uploadNotes/" component={ImageForm} />
            <Route path="/09-final-project-david_lie-tjauw/viewNotes/" component={UserNotes} />
            <Route path="/09-final-project-david_lie-tjauw/yourNote/" component={YourNote} />

          </div>
        </Router>
      </div >
    );
  }
}

export default App;
