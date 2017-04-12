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
    }
    sendHandler(){
        let userName = this.refs.usernameInput.value;
        this.props.createUserName(userName);
        this.props.createTheme(Math.random() * 4 >>> 0);
        this.props.createHeadImg(Math.random() * 10 >>> 0);
    }
    render(){
        return (
            <div className="home">
                <h3 className="des">Please input your nickname.</h3>
                <input ref="usernameInput" className="username" type="text"></input>
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