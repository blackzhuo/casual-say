import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { SOCKET } from '../constant/index.es6';
import { createChatMessage, sendMsg } from '../actions/index.es6';

@autobind
class MainApp extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		SOCKET.on('chat message', function (data) {
			this.props.send({
				sort: data.sort,
				name: data.name,
				msg: data.msg,
				date: data.date
			});
		}.bind(this));
	}
	sendHandler(){
		let msg = this.refs.inputMessage.value;
		sendMsg({
			sort: 0,
			name: this.props.userName,
			msg: msg
		});
	}
	render() {
		const { chatMessage, send } = this.props;
		let messageBody = [];
		chatMessage.forEach((item, index) => {
			let liItem = null;
			if (item.sort === 0) {
				liItem = <li key={index} className="message">
							<span className="username">{item.name}</span>
							<span className="messageBody">{item.msg}</span>
						</li>
			} else{ 
				liItem = <li key={index} className="log">{item.name} join in.</li>
			}
			messageBody.push(liItem);
		});
		return (
			<ul className="pages">
				<li ref="chatPage" className="chat page">
					<div className="chatArea">
						<ul className="messages">
							{messageBody}
						</ul>
					</div>
					<div>
						<input ref="inputMessage" className="inputMessage" placeholder="Type here..."></input>
						<a className="messageSend" href="javascript:;" onClick={this.sendHandler}>Send</a>
					</div>
				</li>
			</ul>
		);
	}
}

function mapStateToProps(state) {
  return {
	userName: state.chatMessageReducer.userName,
    chatMessage: state.chatMessageReducer.chatMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    send: (data) => dispatch(createChatMessage(data))
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);

export default Main;