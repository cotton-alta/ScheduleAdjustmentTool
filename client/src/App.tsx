import React from 'react';

import Main from './pages/Main';
import Edit from './pages/Edit';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Route exact path='/' component={Main} />
        <Route path='/edit' component={Edit} />
      </Router>
    </React.Fragment>
  )
}

export default App;
