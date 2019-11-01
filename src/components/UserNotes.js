import React, { Component } from 'react';
import axios from 'axios';
import './UserNotes.css';
import { auth } from '../firebase';
import firebase from '../firebase';
import NoteThumbnail from './NoteThumbnail';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { throws } from 'assert';

// var firebase = require('firebase');


class UserNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            username: ``,
        }

        var storageRef = firebase.storage().ref();
        this.storageRef = storageRef;

        var database = firebase.database();
        this.database = database;

        this.deleteNote = this.deleteNote.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.updateNoteText = this.updateNoteText.bind(this);

        console.log(firebase.auth().currentUser)
    }


    getUsername() {
        let userName;

        // while (auth === null) {
        //     console.log("loading")
        // }
        // userName = auth.currentUser.email.split('@')[0];
        return userName;
    }

    // componentWillMount

    getPosts(username) {


        let user = username.split('@')[0];
        this.setState({ username: user })


        this.database.ref(user).on("value", function (snapshot) {
            console.log('USER NOTES IS BEING RETRIEVED AGAIN')
            // console.log(snapshot.child('text').key.val())
            // console.log(snapshot.child('imgURL').val())

            let tempArr = []
            // console.log(snapshot.child('text').val())
            // console.log(snapshot.child('title').val())
            if (snapshot.hasChildren()) {
                snapshot.forEach((el) => {
                    let post = {
                        'key': el.key,
                        'text': el.child('text').val(),
                        'imgURL': el.child('imgURL').val(),
                        'title': el.child('title').val()
                    }
                    tempArr.push(post)
                    this.setState({ posts: [...this.state.posts, post] })

                })
            }

            this.setState({ posts: [...tempArr] })


        }.bind(this))
    }
    componentDidMount() {
        auth.onAuthStateChanged((authUser) => {
            authUser
                ? this.getPosts(authUser.email)
                : this.setState({ userName: null })

        })
    }


    deleteNote(uniqueKey) {
        // console.log(this.getUsername())
        this.database.ref(`${this.state.username}/${uniqueKey}`).remove().then(() => { console.log(`Successful deletion: ${uniqueKey}`) }).catch(() => { console.log("There was an error when deleetintgf....") })

        this.state.posts.forEach((post, index) => {
            if (post.key === uniqueKey) {
                this.setState({
                    posts: this.state.posts.filter((_, i) => i !== index)
                });
            }
        })
    }

    updateNoteText(key, textVal) {
        this.state.posts.forEach((post) => {
            if (post.key === key) {
                post.text = textVal;
            }
        })
    }




    render() {
        return (
            <div id="posts">
                {this.state.posts.map((post, i) => {
                    console.log(post.key)
                    return (

                        <NoteThumbnail deleteAction={this.deleteNote} key={post.key} uniqueKey={post.key} text={post.text} imgURL={post.imgURL} title={post.title} />
                    );
                })}
            </div>
        );
    }
}

export default UserNotes;
