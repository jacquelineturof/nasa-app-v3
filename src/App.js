import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './icon.config'

import MediaSearch from './components/MediaSearch'
import SearchResults from './components/SearchResults'

import './App.css';

function App() {
  return (
    <Switch>
      <Route path = "/" exact component = { MediaSearch } />
      <Route path = "/results" component = { SearchResults } />
    </Switch>
  );
}

export default App;
