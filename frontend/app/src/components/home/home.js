import React from 'react';
import GenderSongs from './genderSongs';

export default class home extends React.Component{
    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-light bg-light">
                    <form className="form-inline">
                        <button className="btn btn-outline-success" type="button">Main button</button>
                        <button className="btn btn-sm btn-outline-secondary" type="button">Smaller button</button>
                    </form>
                </nav>
                <GenderSongs/>
            </div>
        );
    }
}