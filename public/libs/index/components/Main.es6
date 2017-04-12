import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { createChatMessage, sendMsg } from '../actions/index.es6';

@autobind
class MainApp extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.SOCKET = io('http://23.106.136.124:3000',{'force new connection': true});
		
		let { userName, theme, headImg } = this.props;
		let content = document.getElementById('postContent');
		let contentHeight = content.offsetHeight;
		content.style.height = contentHeight + 'px';

		this.SOCKET.on('chat message', function (data) {
			this.props.send({
				sort: data.sort,
				name: data.name,
				msg: data.msg,
				theme: data.theme,
				headImg: data.headImg,
				date: data.date
			});
			content.scrollTop = Number.MAX_SAFE_INTEGER;
		}.bind(this));

		this.SOCKET.on('chat check', function () {
			this.SOCKET.emit('chat check', userName, 1);
		}.bind(this));

		// 发一个 chat check
		this.SOCKET.emit('chat check', userName, 0);
		
		sendMsg(this.SOCKET, {
			sort: 1,
			name: userName,
			msg: 'join in.',
			theme: theme,
			headImg: headImg
		});
	}
	componentWillUnmount(){
		this.SOCKET.emit('chat clear');
		this.SOCKET = null;
		location.href = '/';
	}
	sendHandler() {
		let msg = this.refs.inputMessage.value;
		let { userName, theme, headImg } = this.props;
		sendMsg(this.SOCKET, {
			sort: 0,
			name: userName,
			msg: msg,
			theme: theme,
			headImg: headImg
		});
		this.refs.inputMessage.value = '';
	}
	render() {
		const { userName, chatMessage, send } = this.props;
		let messageBody = [];
		chatMessage.forEach((item, index) => {
			let liItem = null;
			if (item.sort === 0) {
				if (item.name === userName) {
					liItem = <li key={index} className="item">
						<div className="other other-me">
							<span className={"msg msg-c" + item.theme}>{item.msg}</span>
						</div>
						<div className="head head-me">
							<img className="img" src={"/source/" + item.headImg + ".jpg"} />
						</div>
					</li>
				} else {
					liItem = <li key={index} className="item">
						<div className="head">
							<img className="img" src={"/source/" + item.headImg + ".jpg"} />
						</div>
						<div className="other">
							<span className="uname">{item.name}</span>
							<span className={"msg msg-c" + item.theme}>{item.msg}</span>
						</div>
					</li>
				}
			} else {
				liItem = <li key={index} className="log">{item.name} {item.msg}</li>
			}
			messageBody.push(liItem);
		});
		return (
			<div className="chat">
				<div id="postContent" className="area">
					<div className="post">
						<ul className="messages">
							{messageBody}
						</ul>
					</div>
				</div>
				<div className="columns is-mobile opt">
					<div className="column">
						<input ref="inputMessage" className="input" placeholder="Type here..."></input>
					</div>
					<div className="column is-one-quarter">
						<button className="button is-primary" onClick={this.sendHandler}>Send</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userName: state.chatMessageReducer.userName,
		theme: state.chatMessageReducer.theme,
		headImg: state.chatMessageReducer.headImg,
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