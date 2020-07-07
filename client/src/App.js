import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import LoginPage from './containers/auth/LoginPage';
import SignUpPage from './containers/auth/SignUpPage';

import ProgressBar from './containers/layout/ProgressBar';
import Navbar from './containers/layout/Navbar';
import Landing from './components/layout/Landing';
import PrivateRoute from './utils/PrivateRoute';

import VesselsPage from './containers/VesselsPage';
import ViewVesselPage from './containers/vessels/ViewVesselPage';
import CreateVesselPage from './containers/vessels/CreateVesselPage';
import UpdateVesselPage from './containers/vessels/UpdateVesselPage';

import BerthSearchPage from './containers/search/BerthSearchPage';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './loginPage';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ProgressBar />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/vessels" component={VesselsPage} />
          <PrivateRoute
            exact
            path="/vessels/vessel/create"
            component={CreateVesselPage}
          />
          <PrivateRoute
            exact
            path="/vessels/vessel/update/:id"
            component={UpdateVesselPage}
          />
          <PrivateRoute
            exact
            path="/vessels/vessel/:id"
            component={ViewVesselPage}
          />
          <PrivateRoute exact path="/search/:id" component={BerthSearchPage} />
          {/* <Route path="/vessels/:operator" component={VesselsPage} /> */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;