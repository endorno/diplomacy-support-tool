// game
export const createUnit = (nodeKey, nation, unitType) => {
    return {
        type: 'server/CREATE_UNIT',
        nodeKey, nation, unitType,
    }
};

export const destroyUnit = (nodeKey) => {
    return {
        type: 'server/DESTROY_UNIT',
        nodeKey
    }
};

export const moveUnit = (fromNodeKey, toNodeKey) => {
    return {
        type: 'server/MOVE_UNIT',
        fromNodeKey, toNodeKey,
    }
};

export const updateSupplyOwner = (nodeKey, nation) => {
    return {
        type: 'server/UPDATE_SUPPLY_OWNER',
        nodeKey, nation
    };
};

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

export const getLatestState = () => {
    return {
        type:'server/GET_LATEST_STATE',
    };
}

export const toggleRemoteSync = () => {
    return {
        type:'TOGGLE_REMOTE_SYNC',
    };
}