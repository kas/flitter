import {Link} from 'react-router';
import React from 'react';

export class Accounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    this.getAccounts();
  }

  getAccounts() {
    const url = 'http://localhost:8000/api/accounts';

    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        this.setState({accounts: json});
      });
  }

  render() {
    const feedStyle = {
      backgroundImage: 'url(http://localhost:8080/app/feed.jpg)',
      backgroundSize: '100%',
    };

    const ulStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      listStyleType: 'none',
      textAlign: 'center',
      width: 500,
    };

    const accounts = this.state.accounts.map((account, i) =>
      <li key={i + account.username}><b>{account.fullname} (<Link to={'/' + account.username}>@{account.username}</Link>)</b><br />{account.bio}</li>,
    );

    return (
      <div style={feedStyle}>
        <ul className="float-center" style={ulStyle}>
          {accounts}
        </ul>
      </div>
    );
  }
}
