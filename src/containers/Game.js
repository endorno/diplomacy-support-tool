/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

import React from 'react'
import {connect} from 'react-redux'
import Field from '../components/Field'
import {selectNode} from '../actions'

class Game extends React.Component {
    render() {
        return (
            <Field
                selectedNodeKey={this.props.selectedNodeKey}
                units={this.props.units}
                nodeClick={this.props.nodeClick}>

            </Field>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        units: state.game.units,
        selectedNodeKey: state.controller.selectedNodeKey,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        nodeClick: (nodeKey) => {
            dispatch(selectNode(nodeKey));
        }
    };
};


Game = connect(mapStateToProps, mapDispatchToProps)(Game)
export default Game;
