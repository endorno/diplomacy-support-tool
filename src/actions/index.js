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

export const selectNode = (nodeKey) => {
    return {
        type: 'SELECT_NODE',
        nodeKey: nodeKey
    }
};