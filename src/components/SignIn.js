import React, { Component } from 'react';
import './SignIn.css';
// import firebase from 'firebase';
import { auth } from '../firebase';
import { withRouter } from "react-router-dom";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.submitSignIn = this.submitSignIn.bind(this);
        this.state = {
            email: '',
            password: '',
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitSignIn(e) {
        e.preventDefault();

        // var { auth } = this.props.location.state;
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            console.log("SUCCESSFUL SIGNIN");
            this.props.history.push("/09-final-project-david_lie-tjauw/");
            console.log(`USER: ${auth.currentUser}`)

        }).catch((e) => { alert(`The following errror occurred: \n ${e}`) })

    }

    render() {
        return (
            <div id="signIn">
                <h1 style={{ color: '#34495e', textDecoration: 'none' }}>Sign In to NoteHero</h1>
                <form onSubmit={this.submitSignIn}>
                    <input class="signInField" name="email" onChange={this.onChange} type="text" placeholder="Email Address" />
                    <input class="signInField" name="password" onChange={this.onChange} type="text" placeholder="Password" />
                    <button id="signInButton" type="submit">Sign In</button>
                </form>
            </div>
        );
    }
}

export default withRouter(SignIn);
