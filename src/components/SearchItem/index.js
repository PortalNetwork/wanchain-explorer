import React, { Component } from 'react';
import classnames from 'classnames/bind';
import style from "./SearchItem.scss";
const cx = classnames.bind(style);
export default class extends Component {
    state={
        isOpenSearch: false,
    }
    render() {
        const {isOpenSearch} = this.state;
        return (
            <div className={cx('SearchItem', {open: isOpenSearch})}>
                <h1 className="domainName">darkmarket.wan</h1>
                <ul className="item">
                    <li>
                        <h2>Status</h2>
                        <p>Owned [2]</p>
                    </li>
                    <li>
                        <h2>Owner</h2>
                        <p>0x5807a8b404c71cf22eb0bac2e5f2a6c202ebe0a1</p>
                    </li>
                    <li>
                        <h2>Time</h2>
                        <p>2018-06-17 15:08:18</p>
                    </li>
                    <li>
                        <h2>Bid Amount</h2>
                        <p>0.1 WAN</p>
                    </li>
                </ul>
            </div>
        )
    }
}