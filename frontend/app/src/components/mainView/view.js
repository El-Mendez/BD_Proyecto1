import React from 'react';
import HomeView from './homeView';
import Search from './search/search'
import {BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useRouteMatch} from "react-router-dom";

export default function view(){

  let {path} = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route path={path} exact component={HomeView}/>
        <Route path={`${path}/search`} exact component={Search}/>
      </Switch>
    </Router>
  );
}
