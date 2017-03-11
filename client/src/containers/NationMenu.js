/**
 * Created by teppei.fujisawa on 2017/02/13.
 */

import {selectMyNation} from '../actions'
import {connect} from 'react-redux'
import React from 'react'
import {Nation} from '../config'
import './NationMenu.css'

class NationMenu extends React.Component {
    render() {
        let buttons = [];

        for (let nationKey in Nation) {
            if (!Nation.hasOwnProperty(nationKey)) {
                continue;
            }
            let nation = Nation[nationKey];

            buttons.push(
                <label className="NationMenuButton" key={buttons.length}>
                    <input key={buttons.length} type="radio" name="nation" value={nationKey} onChange={ e => {
                        console.log('on click nation:', nation);
                        this.props.onNationClick(nation)
                    }} checked={nation.name === this.props.nation.name}/>
                    <img src={"/images/flags/" + nation.name + ".gif"} alt={nationKey}/>
                    <br/>
                </label>
            );
        }

        return (
            <div id="NationMenu">
                {buttons}
            </div>
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

