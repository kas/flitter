import React from 'react';
import {Link} from 'react-router';

export class Header extends React.Component {
  render() {
    const anchorStyle = {
      color: 'inherit',
    };

    const headerStyle = {
      backgroundImage: 'url(http://localhost:8080/app/header.jpg)',
      backgroundSize: '100%',
      color: 'white',
    };

    const listItemStyle = {
      display: 'inline',
      margin: '0 5px',
    };

    const listStyle = {
      listStyleType: 'none',
    };

    return (
      <div style={headerStyle}>
        <div className="row">
          <div className="small-9 columns">
            <h3><Link to={'/'} style={anchorStyle}>Flitter</Link></h3>
          </div>

          <div className="small-3 columns">
            <ul style={listStyle}>
              <li style={listItemStyle}><Link to={'/'} style={anchorStyle}>Feed</Link></li>
              <li style={listItemStyle}><Link to={'/'} style={anchorStyle}>Hashtags</Link></li>
              <li style={listItemStyle}><Link to={'/'} style={anchorStyle}>About</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
