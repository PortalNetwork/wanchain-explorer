import React, { Component } from 'react';
import classnames from 'classnames/bind';
import style from "./Warning.scss";
const cx = classnames.bind(style);
export default class extends Component {
    render() {
        const { alertErrStr, isError, closeWarningAlert } = this.props;
        return (
            <div className="Warningbox">
                <div className={cx("Warning", {open: isError})}>
                    <p>{alertErrStr}</p>
                    <a onClick={closeWarningAlert} className="closeErr"><i className="fas fa-times-circle"></i></a>
                </div>
            </div>
        )
    }
}