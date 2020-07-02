import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//components
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'

//css
import './App.css';
//Redux
import { Provider } from 'react-redux'
import store from './redux/store'


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  </Provider>
)

export default App;
