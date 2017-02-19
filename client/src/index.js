import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {initialState} from './state'
import {Layer, Stage, Image} from 'react-konva'
import appReducer from './reducers'
import NationMenu from './containers/NationMenu'
import Game from './containers/Game'
import NodeMenu from './containers/NodeMenu'
import {Provider} from 'react-redux'


// try drag& drop rectangle
class MyImage extends React.Component {
    state = {
        image: null
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = '/images/map1_5.png';
        image.onload = () => {
            this.setState({
                image: image
            });
        }
    }

    render() {
        return (
            <Image
                image={this.state.image}
            />
        );
    }
}

class App extends React.Component {
    render() {
        let absoluteStyle = {
            position: 'absolute'
        };
        var width = window.innerWidth;
        var height = window.innerHeight;
        return (

            <div>
                <NationMenu/>
                <NodeMenu/>
                <Stage width={width} height={height} draggable={true}>
                    <Layer>
                        <MyImage />
                        <Game />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
// let socket = io('http://10.0.1.7:3012');
let socket = io('/');
let socketIoMiddleWare = createSocketIoMiddleware(socket, "server/");


const store = applyMiddleware(socketIoMiddleWare)(createStore)(appReducer, initialState);

socket.emit('join_room', {room_id: 'global'});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));