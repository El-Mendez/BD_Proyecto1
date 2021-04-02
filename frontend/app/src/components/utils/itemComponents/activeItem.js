import React from 'react';

export default class activeItem extends React.Component{
    render() {
        return (
            <div>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col month-br">
                            <div className={'card-body'}>
                                <h2>{this.props.month}</h2>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card-body">
                               <h3>{this.props.quantity}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
