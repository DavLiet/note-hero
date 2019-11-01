import React, { Component } from 'react';
import axios from 'axios';
import './ImageForm.css';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'



var firebase = require('firebase');


class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableText: null,
      currFileUrl: null,
      title: null,
      isFetching: false,
    }
    this.handleFile = this.handleFile.bind(this)
    this.makeRequest = this.makeRequest.bind(this)
    this.saveText = this.saveText.bind(this)
    this.updateText = this.updateText.bind(this)
    this.updateTitle = this.updateTitle.bind(this)


    var storageRef = firebase.storage().ref();
    this.storageRef = storageRef;

    var database = firebase.database();
    this.database = database;



  }


  saveText() {
    let textToSave = this.state.editableText;
    let imageURL = this.state.currFileUrl;
    let titleToSave = this.state.title;
    if (textToSave && imageURL && titleToSave) {


      let userName = auth.currentUser.email.split('@')[0];
      this.database.ref(`${userName}`).push({
        text: `${textToSave}`,
        imgURL: `${imageURL}`,
        title: `${titleToSave}`
      }).then(() => {
        console.log("Text successfully saved")
        this.setState({
          editableText: '',
          title: '',
          currFileUrl: null,
          isFetching: false
        })
      });
    }
    else {
      alert("Please fill out all fields")
    }
  }

  makeRequest(url) {
    let body = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": url
            }
          },
          "features": [
            {
              "type": "TEXT_DETECTION",
              "maxResults": 10,
            }
          ],
        }
      ]
    }
    axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCwP9xFPEqrxkOySq8r5GQ0Cyz-HUClmo0', body)
      .then((response) => {
        console.log("DONE")
        this.setState({ editableText: response.data.responses[0].fullTextAnnotation.text })
        document.getElementById("editThis").value = this.state.editableText;

        this.setState({ isFetching: false })
        // console.log((response.data.responses[0].fullTextAnnotation.text))
      }).catch((err) => {
        console.log(err)
        this.setState({ isFetching: false })

      });
  }

  updateText(e) {
    this.setState({ editableText: e.target.value })
  }

  updateTitle(e) {
    // this.setState({ title: document.getElementById("title").value })
    this.setState({ title: e.target.value })

  }

  handleFile(e) {

    this.setState({ isFetching: true })

    var uploadedFile = e.target.files[0]

    this.storageRef.child('images/' + uploadedFile.name).put(uploadedFile).then(function (snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log('File metadata:', snapshot.metadata);
      // Let's get a download URL for the file.
      snapshot.ref.getDownloadURL().then(function (url) {
        console.log('File available at', url);
        this.setState({ currFileUrl: url })
        this.makeRequest(url)
      }.bind(this));
    }.bind(this)).catch(function (error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
    // console.log(url)
    // this.makeRequest(url)


  }
  render() {
    return (
      <div id="ImageForm">
        <div id="directions">
          <h1 style={{ color: '#34495e', textDecoration: 'none', textAlign: 'center' }}>Upload Your Notes to NoteHero</h1>
          <p>NoteHero uses the power of Machine Learning to <i>extract</i> text from pictures of your class notes.</p>
          <p>To start, simply upload a picture of your class notes and then NoteHero will take care of the rest!</p>
        </div>
        {this.state.isFetching ? <FontAwesomeIcon icon={faSync} size="6x" id="loadingIndicator" spin /> : null}
        <button id="saveText" onClick={this.saveText}>Save Text</button>
        <input type="file" accept="image/*" id="file-input" onChange={this.handleFile} />
        <textarea id="editThis" value={this.state.editableText} onChange={this.updateText} placeholder="Your Notes Here..." cols="50" rows="25"></textarea>
        <input type="text" id="title" value={this.state.title} placeholder="Notes Title" onChange={this.updateTitle} />
      </div>
    );
  }
}

export default ImageForm;
