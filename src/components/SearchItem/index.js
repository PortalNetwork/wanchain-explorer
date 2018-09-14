import React, { Component } from 'react';
import classnames from 'classnames/bind';
import style from "./SearchItem.scss";
import moment from 'moment';
import Web3 from 'web3';
// import wanchain from 'wanchain-util';
const web3 = new Web3();
const cx = classnames.bind(style);
export default class extends Component {
    state={
        isChenge: true,
        isPage: 0,
    }

    handChecgr = (s)=>{
        this.setState({isPage: s})
    }

    render() {
        const {isOpenSearch, domainValue, searchValue, subdomainValue, entries, content, address} = this.props;
        const AuctionTimeregDate = new Date(entries.registrationDate);
        const SubmitBidsTimeregDate = new Date(entries.registrationDate);
        const AuctionTime = moment.utc(AuctionTimeregDate.removeDays(5)).format('MMMM Do YYYY, h:mm:ss a');
        const SubmitBidsTime = moment.utc(SubmitBidsTimeregDate.removeDays(3)).format('MMMM Do YYYY, h:mm:ss a');
        const RevealTime = moment.utc(entries.registrationDate).format('MMMM Do YYYY, h:mm:ss a');
        const addr = (address !== undefined) ?
            <li>
                <h2>Address</h2>
                <p>{address}</p>
            </li> : "";
        const dWeb = (content !== undefined && content.IPFSHash) ? 
            <li>
                <h2>ÐWEB</h2>
                <a href={content.IPFSHash} target="_blank">{content.IPFSHash}</a>
            </li> : "";
        return (
            <div className={cx('SearchItem', {open: isOpenSearch})}>
                <h1 className="domainName">{domainValue}</h1>
                <p className="titleinfo">WNS Info [ <a target="_blank" href={content.IPFSHash}>{domainValue}</a> ]</p>
                <ul className="item">
                    <li>
                        <h2>Status</h2>
                        <p>{entries.state}</p>
                    </li>
                    
                    {entries.state === "Open" || <li><h2>deed</h2><p>{entries.deed}</p></li>}

                    {entries.state === "Open" || <li><h2>Auction Started On</h2><p>{AuctionTime}</p></li>}
                    {entries.state === "Open" || <li><h2>Submit Bids Before</h2><p>{SubmitBidsTime}</p></li>}
                    {entries.state === "Open" || <li><h2>Reveal Bids By</h2><p>{RevealTime}</p></li>}

                    {entries.state === "Open" || <li> <h2>Bid Amount</h2> <p>{web3.fromWei(entries.value, 'ether')} WAN</p> </li>}
                    {entries.state === "Open" || <li><h2>Highest Bid</h2><p>{web3.fromWei(entries.highestBid, 'ether')} WAN</p></li>}
                    
                </ul>
                {entries.state === "Open" ?
                    <h3 className="available">{domainValue} is now Available for Reservation using <a href="https://beta.portal.network/" target="_blank">beta.portal.network</a> or mobile app</h3>
                :''}
                {entries.state === "Open" ? "" :
                    <div>
                        <p className="titleName">Name Info [ <a target="_blank" href={content.IPFSHash}>{subdomainValue}</a> ]</p>
                        <ul className="item">
                            <li>
                                <h2>Resolver</h2>
                                <p><a target="_blank" href={`https://explorer.wanchain.org/block/addr/${content.resolver}`}>{ content === undefined ? "" : content.resolver }</a></p>
                            </li>
                            <li>
                                <h2>Owner</h2>
                                <p>{entries.owner}</p>
                            </li>
                            {addr}
                            {dWeb}
                        </ul>
                    </div>
                }
            </div>
        )
    }
}

