import React from 'react';

import {Header} from './Header';

export class Root extends React.Component {
  render() {
    return(
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}
