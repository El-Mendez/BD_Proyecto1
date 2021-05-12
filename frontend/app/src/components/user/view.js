import React, {Fragment, useState} from 'react';
import UserView from './userView'
import AdminView from './adminView'
import Artist from './artistView'
import MonitorA from './equipoMonitoreo/monitoreoA'
import MonitorB from './equipoMonitoreo/monitoreoB'
import MonitorC from './equipoMonitoreo/monitoreoC'
import './user.scss';

export default class userDescriptor extends React.Component{
    render() {
        if (this.props.desc === 'Admin')
        {
            return (
                <AdminView/>
            )
        }else if (this.props.desc === 'Artista' || this.props.desc === 'Manager'){
            return (
                <Artist/>
            )
        }else{
            return (
              <UserView/>
            )
        }
    }
}
