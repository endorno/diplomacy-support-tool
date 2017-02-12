/**
 * Created by teppei.fujisawa on 2017/02/13.
 */
import {Nation} from '../config'

export const initialState = {
    nation: Nation.England,
    game: {
        units: [
            {type: 'Army', nation: Nation.England, nodeKey: 'Lon'},
            {type: 'Navy', nation: Nation.England, nodeKey: 'Wal'},
            {type: 'Army', nation: Nation.France, nodeKey: 'Bre'},
        ],

    },
    controller: {
        selectedNodeKey: null
    }
};


export const getNodeUnit = (units, nodeKey) => {
    let filtered = units.filter((unit) => {
       return unit.nodeKey === nodeKey;
    });
    if (filtered.length === 0) {
        return null;
    } else {
        // if length > 1 ?
        return filtered[0]
    }
}