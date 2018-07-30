import React, { Component } from 'react';
import SearchItem from "./SearchItem";
import "./App.scss";
class App extends Component {
    render() {
        return (
            <div className="wanchain">
                <h1>WANChain Explorer</h1>
                <div className="seach">
                    <input type="text"/>
                    <a className="seach_icon"></a>
                </div>
                <SearchItem/>
                <span className="text">
                    Powered by <a href="https://www.portal.network/" target="_blank">Portal Network</a>
                </span>
            </div>
        )
    }
}
export default App;