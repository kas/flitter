import React from 'react';

import {Tweet} from './Tweet';

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tweets: []
    };
  }

  componentDidMount() {
    this.TweetList();
  }

  TweetList() {
    var url = 'http://localhost:8000/api/tweet';

    if (this.props.params.user) {
      url += '/' + this.props.params.user;
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ tweets: json });
      });
  }

  render() {
    const tweets = this.state.tweets.map((tweet, i) => {
      return (
        <Tweet key={i + tweet.text} fullname={tweet.fullname} uname={tweet.username} timestamp={tweet.timestamp} content={tweet.text} />
      );
    });

    var feedStyle = {
      backgroundImage: 'url(http://localhost:8080/app/feed.jpg)',
      backgroundSize: '100%'
    };

    return (
      <div style={feedStyle}>
        {tweets}
      </div>
    );
  }
}
