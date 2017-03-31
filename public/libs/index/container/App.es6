import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from '../components/Home.es6';
import Main from '../components/Main.es6';

@autobind
export default class App extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Main} />
                    <Route path="/main" component={Home} />
                </div>
            </Router>
        )
    }
}