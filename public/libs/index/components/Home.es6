import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import { SOCKET } from '../constant/index.es6';
import { createChatMessage, createUserName, sendMsg } from '../actions/index.es6';

@autobind
class HomeApp extends React.Component {
    constructor(props){
        super(props);
    }
    sendHandler(){
        let userName = this.refs.usernameInput.value;
        this.props.createUserName(userName);
        sendMsg({
			sort: 1,
			name: userName,
			msg: ''
		});
    }
    render(){
        return (
            <ul className="pages">
                <li ref="loginPage" className="login page">
                    <div className="form">
                        <h3 className="title">Please input your nickname.</h3>
                        <input ref="usernameInput" className="usernameInput" type="text"></input>
                        <Link className="btn" to="/main" onClick={this.sendHandler}>Login</Link>
                    </div>
                </li>
            </ul>
        );
    }
}

function mapStateToProps(state) {
  return {
    chatMessage: state.chatMessageReducer.chatMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    send: (data) => dispatch(createChatMessage(data)),
    createUserName: (data) => dispatch(createUserName(data))
  }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeApp);

export default Home;