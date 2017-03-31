import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';

@autobind
export default class Main extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ul className="pages">
			    <li ref="chatPage" className="chat page">
			        <div className="chatArea">
			            <ul className="messages">
			                <li className="message"><span className="username">sfd</span><span className="messageBody">asdasdasd</span>
			                </li>
			                <li className="message"><span className="username">test</span><span className="messageBody">not asdasdasd!!! asd</span>
			                </li>
			                <li className="log">amit left</li>
			                <li className="log">there are 13 participants</li>
			                <li className="message"><span className="username">test</span><span className="messageBody">is the right answer</span>
			                </li>
			                <li className="message"><span className="username">sfd</span><span className="messageBody">test</span>
			                </li>
			            </ul>
			        </div>
			        <input className="inputMessage" placeholder="Type here..."></input>
			    </li>
			</ul>
        );
    }
}