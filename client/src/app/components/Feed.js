import React from 'react';

import {Tweet} from './Tweet';

export class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
    };
  }

  componentDidMount() {
    this.TweetList();
  }

  TweetList() {
    let url = 'http://localhost:8000/api/tweet';

    if (this.props.params.user) {
      url += '/' + this.props.params.user;
    }

    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        this.setState({tweets: json});
      });
  }

  render() {
    const feedStyle = {
      backgroundImage: 'url(http://localhost:8080/app/feed.jpg)',
      backgroundSize: '100%',
    };

    const userHeaderStyle = {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    };

    const tweets = this.state.tweets.map((tweet, i) => {
      return (
        <Tweet key={i + tweet.text} fullname={tweet.fullname} username={tweet.username} timestamp={tweet.timestamp} text={tweet.text} />
      );
    });

    const userHeader = <h3 style={userHeaderStyle}>Showing tweets for {this.props.params.user}</h3>;

    if (this.props.params.user) {
      return (
        <div style={feedStyle}>
          {userHeader}
          {tweets}
        </div>
      );
    }

    return (
      <div style={feedStyle}>
        {tweets}
      </div>
    );
  }
}
