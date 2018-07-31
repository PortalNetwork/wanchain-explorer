import React, { Component } from 'react';
import classnames from 'classnames/bind';
import style from "./SearchItem.scss";
import moment from 'moment';
import Web3 from 'web3';
import wanchain from 'wanchain-util';

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
        const {isOpenSearch, seachValue, entries, content, address} = this.props;
        const tomeStr = moment(entries.registrationDate).format('MMMM Do YYYY, h:mm:ss a');
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
                <h1 className="domainName">{seachValue}</h1>
                <p className="titleinfo">WNS Info</p>
                <ul className="item">
                    <li>
                        <h2>Status</h2>
                        <p>{entries.state}</p>
                    </li>
                    {entries.state === "Open" ? "" : <li><h2>Time</h2><p>{tomeStr}</p></li>}
                    {entries.state === "Open" ? "" : <li> <h2>Bid Amount</h2> <p>{web3.fromWei(entries.value, 'ether')} WAN</p> </li>}
                    {entries.state === "Open" ? "" : <li><h2>Highest Bid</h2><p>{web3.fromWei(entries.highestBid, 'ether')} WAN</p></li>}
                    {entries.state === "Open" ?
                         <h3>is now Available for Reservation using beta.portal.network or mobile app (<a href="https://beta.portal.network/" target="_blank">link</a>)</h3>
                    :''}
                </ul>
                {entries.state === "Open" ? "" :
                    <div>
                        <p className="titleName">Name Info</p>
                        <ul className="item">
                            <li>
                                <h2>Resolver</h2>
                                <p>{ content === undefined ? "" : content.resolver }</p>
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

