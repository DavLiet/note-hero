import React, { Component } from 'react';
import './YourNote.css';
import { auth } from '../firebase';
var firebase = require('firebase');

class YourNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            // text: this.props.location.state.text,
            text: '',
            key: this.props.location.state.key,
        }



        this.enableEditing = this.enableEditing.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.updateText = this.updateText.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.getText = this.getText.bind(this);

        var database = firebase.database();
        this.database = database;
    }

    getText(email, id) {

        console.log("Your text is being called;")
        console.log(`Here: ${email} and ${id}`)
        let user = email.split('@')[0];

        this.database.ref(`${user}/${id}`).on("value", function (snapshot) {
            this.setState({ text: snapshot.child('text').val() });
        }.bind(this))
    }

    componentDidMount() {
        auth.onAuthStateChanged((authUser) => {
            authUser
                ? this.getText(authUser.email, this.state.key)
                : this.setState({ text: '' })
        })
    }

    cancelChanges() {
        this.setState({ isEditing: false })
    }
    updateText(e) {
        this.setState({ text: e.target.value })
    }
    enableEditing() {
        this.setState({ isEditing: true })
    }

    submitChanges() {
        console.log(this.state.key)
        // overright text in firebase
        let userName = auth.currentUser.email.split('@')[0];

        this.database.ref(`${userName}/${this.state.key}`).update({
            text: this.state.text
        }).then(function () {

            // alert(this.props.location.state.updateNoteText)
            // this.props.location.state.updateNoteText(this.state.key, this.state.text)
            this.setState({ text: this.state.text })

            this.setState({ isEditing: false })
        }.bind(this))

    }

    render() {

        var displayedText = <div >
            <button class="noteButton" onClick={this.enableEditing}>Edit Text</button>
            <div id="displayText">
                <h1 id="noteTitle">{this.props.location.state.title}</h1>
                <p id="textToDisplay">{this.state.text}</p>
            </div>
        </div>


        var editingText = <div id="editText">
            <div>
                <button class="noteButton" onClick={this.submitChanges}>Submit Changes</button>
                <button class="noteButton" onClick={this.cancelChanges}>Cancel</button>
            </div>
            <textarea onChange={this.updateText} value={this.state.text}>
            </textarea>
        </div>

        return (
            <div id="yourNote">

                {this.state.isEditing ? editingText : displayedText}


            </div>
        )
    }
}



export default YourNote;