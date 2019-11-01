import React, { Component } from 'react';
import './NoteThumbnail.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class NoteThumbnail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgURL: '',
            title: '',
            uniqueKey: '',
            text: '',
        }
        this.deletePost = this.deletePost.bind(this);
        this.updateNoteText = this.updateNoteText.bind(this);
    }

    componentDidMount() {
        const { imgURL, title, uniqueKey, text } = this.props;
        this.setState({ imgURL })
        this.setState({ title })
        this.setState({ uniqueKey })
        this.setState({ text })
    }

    deletePost() {
        this.props.deleteAction(this.state.uniqueKey)
    }

    updateNoteText(key, textVal) {
        this.state.posts.forEach((post) => {
            if (post.key === key) {
                post.text = textVal;
            }
        })
    }

    render() {
        console.log(`notethumbnail: ${this.state.uniqueKey}`)
        return (
            <div id="thumbnail">
                <div class="header">
                    <h1>{this.state.title}</h1>
                    <button className="delete" onClick={this.deletePost}>Delete</button>
                    <Link className="seeNote" to={{
                        pathname: "/09-final-project-david_lie-tjauw/yourNote",
                        state: {
                            text: this.state.text,
                            key: this.state.uniqueKey,
                            title: this.state.title,
                        }
                    }}><button>View/Edit</button></Link>

                </div>
                <img src={this.state.imgURL} alt="Avatar" style={{ width: '100%' }} />
            </div>
        );
    }
}

export default NoteThumbnail;