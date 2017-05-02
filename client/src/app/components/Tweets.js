import React from 'react';

import {Tweet} from './Tweet';

export class Tweets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
    };
  }

  componentDidMount() {
    this.getTweets(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.username !== nextProps.params.username) {
      this.getTweets(nextProps);
    }
  }

  getTweets(props) {
    let url = 'http://localhost:8000/api/tweet';

    if (props.params.username) {
      url += '/' + props.params.username;
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

    const usernameHeaderStyle = {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    };

    const tweets = this.state.tweets.map((tweet, i) => 
      <Tweet key={i + tweet.text} fullname={tweet.fullname} username={tweet.username} timestamp={tweet.timestamp} text={tweet.text} />,
    );

    if (this.props.params.username) {
      const usernameHeader = <h3 style={usernameHeaderStyle}>Showing tweets for @{this.props.params.username}</h3>;

      return (
        <div style={feedStyle}>
          {usernameHeader}
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
