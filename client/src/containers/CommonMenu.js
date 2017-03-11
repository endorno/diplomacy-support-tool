/**
 * Created by teppei.fujisawa on 2017/03/10.
 */
/**
 * Created by teppei.fujisawa on 2017/02/13.
 */

import {toggleRemoteSync, getLatestState} from '../actions'
import {connect} from 'react-redux'
import React from 'react'
import 'css-toggle-switch/dist/toggle-switch.css'
import './CommonMenu.css'

class CommonMenu extends React.Component {
    render() {
        let buttons = [];
        //remote sync
        let remoteSyncButton = (
            <label key='remoteSync' className="remoteSyncButton switch-light switch-ios">
                <input type="checkbox" onChange={ e=> {
                    this.props.onRemoteSyncButtonClick();
                } } checked={this.props.remoteSync}/>
                <span>
                        <span>Secret</span>
                        <span>Sync</span>
                        <a></a>
                        </span>
            </label>
        );

        buttons.push(remoteSyncButton);
        return (
            <div id="CommonMenu">
                {buttons}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        remoteSync: state.controller.remoteSync,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        _onGetLatest: () => {
            dispatch(getLatestState());
        },
        _onToggleRemoteSync: () => {
            dispatch(toggleRemoteSync());
        }
    }
}

const mergeProps = (stateProps, dispatchProps) => {
    return Object.assign({}, stateProps, dispatchProps, {
        onRemoteSyncButtonClick: () => {
            let previousNotSync = !stateProps.remoteSync;
            dispatchProps._onToggleRemoteSync();
            if (previousNotSync) {
                dispatchProps._onGetLatest();
            }
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CommonMenu)

