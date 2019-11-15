import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Chat from './components/Chat'

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/Chat" component={Chat} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
