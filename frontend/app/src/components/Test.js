import React from "react";
import Button from 'react-bootstrap/Button';
import SideBar from "./sideBar/sideBar";


export default class Test extends React.Component {
    render() {
        return (
            <div className={'d-flex'}>
                <SideBar/>
                <main>
                    <h1>Hello World</h1>
                    <Button variant="primary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Hola Mundo</Button>
                </main>

            </div>
        );
    }
}
