import 'babel-polyfill';
import 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
let filename = 'search.png';
require(`images/${filename}`);
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
}
Date.prototype.removeDays = function(days) {
    this.setDate(this.getDate() - days);
    return this;
}
ReactDOM.render(<App/>, document.getElementById('app'));
