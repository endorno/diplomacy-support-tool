import React from 'react';
import ReactDOM from 'react-dom';
import Konva from 'konva';
import {Layer, Rect, Stage, Group, Circle, Line, Star} from 'react-konva';

const Country = {
    England: 'England',
    France: 'France'
};

const GeoType = {
    Ocean: 'Ocean',
    Land: 'Land',
    Port: 'Port'
};

class GeoNode {
    constructor(name, pos, type, is_source) {
        this.name = name;
        this.pos = pos;
        this.type = type;
        this.is_source = is_source;
    }
}

class GeoEdge {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    }
}


const geo = {
    nodes: {
        Iri: new GeoNode('Irish Ocean', {x: 200, y: 500}, GeoType.Ocean, false),
        Wal: new GeoNode('Wales', {x: 300, y: 500}, GeoType.Port, false),
        Lon: new GeoNode('London', {x: 350, y: 500}, GeoType.Port, true),
        Eng: new GeoNode('English Channel', {x: 275, y: 540}, GeoType.Ocean, false),
        Bre: new GeoNode('Brest', {x: 300, y: 575}, GeoType.Ocean, true),
    },
    edges: [
        new GeoEdge('Iri', 'Wal'),
        new GeoEdge('Wal', 'Lon'),
        new GeoEdge('Wal', 'Eng'),
        new GeoEdge('Iri', 'Eng'),
        new GeoEdge('Eng', 'Lon'),
        new GeoEdge('Eng', 'Bre')
    ],
};

class Force {
    constructor(country, initial_node) {
        this.country = country;
        this.node = initial_node;
    }
}

class Army extends Force {
    constructor(country, initial_node) {
        super(country, initial_node)
        this.color = 'green';
    }
}

class Navy extends Force {
    constructor(country, initial_node) {
        super(country, initial_node)
        this.color = 'blue';
    }
}


// state
const forces = [
    new Army(Country.England, 'Lon'),
    new Navy(Country.England, 'Wal'),
    new Army(Country.France, 'Bre')
];

const sources = [];


class Field extends React.Component {
    render() {
        var nodes = Object.keys(geo.nodes).map((key) => {
            var node = geo.nodes[key];
            return <Circle key={node.name} x={node.pos.x} y={node.pos.y} width={30} height={30} stroke={'black'}
                           fill={'white'}/>
        });

        var edges = Object.keys(geo.edges).map((key) => {
            var edge = geo.edges[key];
            var n1 = geo.nodes[edge.node1];
            var n2 = geo.nodes[edge.node2];
            return <Line key={n1.name + '-' + n2.name} points={[n1.pos.x, n1.pos.y, n2.pos.x, n2.pos.y]}
                         stroke={'black'}
                         strokeWidth={5}/>
        });

        var forces_elements = forces.map((force) => {
            var n = geo.nodes[force.node];
            return <Rect key={n.name + '-force'} x={n.pos.x} y={n.pos.y} width={10} height={10} fill={force.color}/>
        });

        var source_elements = Object.keys(geo.nodes).filter((key) => {
            return geo.nodes[key].is_source
        }).map((key) => {
            var node = geo.nodes[key];
            return <Star key={node.name + '-source'} x={node.pos.x + 10} y={node.pos.y - 10} numPoints={5}
                         innerRadius={5} outerRadius={10} stroke={'black'} fill={'yellow'}/>

        });

        return (
            <Group>
                {edges}
                {nodes}
                {forces_elements}
                {source_elements}
            </Group>
        )
    }
}

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

function App() {
    // Stage - is a div wrapper
    // Layer - is a <canvas> element on the page
    // so you can use several canvases. It may help you to improve performance a lot.
    return (
        <Stage width={700} height={700}>
            <Layer>
                <Field />
            </Layer>
        </Stage>
    );
}


ReactDOM.render(
    <App/>
    , document.getElementById('root'));