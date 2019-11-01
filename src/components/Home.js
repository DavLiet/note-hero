import React, { Component } from 'react';
import './Home.css';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    componentDidMount() {

    }


    render() {
        return (
            <div id="homepage">
                <img src={require("./cartoon.png")} />

                <h1 style={{ color: '#34495e', textDecoration: 'none' }}>Welcome to NoteHero</h1>
                <h3>We've all been there before...</h3>
                <h3>You're professor hands you printed out notes that you then conveniently store at the bottom of your book bag along with all the additional handouts from other classes. Weeks later, you then find yourself frantically searching for that <i>one</i> handout for the upcoming exam. </h3>
                <h3>Using NoteHero, you can avoid this scenario by easily saving and editing your printed notes for later use.</h3>
                <h3>Simply upload a picture of your notes, and we'll take care of the rest so you can go back to focusing on what matters most.</h3>
            </div>
        );
    }
}

export default Home;