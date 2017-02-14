// game
export const addUnit = (nation, unit_type, node) => {
    return {
        type: 'ADD_UNIT',
        unit_type, node,
    }
}

export const moveUnit = (fromNodeKey, toNodeKey) => {
    return {
        type: 'MOVE_UNIT',
        fromNodeKey, toNodeKey,
    }
}


// controller
export const selectNode = (nodeKey) => {
    return {
        type: 'SELECT_NODE',
        nodeKey: nodeKey
    }
};

export const toMoveUnitMode = () => {
    return {
        type: 'TO_MOVE_UNIT_MODE',
    }
};


// nation
export const selectMyNation = (nation) => {
    return {
        type: 'SELECT_MY_NATION',
        nation: nation
    }
};