import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import {Hashtags} from './components/Hashtags';
import {Root} from './components/Root';
import {Tweets} from './components/Tweets';
import {Accounts} from './components/Accounts';

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path={'/'} component={Root}>
          <IndexRoute component={Tweets} />
          <Route path={'hashtags'} component={Hashtags} />
          <Route path={'accounts'} component={Accounts} />
          <Route path={':username'} component={Tweets} />
        </Route>
      </Router>
    );
  }
}

render(<App />, window.document.getElementById('app'));
