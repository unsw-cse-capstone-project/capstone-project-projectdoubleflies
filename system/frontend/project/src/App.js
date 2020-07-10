import React from 'react';
import './App.css';
import Header from './layouts/Header';
import PostRecipe from './pages/PostRecipe';
import ViewRecipe from './pages/ViewRecipe';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContributorPage from './pages/ContributorPage';

import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import { store, persistor } from './store.js';
import HomePage from './pages/HomePage';
import PublicPage from './pages/PublicPage'
import {PrivateRoute} from './helpers/PrivateRoute';
import ExplorerPage from './pages/ExplorerPage';
import Ingredients from './layouts/Ingredients';
function App() {
    return ( 
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className = "App">
          <BrowserRouter>
            <Header/>
            <Switch>
              <PrivateRoute path="/post" component={PostRecipe}/>
              <Route path="/view/:id" component={ViewRecipe}/>
              <PrivateRoute path="/edit/:id" component={ViewRecipe}/>
              <PrivateRoute path="/contributor/view/:id" component={ViewRecipe}/>
              <PrivateRoute path="/explorer" component={ExplorerPage}/>
              <PrivateRoute path="/contributor" component={ContributorPage}/>
              <Route path="/" component={PublicPage}/>
              
              {/* <Route path="/" component={HomePage}/> */}
            </Switch>
          </BrowserRouter>
        </div>
        </PersistGate>
      </Provider>
    );
}

export default App;