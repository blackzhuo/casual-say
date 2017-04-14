import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { createChatMessage, sendMsg } from '../actions/index.es6';

@autobind
class MainApp extends React.Component {
	constructor(props) {
		super(props);
	}
	scrollBottom(){
		let content = this.refs.postContent;
		setTimeout(() => {
			content.scrollTop = Number.MAX_SAFE_INTEGER;
		}, 200);
	}
	componentDidMount() {
		this.SOCKET = io('http://23.106.136.124:3000', { 'force new connection': true });
		// this.SOCKET = io('http://127.0.0.1:3000', { 'force new connection': true });

		let { userName, theme, headImg } = this.props;
		let content = this.refs.postContent;
		content.style.height = content.offsetHeight + 'px';

		this.SOCKET.on('chat initial', (data) => {
			this.props.send(data);
			this.scrollBottom();
		});

		this.SOCKET.on('chat message', (data) => {
			this.props.send([{
				sort: data.sort,
				name: data.name,
				msg: data.msg,
				theme: data.theme,
				headImg: data.headImg,
				date: data.date
			}]);
			this.scrollBottom();
		});

		this.SOCKET.emit('chat login', { id: +new Date() + Math.random() * 1000, userName: userName });
	}
	// TODO 消息内容滚动使用 iscroll
	componentDidUpdate() {
		// let content = this.refs.postContent;
		// if (!this.myScroll && content) {
		// 	this.myScroll = new IScroll(content, {
		// 		freeScroll: true,
	    //         eventPassthrough: true,
	    //         bounceLock : true ,
	    //         hScrollbar : false ,
	    //         vScroll : false ,
	    //         scrollX: false,
	    //         scrollY: true,
	    //         probeType: 3,
	    //         preventDefault: false,
		// 		disablePointer: true
		// 	});
		// } else {
		// 	this.myScroll.refresh();
		// }
		// this.myScroll.on("beforeScrollStart",function(){
        //     this.refresh();
        // });
	}
	componentWillUnmount() {
		this.SOCKET.emit('chat clear');
		this.SOCKET = null;
		location.href = '/';
	}
	sendHandler(e) {
		e.preventDefault();
		e.stopPropagation();
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
		return false;
	}
	render() {
		const { userName, chatMessage } = this.props;
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
				<div ref="postContent" className="area">
					<div ref="scrollItem" className="post">
						<ul className="messages">
							{messageBody}
						</ul>
					</div>
				</div>
				<div className="columns is-mobile opt">
					<div className="column">
						<form onSubmit={this.sendHandler}>
							<input type="search" ref="inputMessage" className="input" placeholder="Type here..."></input>
						</form>
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