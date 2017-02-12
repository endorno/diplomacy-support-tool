/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

import {combineReducers} from 'redux'

// import {addUnit} from '../actions'
 import {Nation} from '../config'



const moveUnits = (units, fromNodeKey, toNodeKey) => {
    return units.map((unit) => {
        if (fromNodeKey === unit.nodeKey) {
            return Object.assign({}, unit, {
                    nodeKey: toNodeKey
                }
            );
        } else {
            return unit;
        }
    });
};

const nation = (state = Nation.England, action) => {
    switch (action.type) {
        case 'SELECT_MY_NATION':
            return action.nation;
        default:
            return state;
    }
}


const game = (state = {}, action) => {
    switch (action.type) {
        case 'MOVE_UNIT':
            return Object.assign({}, state, {
                units: moveUnits(state.units, action.fromNodeKey, action.toNodeKey)
            });
        default:
            return state;
    }
};

const controller = (state = {}, action) => {
    switch (action.type) {
        case 'SELECT_NODE':
            console.log('select node:' + action.nodeKey);
            return Object.assign({}, state, {
                selectedNodeKey: action.nodeKey
            });
        case 'SELECT_MY_NATION':
            return Object.assign({}, state, {
                selectedNodeKey: null
            });
        default:
            return state;
    }
};

const appReducer = combineReducers({
    nation,
    game,
    controller
});

export default appReducer;