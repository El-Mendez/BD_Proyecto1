import React from 'react';
import MonthItemreport from "./monthItemreport";

export default class monthsReport extends React.Component{
    render() {
        return (
            <div className={'container d-flex flex-wrap justify-content-around'}>
                <MonthItemreport/>
                <MonthItemreport/>
            </div>
        );
    }
}