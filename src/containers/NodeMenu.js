/**
 * Created by teppei.fujisawa on 2017/02/13.
 */

import {clickMoveUnit} from '../actions'
import {connect} from 'react-redux'
import React from 'react'
import {getNodeUnit} from '../state'
import {Map} from '../config'

class NodeMenu extends React.Component {
    render() {
        let buttons = [];
        if (this.props.hasMyUnit) {
            buttons.push(
                <a href="#"
                   onClick={ e => {
                       e.preventDefault();
                       this.props.onMoveUnitButtonClick();
                   }}
                >Move Unit</a>
            )
        }
        if (this.props.isMySupply && !this.props.hasMyUnit) {
            buttons.push(
                <a href="#"
                   onClick={ e => {
                       e.preventDefault();
                       alert('not implemented');
                   }}
                >Create Army</a>
            );
            buttons.push(
                <a href="#"
                   onClick={ e => {
                       e.preventDefault();
                       alert('not implemented');
                   }}
                >Create Navy</a>
            );
        }

        if (this.props.hasMyUnit) {
            buttons.push(
                <a href="#"
                   onClick={ e => {
                       e.preventDefault();
                       alert('not implemented');
                   }}
                >Remove Unit</a>
            );
        }
        if (this.props.isSupply && !this.props.isMySupply) {
            buttons.push(
                <a href="#"
                   onClick={ e => {
                       e.preventDefault();
                       alert('not implemented');
                   }}
                >Update Supply Owner</a>
            );
        }
        return (
            <p>
                NodeMenu:
                {buttons.map((button, i) => {
                    return (
                        <span key={i}>
                            {button}
                            {', '}
                        </span>
                    )
                })}
            </p>
        )
    }
}

const mapStateToProos = (state) => {
    let nodeKey = state.controller.selectedNodeKey;
    if (nodeKey == null) {
        return {
            //TODO hide all
            hasMyUnit: false,
            isSupply: false,
            isMySupply: false
        }
    }

    let node = Map.nodes[nodeKey];

    let unit = getNodeUnit(state.game.units, nodeKey)

    let hasMyUnit = unit != null && unit.nation === state.nation;

    let isSupply = node.isSupply;
    let isMySupply = false; // TODO manage supply's owner


    let ret = {hasMyUnit, isSupply, isMySupply};
    console.log(ret);
    return ret
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMoveUnitButtonClick: () => {
            dispatch(clickMoveUnit())
        }
    }
}

export default connect(mapStateToProos, mapDispatchToProps)(NodeMenu)

