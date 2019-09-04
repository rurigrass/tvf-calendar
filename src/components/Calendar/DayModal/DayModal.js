import React, { Component } from "react";

import styles from "./DayModal.module.css";

class DayModal extends Component {
  // props.
  state = {
    newPost: ""
  };

  postInput = e => {
    this.setState({ newPost: e.target.value });
  };

  writePost = () => {
    this.props.addPost(this.props.date, this.state.newPost);
    this.setState({
      newPost: ""
    });
  };

  removePost = key => {
    this.props.removePost(key);
  };

  render() {
    const date = this.props.date;
    const posts = this.props.allPosts.filter(post => post.date === date);

    //RENDERS LIST OF POSTS
    let postList;
    posts !== null
      ? (postList = posts.map(post => (
          <li className={styles.Post} key={posts.indexOf(post)}>
            {post.post}
            <span
              className={styles.CloseBtn}
              onClick={() => this.removePost(post.key)}
            >
              &times;
            </span>
          </li>
        )))
      : (postList = null);
    //
    return (
      <div>
        <h3>{this.props.date}</h3>
        <div className={styles.Input}>
          <input
            placeholder="Write a new post..."
            value={this.state.newPost}
            onChange={this.postInput}
          />
          <button onClick={this.writePost}>Add Post</button>
        </div>
        <ul>{postList}</ul>
      </div>
    );
  }
}

export default DayModal;
