/**
 * Created by teppei.fujisawa on 2017/02/13.
 */

import {clickMoveUnit} from '../actions'
import {connect} from 'react-redux'
import React from 'react'

class NodeMenu extends React.Component {
    render() {
        return (
            <p>
                NodeMenu:
                {" "}
                <a href="#"
                   onClick={ e => {
                       e.preventDefault();
                       this.props.onMoveUnitButtonClick();
                   }}
                >MoveUnit</a>
                {", "}
                <a href="#"
                   onClick={ e => {
                       e.preventDefault();
                       alert('not implemented');
                   }}
                >New</a>
            </p>
        )
    }
}

const mapStateToProos = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMoveUnitButtonClick: () => {
            dispatch(clickMoveUnit())
        }
    }
}

export default NodeMenu = connect(mapStateToProos, mapDispatchToProps)(NodeMenu)

