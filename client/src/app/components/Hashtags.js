import React from 'react';

export class Hashtags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hashtags: [],
    };
  }

  componentDidMount() {
    this.getHashtags();
  }

  getHashtags() {
    const url = 'http://localhost:8000/api/hashtags';

    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        this.setState({hashtags: json});
      });
  }

  render() {
    const feedStyle = {
      backgroundImage: 'url(http://localhost:8080/app/feed.jpg)',
      backgroundSize: '100%',
    };

    const ulStyle = {
      color: 'white',
      fontWeight: 'bold',
      listStyleType: 'none',
      textAlign: 'center',
    };

    const hashtags = this.state.hashtags.map((hashtag, i) =>
      <li key={i + hashtag.text}>{hashtag.text}</li>,
    );

    return (
      <div style={feedStyle}>
        <ul style={ulStyle}>
          {hashtags}
        </ul>
      </div>
    );
  }
}
