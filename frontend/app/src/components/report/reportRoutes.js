import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

export default function ReportRoute(){

  let {path} = useRouteMatch();

  return(
    <div>
      <Switch>
        <Route  path={`${path}/report`}>

        </Route>
      </Switch>
    </div>

  );
}
