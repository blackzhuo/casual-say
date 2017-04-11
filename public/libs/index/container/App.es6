import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../components/Home.es6';
import Main from '../components/Main.es6';

@autobind
class ChatApp extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/main" component={Main} />
                </div>
            </Router>
        )
    }
}

const App = connect()(ChatApp);

export default App;