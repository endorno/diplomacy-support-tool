import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import {Layer, Stage} from 'react-konva'
import {Nation} from './config'
import appReducer from './reducers'
import Game from './containers/Game'
import {Provider} from 'react-redux'

// const ActionType = {
//     NodeClick: "NodeClick"
// };
// const Country = {
//     England: 'England',
//     France: 'France'
// };
//
// const GeoType = {
//     Ocean: 'Ocean',
//     Land: 'Land',
//     Port: 'Port'
// };
//
// //定義 immutable
// class GeoNode {
//     constructor(name, pos, type, is_source) {
//         this.name = name;
//         this.pos = pos;
//         this.type = type;
//         this.is_source = is_source;
//     }
// }
//
// class GeoEdge {
//     constructor(node1, node2) {
//         this.node1 = node1;
//         this.node2 = node2;
//     }
// }
//
//
// const geo = {
//     nodes: {
//         Iri: new GeoNode('Irish Ocean', {x: 200, y: 500}, GeoType.Ocean, false),
//         Wal: new GeoNode('Wales', {x: 300, y: 500}, GeoType.Port, false),
//         Lon: new GeoNode('London', {x: 350, y: 500}, GeoType.Port, true),
//         Eng: new GeoNode('English Channel', {x: 275, y: 540}, GeoType.Ocean, false),
//         Bre: new GeoNode('Brest', {x: 300, y: 575}, GeoType.Ocean, true),
//     },
//     edges: [
//         new GeoEdge('Iri', 'Wal'),
//         new GeoEdge('Wal', 'Lon'),
//         new GeoEdge('Wal', 'Eng'),
//         new GeoEdge('Iri', 'Eng'),
//         new GeoEdge('Eng', 'Lon'),
//         new GeoEdge('Eng', 'Bre')
//     ],
// };
//
// //初期状態 mutable
//
// class Force {
//     constructor(country, initial_node) {
//         this.country = country;
//         this.node = initial_node;
//     }
//
//     moveRandomly() {
//         let keys = Object.keys(geo.nodes);
//         this.node = keys[Math.floor(Math.random() * keys.length)];
//     }
// }
//
// class Army extends Force {
//     constructor(country, initial_node) {
//         super(country, initial_node)
//         this.color = 'green';
//     }
// }
//
// class Navy extends Force {
//     constructor(country, initial_node) {
//         super(country, initial_node)
//         this.color = 'blue';
//     }
// }
//
//
// // state
// const forces = [
//     new Army(Country.England, 'Lon'),
//     new Navy(Country.England, 'Wal'),
//     new Army(Country.France, 'Bre')
// ];
//
//
// const initialState = {
//     forces: forces
// };
//
// function shuffleForcePlace(forces) {
//     //TODO copy and immutable
//     for (let i in forces) {
//         forces[i].moveRandomly();
//     }
//     return forces;
// }
//
// class GameMaster {
//
//     constructor() {
//
//     }
//
//     reducer(state, action) {
//         switch (action.type) {
//             case ActionType.NodeClick:
//                 // random shuffler
//                 return Object.assign({}, state, {
//                     forces: shuffleForcePlace(state.forces)
//                 });
//             default:
//                 return state;
//         }
//     }
//
//     mapStateToProps(state) {
//         return {
//             value: state.value
//         };
//     }
//
//     mapDispatchToProps(dispatch) {
//         return {
//             onClick(value) {
//                 dispatch({type: ActionType.NodeClick, value: value});
//             }
//         }
//     }
// }
//
//
// class Field extends React.Component {
//     constructor(...args) {
//         super(...args)
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     handleClick() {
//         this.setState({
//             color: Konva.Util.getRandomColor()
//         });
//     }
//
//     render() {
//         var nodes = Object.keys(geo.nodes).map((key) => {
//             var node = geo.nodes[key];
//             return <Circle key={node.name} x={node.pos.x} y={node.pos.y} width={30} height={30} stroke={'black'}
//                            fill={'white'} onClick={this.handleClick}/>
//         });
//
//         var edges = Object.keys(geo.edges).map((key) => {
//             var edge = geo.edges[key];
//             var n1 = geo.nodes[edge.node1];
//             var n2 = geo.nodes[edge.node2];
//             return <Line key={n1.name + '-' + n2.name} points={[n1.pos.x, n1.pos.y, n2.pos.x, n2.pos.y]}
//                          stroke={'black'}
//                          strokeWidth={5}/>
//         });
//
//         var forces_elements = forces.map((force, i) => {
//             var n = geo.nodes[force.node];
//             return <Rect key={i + n.name + '-force'} x={n.pos.x} y={n.pos.y} width={10} height={10} fill={force.color}/>
//         });
//
//         var source_elements = Object.keys(geo.nodes).filter((key) => {
//             return geo.nodes[key].is_source
//         }).map((key) => {
//             var node = geo.nodes[key];
//             return <Star key={node.name + '-source'} x={node.pos.x + 10} y={node.pos.y - 10} numPoints={5}
//                          innerRadius={5} outerRadius={10} stroke={'black'} fill={'yellow'}/>
//
//         });
//
//         return (
//             <Group>
//                 {edges}
//                 {nodes}
//                 {forces_elements}
//                 {source_elements}
//             </Group>
//         )
//     }
// }


// class MyRect extends React.Component {
//     constructor(...args) {
//         super(...args);
//         this.state = {
//             color: 'green'
//         };
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     handleClick() {
//         this.setState({
//             color: Konva.Util.getRandomColor()
//         });
//     }
//
//     render() {
//         return (
//             <Rect
//                 x={10} y={10} width={50} height={50}
//                 fill={this.state.color}
//                 shadowBlur={10}
//                 onClick={this.handleClick}
//             />
//         );
//     }
// }

class App extends React.Component {

    // Stage - is a div wrapper
    // Layer - is a <canvas> element on the page
    // so you can use several canvases. It may help you to improve performance a lot.
    render() {
        // console.log(this.props);
        return (
            <Stage width={700} height={700}>
                <Layer>
                    <Game />
                </Layer>
            </Stage>
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
    controller: {

    }
};

const store = createStore(appReducer, gameInitialState);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));