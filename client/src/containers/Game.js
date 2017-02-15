/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

import React from 'react'
import {connect} from 'react-redux'
import Field from '../components/Field'
import {selectNode, moveUnit} from '../actions'
import {ControllerMode} from '../state'

class Game extends React.Component {
    render() {
        return (
            <Field
                selectedNodeKey={this.props.selectedNodeKey}
                units={this.props.units}
                supplies={this.props.supplies}
                nodeClick={this.props.nodeClick}>

            </Field>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        units: state.game.units,
        supplies: state.game.supplies,
        selectedNodeKey: state.controller.selectedNodeKey,
        mode: state.controller.mode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        _selectNode(nodeKey) {
            dispatch(selectNode(nodeKey))
        },
        _moveUnit(fromNodeKey, toNodeKey) {
            dispatch(moveUnit(fromNodeKey, toNodeKey))
        }
    };
};

const mergeProps = (stateProps, dispatchProps) => {
    return Object.assign({}, stateProps, dispatchProps,{
        nodeClick: (nodeKey) => {
            if (stateProps.mode === ControllerMode.MoveUnit) {
                console.log('move', stateProps.selectedNodeKey, nodeKey);
                dispatchProps._moveUnit(stateProps.selectedNodeKey, nodeKey);
            } else {
                console.log('select', nodeKey);
                dispatchProps._selectNode(nodeKey);
            }
        }
    })
}

Game = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Game)
export default Game;
