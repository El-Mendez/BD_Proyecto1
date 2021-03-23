import React from "react";
import Dashboard from '../components/dashboard/dashboard'
import Report from './report/report'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default class Test extends React.Component {
    render() {
        return(
            <Router>
                <Switch>
                    {/*<Route path={'/'} exact component={Dashboard()}/>*/}
                    <Route path={'/dashboard'} exact component={Dashboard()}/>
                </Switch>
            </Router>
        );
    }
}
