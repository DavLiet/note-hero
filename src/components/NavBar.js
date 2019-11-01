import React, { Component } from 'react';
import './NavBar.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
import { auth } from '../firebase';
import { withRouter } from "react-router-dom";



class NavBar extends Component {

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        auth.signOut().then(function () {
            this.props.history.push("/09-final-project-david_lie-tjauw/");
            console.log(this.props)
            console.log("Logged Out!")
        }.bind(this)).catch(function (e) { alert(`There was an error signing you out: ${e}`) }.bind(this))
    }



    render() {
        return (
            <div id="NavBar">
                <Link id="home" to="/09-final-project-david_lie-tjauw/">
                    <h2 id="titleNav">NoteHero</h2>
                </Link>
                {this.props.authState ?
                    <div id="options">
                        <Link className="navLink" to="/09-final-project-david_lie-tjauw/uploadNotes">Upload Notes</Link>
                        <Link className="navLink" to="/09-final-project-david_lie-tjauw/viewNotes">View Notes</Link>
                        <button id="signoutBtn" onClick={this.signOut}>Sign Out</button>
                    </div>
                    :
                    <div id="options">
                        <Link className="navLink" to="/09-final-project-david_lie-tjauw/signIn">Sign In</Link>
                        <Link className="navLink" to="/09-final-project-david_lie-tjauw/signUp">Sign Up</Link>
                    </div>
                }


            </div>
        );
    }
}

export default withRouter(NavBar);
