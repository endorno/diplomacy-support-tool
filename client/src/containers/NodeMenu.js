/**
 * Created by teppei.fujisawa on 2017/02/13.
 */

import {toMoveUnitMode, createUnit, destroyUnit} from '../actions'
import {connect} from 'react-redux'
import React from 'react'
import {getNodeUnit} from '../state'
import {Map, UnitType} from '../config'

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
                       this.props.onCreateUnitButtonClick(UnitType.Army);
                   }}
                >Create Army</a>
            );
            buttons.push(
                <a href="#"
                   onClick={ e => {
                       this.props.onCreateUnitButtonClick(UnitType.Navy);
                   }}
                >Create Navy</a>
            );
        }

        if (this.props.hasMyUnit) {
            buttons.push(
                <a href="#"
                   onClick={ e => {
                       this.props.onDestroyUnitButtonClick()
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
    var ret = {};
    if (nodeKey == null) {
        ret = {
            //TODO hide all
            hasMyUnit: false,
            isSupply: false,
            isMySupply: false
        }
    } else {
        let node = Map.nodes[nodeKey];

        let unit = getNodeUnit(state.game.units, nodeKey)

        let hasMyUnit = unit != null && unit.nation.name === state.nation.name;

        let isSupply = node.isSupply;
        let isMySupply = state.game.supplies[nodeKey] != null &&
                state.game.supplies[nodeKey].name == state.nation.name;
        ret = {hasMyUnit, isSupply, isMySupply};
    }

    ret['_selectedNodeKey'] = state.controller.selectedNodeKey;
    ret['_nation'] = state.nation;
    return ret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMoveUnitButtonClick: () => {
            dispatch(toMoveUnitMode())
        },
        _createUnit: (nodeKey, nation, unitType) => {
            dispatch(createUnit(nodeKey, nation, unitType))
        },
        _destroyUnit: (nodeKey) => {
            dispatch(destroyUnit(nodeKey))
        }
    }
}

const mergeProps = (stateProps, dispatchProps) => {
    return Object.assign({}, stateProps, dispatchProps, {
        onCreateUnitButtonClick: (unitType) => {
            if (stateProps._selectedNodeKey != null) {
                dispatchProps._createUnit(stateProps._selectedNodeKey,
                    stateProps._nation, unitType);
            }
        },
        onDestroyUnitButtonClick: () => {
            if (stateProps._selectedNodeKey != null) {
                dispatchProps._destroyUnit(stateProps._selectedNodeKey);
            }
        }
    })
}

export default connect(mapStateToProos, mapDispatchToProps, mergeProps)(NodeMenu)

