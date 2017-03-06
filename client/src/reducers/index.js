/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

import {combineReducers} from 'redux'
import {ControllerMode} from '../state'
// import {addUnit} from '../actions'
import {Nation} from '../config'


const unitExistsAt = (units, toNodeKey) => {
    let destinationUnits = units.filter((unit) => {
        return unit.nodeKey === toNodeKey;
    });
    return destinationUnits.length > 0;
}

const moveUnits = (units, fromNodeKey, toNodeKey) => {
    //check destination

    if (unitExistsAt(units, toNodeKey)) {
        return units;
    }

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

const nationReducer = (state = Nation.England, action) => {
    switch (action.type) {
        case 'SELECT_MY_NATION':
            return action.nation;
        default:
            return state;
    }
}


export const gameReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return Object.assign({}, action.value);

        case 'MOVE_UNIT':
            return Object.assign({}, state, {
                units: moveUnits(state.units, action.fromNodeKey, action.toNodeKey)
            });
        case 'CREATE_UNIT':
            if (unitExistsAt(state.units, action.nodeKey)) {
                return state;
            }
            let new_unit = {
                type: action.unitType,
                nation: action.nation,
                nodeKey: action.nodeKey
            };

            let ret= Object.assign({}, state, {
                units: [...state.units, new_unit]
            });
            return ret;
        case 'DESTROY_UNIT':
            return Object.assign({}, state, {
                units: state.units.filter((unit) => {
                    return unit.nodeKey !== action.nodeKey;
                })
            });
        case 'UPDATE_SUPPLY_OWNER':

            let supplies = Object.assign({}, state.supplies, {
                [action.nodeKey]: action.nation
            });
            return Object.assign({}, state, {
                supplies: supplies
            });
        default:
            return state;
    }
};

const controllerReducer = (state = {}, action) => {
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
        case 'TO_MOVE_UNIT_MODE':
            return Object.assign({}, state, {
                mode: ControllerMode.MoveUnit
            });
        case 'MOVE_UNIT':
            return Object.assign({}, state, {
                selectedNodeKey: null,
                mode: ControllerMode.Normal
            });
        case 'CREATE_UNIT':
            return Object.assign({}, state, {
                selectedNodeKey: null,
            });
        case 'DESTROY_UNIT':
            return Object.assign({}, state, {
                selectedNodeKey: null,
            });
        default:
            return state;
    }
};

const appReducer = combineReducers({
    nation: nationReducer,
    game: gameReducer,
    controller: controllerReducer
});

export default appReducer;