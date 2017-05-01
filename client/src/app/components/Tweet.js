import React from 'react';

export class Tweet extends React.Component {
  render() {
    var tweetStyle = {
      width: 500,
      backgroundColor: 'white',
      borderStyle: 'solid',
      borderWidth: 1,
      padding: '5px 0px'
    };

    return (
      <div style={tweetStyle} className="float-center">
        <h5>{this.props.fullname}</h5>
        <p><a href={'http://localhost:8080/' + this.props.uname}>@{this.props.uname}</a></p>
        <p>{this.props.timestamp}</p>
        <p>{this.props.content}</p>
      </div>
    );
  }
}
