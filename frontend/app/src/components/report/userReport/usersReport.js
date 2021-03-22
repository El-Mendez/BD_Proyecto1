import React from 'react';
import UserItemreport from "./userItemreport";

export default class usersReport extends React.Component{
    render() {
        return(
          <div className={'container'}>
              <UserItemreport/>
              <UserItemreport/>
          </div>
        );
    }
}
