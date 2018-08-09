import React, { Component } from 'react';
import SearchItem from "./SearchItem";
import { getContent, getAddress } from '../lib/resolverService';
import { getResolver } from '../lib/registryService';
import { fromContentHash } from '../helpers/ipfsHelper';
import { getEntries } from '../lib/registrarService';
import { getOwner } from '../lib/deedService';
import "./App.scss";
import Loading from './Loading';
import Warning from './Warning';
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
        isError: false,
        alertErrStr: "",
    }
    
    handOpenWarning = (alertErrStr, callBack) =>{
        this.setState({isError: true, alertErrStr: alertErrStr},()=>{
            setTimeout(() => {
                this.setState({isError: false});
                if(callBack) callBack();
            }, 3000);
        });
    }

    closeWarningAlert=()=>{
        this.setState({isError: false});
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
        if(keydomain[keydomain.length - 1] !== "") return this.handOpenWarning("WNS format error");
        const searchResult = this.state.searchValue;
        const domain = keydomain[keydomain.length - 2].split(".");
        const seachdamain = domain[domain.length-1];     //去頭去尾去.wan
        if(seachdamain.length < 6) return this.handOpenWarning("WNS has the minimum character length of 6");


        this.setState({isKeyDown: true, isOpenSearch: false, isAboutOpen: false,});
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
                            idxRes: t,
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
                    <div className="footer">
                        <a href="https://www.portal.network/" target="_blank">Powered by Portal Network</a>
                        <a href="https://www.portal.network/privacy_policy.html" target="_blank">Privacy & Policy</a>
                        <a href="https://www.portal.network/terms_coditions.html" target="_blank">Terms of use</a>
                    </div>
                </span>
                
                <div className="urllink">
                    <a href="https://t.me/portalnetworkofficial" target="_blank"><i className="fab fa-telegram fa-3x"></i></a>
                    <a href="https://github.com/PortalNetwork/wanchain-explorer" target="_blank"><i className="fab fa-github fa-3x"></i></a>
                </div>

                <a className="textabout" onClick={this.handOpenAboutChange}>Find out more about WNS</a>

                {this.state.isAboutOpen && 
                    <div className="info">
                        <a onClick={this.handOpenAboutChange} className="closeInfo"><i className="fas fa-times-circle"></i></a>
                        <p>WNS is the Wanchain Name Service which is a distributed, extensible naming system based on the Wanchain blockchain that can be used to resolve a wide variety of resources such as Wanchain addresses.</p>
                    </div>
                }

                <Warning
                    isError={this.state.isError}
                    alertErrStr={this.state.alertErrStr}
                    closeWarningAlert={this.closeWarningAlert}
                />
            </div>
        )
    }
}
export default App;