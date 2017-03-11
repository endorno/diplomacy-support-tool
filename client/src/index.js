import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {initialState} from './state'
import {Layer, Stage, Image} from 'react-konva'
import appReducer from './reducers'
import NationMenu from './containers/NationMenu'
import Game from './containers/Game'
import NodeMenu from './containers/NodeMenu'
import CommonMenu from './containers/CommonMenu'
import {Provider} from 'react-redux'
import Url from 'urljs'

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

class MyStage extends Stage {
    constructor() {
        super()
        this.lastDist = 0;
        this.lastPoint = null;
    }

    getDistance(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }


    componentDidMount() {
        super.componentDidMount();
        let stage = this.getStage();
        var scaleBy = 1.01;
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            var oldScale = stage.scaleX();
            var mousePointTo = {
                x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
                y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
            };
            var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            stage.scale({x: newScale, y: newScale});
            var newPos = {
                x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
                y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
            };

            stage.position(newPos);
            stage.batchDraw();
        });

        stage.getContent().addEventListener('touchmove', (evt) => {
            let touch1 = evt.touches[0];
            let touch2 = evt.touches[1];

            if (touch1 && !touch2) {
                if (this.lastPoint == null) {
                    this.lastPoint = {
                        x: touch1.clientX,
                        y: touch1.clientY
                    };
                    return;
                }

                let newPos = {
                    x: stage.x() + touch1.clientX - this.lastPoint.x,
                    y: stage.y() + touch1.clientY - this.lastPoint.y,
                };

                stage.position(newPos);
                stage.batchDraw();
                this.lastPoint = {
                    x: touch1.clientX,
                    y: touch1.clientY
                };
            } else if (touch1 && touch2) {
                let dist = this.getDistance({
                    x: touch1.clientX,
                    y: touch1.clientY
                }, {
                    x: touch2.clientX,
                    y: touch2.clientY
                });
                if (!this.lastDist) {
                    this.lastDist = dist;
                }

                let clientCenter = {
                    x: (touch1.clientX + touch2.clientX) / 2.0,
                    y: (touch1.clientY + touch2.clientY) / 2.0,
                };

                let oldScale = stage.scaleX();
                let mousePointTo = {
                    x: clientCenter.x / oldScale - stage.x() / oldScale,
                    y: clientCenter.y / oldScale - stage.y() / oldScale,

                };

                let newScale = stage.scaleX() * dist / this.lastDist;
                stage.scaleX(newScale);
                stage.scaleY(newScale);

                let newPos = {
                    x: -(mousePointTo.x - clientCenter.x / newScale) * newScale,
                    y: -(mousePointTo.y - clientCenter.y / newScale) * newScale

                };
                stage.position(newPos);
                stage.batchDraw();
                this.lastDist = dist;
            }
        }, false);

        stage.getContent().addEventListener('touchend', (evt) => {
            this.lastPoint = null;
            this.lastDist = 0;
        }, false);
    }
}

class App extends React.Component {
    render() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        return (
            <div>
                <CommonMenu />
                <NationMenu/>
                <NodeMenu/>
                <MyStage width={width} height={height}
                         x={-300} y={-300}
                         draggable={false}
                >
                    <Layer>
                        <MyImage />
                        <Game />
                    </Layer>
                </MyStage>
            </div>
        );
    }
}

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
// let socket = io('http://10.0.1.7:3012');
let socket = io('/');

let store = null;

function toggableExecute(action, emit, next, dispatch) {
    if (store.getState().controller.remoteSync) {
        //default
        emit('action', action);
        next(action);
    } else {
        let localAction = {
            ...action,
            type: action.type.replace("server/", "")
        };
        dispatch(localAction);
    }
}

let socketIoMiddleWare = createSocketIoMiddleware(socket, "server/", {execute: toggableExecute});

store = applyMiddleware(socketIoMiddleWare)(createStore)(appReducer, initialState);

let room_id = Url.queryString('room_id');
if (!room_id || typeof(room_id) !== 'string') {
    room_id = 'global';
}
socket.emit('join_room', {room_id: room_id.replace("#", "")});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));