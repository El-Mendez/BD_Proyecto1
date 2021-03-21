import React from "react";
import Button from 'react-bootstrap/Button';
import SideBar from "./sideBar/sideBar";
import Report from "./report/report";


export default class Test extends React.Component {
    render() {
        return (
            <div className={'d-flex'}>
                <SideBar/>
                <main>
                    <Report />
                </main>

            </div>
        );
    }
}
