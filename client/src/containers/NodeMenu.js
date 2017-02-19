/**
 * Created by teppei.fujisawa on 2017/02/13.
 */

import {toMoveUnitMode, createUnit, destroyUnit, updateSupplyOwner} from '../actions'
import {connect} from 'react-redux'
import React from 'react'
import {getNodeUnit} from '../state'
import {Map, UnitType} from '../config'
import './NodeMenu.css'

class NodeMenu extends React.Component {
    render() {
        let buttons = [];

        function createButton(i, callback, title) {
            return <a key={i} className="button" href="#" onClick={callback}> {title} </a>
        }

        if (this.props.hasMyUnit) {
            buttons.push(
                createButton(buttons.length, () => {
                    this.props.onMoveUnitButtonClick();
                }, 'move unit')
            );
        }
        if (this.props.isMySupply && !this.props.hasMyUnit) {
            buttons.push(
                createButton(buttons.length, () => {
                    this.props.onCreateUnitButtonClick(UnitType.Army);
                }, 'create army')
            );

            buttons.push(
                createButton(buttons.length, () => {
                    this.props.onCreateUnitButtonClick(UnitType.Navy);
                }, 'create navy')
            );
        }

        if (this.props.hasMyUnit) {

            buttons.push(
                createButton(buttons.length, () => {
                    this.props.onDestroyUnitButtonClick()
                }, 'destroy')
            );
        }
        if (this.props.isSupply && !this.props.isMySupply) {
            buttons.push(
                createButton(buttons.length, () => {
                    this.props.onUpdateSupplyOwnerButtonClick()
                }, 'update owner')
            );
        }

        return (
            <div id="NodeMenu">
                {buttons}
            </div>
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
            state.game.supplies[nodeKey].name === state.nation.name;
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
        },
        _updateSupplyOwner: (nodeKey, nation) => {
            dispatch(updateSupplyOwner(nodeKey, nation));
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
        },
        onUpdateSupplyOwnerButtonClick: () => {
            if (stateProps._selectedNodeKey != null) {
                dispatchProps._updateSupplyOwner(
                    stateProps._selectedNodeKey,
                    stateProps._nation
                );
            }
        }

    })
}

export default connect(mapStateToProos, mapDispatchToProps, mergeProps)(NodeMenu)

