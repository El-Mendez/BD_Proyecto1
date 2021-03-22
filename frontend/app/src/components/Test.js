import React from "react";
import Button from 'react-bootstrap/Button';
import SideBar from "./sideBar/sideBar";
import Report from "./report/report";
import Player from "./player/Player";


export default class Test extends React.Component {
    render() {
        return (
            <div className={'d-flex'}>
                <SideBar/>
                <main className={'w-100'}>
                    <Report />
                    <Player videoId="An7Q1GkEf3g" name="sucker for pain" artist="Imagine Dragons"/>
                </main>

            </div>
        );
    }
}
