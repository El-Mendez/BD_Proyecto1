import React from 'react';
import history from '../../history';

export default function reportItem(props){
    const prop = props;

    const handleClick = ()=>{
        console.log('just testing')
        console.log(history.location);
        history.push(prop.redirect);
        history.go();
        console.log(history.location);
    }

    return(
        <div className="report-card card m-2" onClick={handleClick}>
            <div className="image-container">
                <div className="image-shadow">
                    <img src={prop.image} className="image-top" alt="TEST"/>
                </div>
            </div>
            {/*<img src={image} className="card-img-top mt-2" alt="TEST"/>*/}
                <div className="card-body p-1 text-secondary w-100">
                    <h6 className="mb-1">{prop.title}</h6>
                    <p className="card-text">{prop.description}</p>
                </div>
        </div>
    );
}
