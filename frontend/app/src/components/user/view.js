import React, {Fragment, useState} from 'react';
import UserView from './userView'
import AdminView from './adminView'
import './user.scss';

export default class userDescriptor extends React.Component{
    render() {
        if (this.props.desc === 'Admin')
        {
            return (
                <AdminView/>
            )

        }else{
            return (
                <UserView/>
                )
        }
    }
    
}