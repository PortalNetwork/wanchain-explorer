import React, { Component } from 'react';
import SearchItem from "./SearchItem";
import { getContent, getAddress } from '../lib/resolverService';
import { getResolver } from '../lib/registryService';
import { fromContentHash } from '../helpers/ipfsHelper';
import { getEntries } from '../lib/registrarService';
import { getOwner } from '../lib/deedService';
import "./App.scss";
import Loading from './Loading';
class App extends Component {
    state = {
        searchValue : "",
        domainValue: "",
        subdomainValue: "",
        entries: {},
        content: {},
        isKeyDown: false,
        idxRes: 0,
        isOpenSearch: false,
        address: "0x0000000000000000000000000000000000000000",
        isAboutOpen: false,
    }

    handOpenAboutChange=()=>{
        let bool = !this.state.isAboutOpen;
        this.setState({isAboutOpen: bool});
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handSeachitem = (e) =>{
        if(this.state.isKeyDown) return;
        if(e.keyCode !== 13) return;
        this.handSeachData();
    }

    handSeachitemClick = () =>{
        if(this.state.isKeyDown) return;
        this.handSeachData();
    }

    handSeachData=()=>{
        const keydomain = this.state.searchValue.split(".wan");
        if(keydomain[keydomain.length - 1] !== "") return alert("WNS format error");
        const searchResult = this.state.searchValue;
        const domain = keydomain[keydomain.length - 2].split(".");
        const seachdamain = domain[domain.length-1];     //去頭去尾去.wan
        this.setState({isKeyDown: true, isOpenSearch: false});
        getEntries(seachdamain).then(entries => {
            getOwner(entries.deed).then(owner => {
                let t = this.state.idxRes+=1;
                let eObj = entries;
                eObj['owner'] = owner;
                this.setState({
                    entries: eObj,
                    idxRes: t
                },()=>this.overResolver(`${seachdamain}.wan`))
            });
        });
        getResolver(searchResult).then(resolver => {
            let t = this.state.idxRes+=1;
            if (resolver === '0x0000000000000000000000000000000000000000') {
                this.setState({
                    content: { resolver },
                    idxRes: t
                },()=>this.overResolver(`${seachdamain}.wan`))
            } else {
                getAddress(searchResult, resolver).then(address => {
                    getContent(searchResult, resolver).then(contentHash => {
                        let rObj={ resolver, IPFSHash: `https://ipfs.infura.io/ipfs/${fromContentHash(contentHash)}`}
                        if (contentHash === '0x') rObj = '';
                        this.setState({
                            address,
                            content: rObj,
                            idxRes: t
                        },()=>this.overResolver(`${seachdamain}.wan`))
                    });
                })
            }
        });
    }

    overResolver =(wan)=>{
        if(this.state.idxRes !== 2) return;
        this.setState({
            isKeyDown: false,
            isOpenSearch: true,
            idxRes: 0,
            domainValue: wan,
            subdomainValue: this.state.searchValue
        })
    }

    render() {
        return (
            <div className="wanchain">
                <h1>WNS Explorer</h1>
                <div className="seach">
                    <input type="text" 
                        onKeyDown={this.handSeachitem} 
                        name="searchValue"
                        value={this.state.searchValue}
                        onChange={this.handleInputChange}
                        placeholder="wanchain.wan"
                    />
                    <a 
                        onClick={this.handSeachitemClick} 
                        className="seach_icon"
                    ></a>
                </div>
                { this.state.isKeyDown && <Loading/> }
                <SearchItem
                    domainValue={this.state.domainValue}
                    subdomainValue={this.state.subdomainValue}
                    searchValue={this.state.searchValue}
                    isOpenSearch={this.state.isOpenSearch}
                    entries={this.state.entries}
                    content={this.state.content}
                    address={this.state.address}
                />
                <span className="text">
                    {this.state.isAboutOpen && 
                        <div className="info">
                            <a onClick={this.handOpenAboutChange} className="closeInfo"><i className="fas fa-times-circle"></i></a>
                            <p>WNS is the Wanchain Name Service which is a distributed, extensible naming system based on the Wanchain blockchain that can be used to resolve a wide variety of resources such as Wanchain addresses.</p>
                        </div>
                    }
                    <a onClick={this.handOpenAboutChange}>Find out more about WNS</a>
                    <p>Powered by <a href="https://www.portal.network/" target="_blank">Portal Network</a></p>
                </span>
                
                <div className="urllink">
                    <a href="https://t.me/portalnetworkofficial" target="_blank"><i className="fab fa-telegram fa-2x"></i></a>
                    <a href="https://github.com/PortalNetwork/wanchain-explorer" target="_blank"><i className="fab fa-github fa-2x"></i></a>
                </div>
            </div>
        )
    }
}
export default App;