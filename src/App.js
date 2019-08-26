import React, { Component } from "react";
import { firebasePosts } from "./Firebase";
import "./App.css";

import Calendar from "./components/Calendar/Calendar";

class App extends Component {
  state = {
    allPosts: []
  };

  componentDidMount() {
    const previousPosts = this.state.allPosts;
    //DataSnapshot
    firebasePosts.on("child_added", snapshot => {
      previousPosts.push({
        key: snapshot.key,
        date: snapshot.val().date,
        post: snapshot.val().post
      });
      this.setState({
        allPosts: previousPosts
      });
    });

    firebasePosts.on("child_removed", snapshot => {
      for (let i = 0; i < previousPosts.length; i++) {
        if (previousPosts[i].key === snapshot.key) {
          previousPosts.splice(i, 1);
        }
      }
      this.setState({
        allPosts: previousPosts
      });
    });
  }

  addPost = (date, post) => {
    firebasePosts.push().set({ date, post });
  };

  removePost = key => {
    firebasePosts.child(key).remove();
  };

  render() {
    return (
      <div className="App">
        <Calendar
          allPosts={this.state.allPosts}
          addPost={this.addPost}
          removePost={this.removePost}
        />
      </div>
    );
  }
}

export default App;
