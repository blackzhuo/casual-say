import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';

@autobind
export default class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ul className="pages">
                <li ref="loginPage" className="login page">
                    <div className="form">
                        <h3 className="title">What's your nickname?</h3>
                        <input className="usernameInput" type="text"></input>
                    </div>
                </li>
            </ul>
        );
    }
}