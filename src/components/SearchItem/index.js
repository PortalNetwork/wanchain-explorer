import React, { Component } from 'react';
import classnames from 'classnames/bind';
import style from "./SearchItem.scss";
import moment from 'moment';
import Web3 from 'web3';
import wanchain from 'wanchain-util';

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
        const {isOpenSearch, seachValue, entries, content} = this.props;
        const tomeStr = moment(entries.registrationDate).format('MMMM Do YYYY, h:mm:ss a');
        // portalnetworkweb.wan
        return (
            <div className={cx('SearchItem', {open: isOpenSearch})}>
                <h1 className="domainName">{seachValue}</h1>
                <p className="titleinfo">WNS Info</p>
                <ul className="item">
                    <li>
                        <h2>Status</h2>
                        <p>{entries.state}</p>
                    </li>
                    <li>
                        <h2>Time</h2>
                        <p>{tomeStr}</p>
                    </li>
                    <li>
                        <h2>Bid Amount</h2>
                        <p>{web3.fromWei(entries.value, 'ether')}</p>
                    </li>
                    <li>
                        <h2>Highest Bid</h2>
                        <p>{web3.fromWei(entries.highestBid, 'ether')}</p>
                    </li>
                </ul>
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
                    <li>
                        <h2>ÐWEB</h2>
                        {
                        <a href={content === undefined ? "" : content.IPFSHash} target="_blank">
                                { content === undefined ? "" : content.IPFSHash}
                            </a>
                        }
                    </li>
                </ul>
            </div>
        )
    }
}

