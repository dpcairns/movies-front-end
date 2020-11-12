import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import './App.css';
import Login from './Login.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import Favorites from './Favorites.js'
import PrivateRoute from './PrivateRoute.js';
import Search from './Search.js';

export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (booger1, booger2) => {
    localStorage.setItem('TOKEN', booger2);
    localStorage.setItem('USERNAME', booger1);

    this.setState({
      username: booger1,
      token: booger2
    })
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })

  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            {
            this.state.token 
            ? <div>
              {this.state.username}
              <Link to="/search"><div>search</div></Link>
              <Link to="/favorites"><div>Favorites</div></Link>
              <button onClick={this.logOut}>Log out</button>
            </div>
          : <>
            <Link to="/search"><div>Search</div></Link>
           <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            </>}
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => 
                <Login 
                  {...routerProps} 
                  changeTokenAndUsername={this.changeTokenAndUsername} 
              />
              } 
            />
            <Route 
              exact 
              path='/signup' 
              render={(routerProps) => 
                  <SignUp  
                    {...routerProps} 
                    changeTokenAndUsername={this.changeTokenAndUsername} 
                    />
                } 
              />
            <Route 
              exact 
              path='/search' 
              render={(routerProps) => 
                  <Search {...routerProps} />
                } 
              />
            <PrivateRoute 
              token={this.state.token} 
              exact 
              path='/favorites' 
              render={(routerProps) => <Favorites {...routerProps} token={this.state.token} />} />

          </Switch>
        </Router>
      </div>
    )
  }
}