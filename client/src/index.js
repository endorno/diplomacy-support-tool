import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {initialState} from './state'
import {Layer, Stage} from 'react-konva'
import appReducer from './reducers'
import NationMenu from './containers/NationMenu'
import Game from './containers/Game'
import NodeMenu from './containers/NodeMenu'
import {Provider} from 'react-redux'


class App extends React.Component {
    render() {
        return (
            <div>
                <NationMenu/>
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



const store = createStore(appReducer, initialState);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));