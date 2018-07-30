import React, { Component } from 'react';
import SearchItem from "./SearchItem";
import { getContent } from '../lib/resolverService';
import { getResolver } from '../lib/registryService';
import { fromContentHash } from '../helpers/ipfsHelper';
import "./App.scss";
class App extends Component {


    handSeachitem = e =>{
        if(e.keyCode !== 13) return;
        
    }
    
    componentDidMount(){
        getResolver('game.portalnetworkweb.wan').then(resolver => {
            getContent('game.portalnetworkweb.wan', resolver).then(contentHash => {
                console.log("contentHash:",contentHash, fromContentHash(contentHash));
            });
        });
        
    }
    render() {
        return (
            <div className="wanchain">
                <h1>WANChain Explorer</h1>
                <div className="seach">
                    <input type="text" onKeyDown={this.handSeachitem} />
                    <a 
                        onClick={this.handSeachitem} 
                        className="seach_icon"
                    ></a>
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