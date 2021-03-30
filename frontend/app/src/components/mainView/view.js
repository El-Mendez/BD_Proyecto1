import React from 'react';
import GenderSongs from './genderSongs';
import Search from './search'
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
        <Route path={path} exact component={GenderSongs}/>
        <Route path={`${path}/search`} exact component={Search}/>
      </Switch>
    </Router>
  );
}
