import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import { createUserName, createTheme, createHeadImg } from '../actions/index.es6';

@autobind
class HomeApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            warnClass: ''
        }
    }
    sendHandler(e){
        let userName = this.refs.usernameInput.value;
        if(!userName){
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                warnClass: 'username-warn'
            });
            return false;
        }
        // TODO 如果重名，也不许登录
        
        this.props.createUserName(userName);
        this.props.createTheme(Math.random() * 4 >>> 0);
        this.props.createHeadImg(Math.random() * 10 >>> 0);
    }
    render(){
        return (
            <div className="home">
                <h3 className="des">Please input your nickname.</h3>
                <form onSubmit={this.sendHandler}>
                    <input ref="usernameInput" className={"username " + this.state.warnClass } type="search" placeholder="nickname"></input>
                </form>
                <Link className="login" to="/main" onClick={this.sendHandler}>Login</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUserName: (data) => dispatch(createUserName(data)),
    createTheme: (data) => dispatch(createTheme(data)),
    createHeadImg: (data) => dispatch(createHeadImg(data))
  }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeApp);

export default Home;