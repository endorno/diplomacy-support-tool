/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

import {combineReducers} from 'redux'
import {addUnit} from '../actions'
import {Nation, Map} from '../config'



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

const controller = (state, action) => {
    switch (action.type) {
        case 'SELECT_NODE':
            return Object.assign({}, state, {
                selectedNodeKey: action.nodeKey
            });
        default:
            return state;
    }
};

const appReducer = combineReducers({
    game
});

export default appReducer;