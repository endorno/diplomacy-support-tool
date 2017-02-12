import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import {Layer, Stage} from 'react-konva'
import {Nation} from './config'
import appReducer from './reducers'
import Game from './containers/Game'
import NodeMenu from './containers/NodeMenu'
import {Provider} from 'react-redux'


class App extends React.Component {
    render() {
        return (
            <div>
                <NodeMenu />
                <Stage width={700} height={700}>
                    <Layer>
                        <Game />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

const gameInitialState = {
    game: {
        units: [
            {type: 'Army', nation: Nation.England, nodeKey: 'Lon'},
            {type: 'Navy', nation: Nation.England, nodeKey: 'Wal'},
            {type: 'Army', nation: Nation.France, nodeKey: 'Bre'},
        ]
    },
    controller: {}
};

const store = createStore(appReducer, gameInitialState);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));