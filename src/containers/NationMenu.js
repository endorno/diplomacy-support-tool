/**
 * Created by teppei.fujisawa on 2017/02/13.
 */

import {selectMyNation} from '../actions'
import {connect} from 'react-redux'
import React from 'react'
import {Nation} from '../config'

class NationMenu extends React.Component {
    render() {
        let buttons = [];

        for (let nationKey in Nation) {
            if (!Nation.hasOwnProperty(nationKey)) {
                continue;
            }
            let nation = Nation[nationKey];

            if (nation !== this.props.nation) {
                buttons.push(
                    <a href="#"
                       onClick={ e => {
                           e.preventDefault();
                           this.props.onNationClick(nation)
                       }}
                    >{nation.name}</a>
                );
            } else {
                buttons.push(
                    <span>{nation.name}</span>
                );
            }
        }
        return (
            <p>
                Current nation:
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
    return {
        nation: state.nation
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNationClick: (nation) => {
            dispatch(selectMyNation(nation));
        }
    }
}

export default connect(mapStateToProos, mapDispatchToProps)(NationMenu)

