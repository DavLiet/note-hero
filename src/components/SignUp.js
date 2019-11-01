import React, { Component } from 'react';
import './SignUp.css';
import { auth } from '../firebase';
import { withRouter } from "react-router-dom";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.submitSignIn = this.submitSignIn.bind(this);
        this.onChange = this.onChange.bind(this);


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitSignIn(e) {
        e.preventDefault();

        // var { auth } = this.props.location.state;
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.props.history.push("/09-final-project-david_lie-tjauw/");
        }).catch((e) => { alert(`The following errror occurred: \n ${e}`) })

    }

    render() {
        return (
            <div id="signUp">
                <h1 style={{ color: '#34495e', textDecoration: 'none' }}>Sign Up for NoteHero</h1>
                <form onSubmit={this.submitSignIn}>
                    <input class="signUpField" name="email" onChange={this.onChange} type="text" placeholder="Email Address" />
                    <input class="signUpField" name="password" onChange={this.onChange} type="text" placeholder="Password" />
                    <button id="signUpButton" type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default withRouter(SignUp);
