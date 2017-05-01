import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Feed } from './components/Feed';
import { Root } from './components/Root';

class App extends React.Component {
  render() {
    return(
      <Router history={browserHistory}>
        <Route path={'/'} component={Root}>
          <IndexRoute component={Feed}/>
          <Route path={'/:user'} component={Feed}/>
        </Route>
      </Router>
    );
  }
}

render(<App/>, window.document.getElementById('app'));
