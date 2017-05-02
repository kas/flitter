import {Link} from 'react-router';
import React from 'react';

export class Tweet extends React.Component {
  render() {
    const tweetStyle = {
      width: 500,
      backgroundColor: 'white',
      borderStyle: 'solid',
      borderWidth: 1,
      padding: '5px 0px',
    };

    return (
      <div style={tweetStyle} className="float-center">
        <h5>{this.props.fullname}</h5>
        <p><Link to={'/' + this.props.username}>@{this.props.username}</Link></p>
        <p>{this.props.timestamp}</p>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
