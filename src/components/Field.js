/**
 * Created by teppei.fujisawa on 2017/02/12.
 */
import {Map} from '../config'
import React from 'react'
import Konva from 'konva';
import {Rect, Group, Circle, Line, Star} from 'react-konva';

class Node extends React.Component {
    render() {
        let node = this.props.node;
        var supply = null;
        if (node.is_supply) {
            supply = <Star key={node.name + '-source'}
                           x={node.pos.x + 10}
                           y={node.pos.y - 10}
                           numPoints={5}
                           innerRadius={5}
                           outerRadius={10}
                           stroke={'black'} fill={'yellow'}
            />
        }
        return (
            <Group key={node.name + '-group'}>
                <Circle key={node.name}
                        x={node.pos.x}
                        y={node.pos.y}
                        width={30} height={30}
                        stroke={'black'} fill={'white'}
                        onClick={this.props.nodeClick}
                />
                {supply}
            </Group>
        )
            ;
    }
}

export default class Field extends React.Component {
    constructor(...args) {
        super(...args)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    }

    render() {
        let nodes = Object.keys(Map.nodes).map((key) => {
            let node = Map.nodes[key];
            return <Node key={node.name} node={node} nodeClick={this.handleClick}/>
        });

        let edges = Object.keys(Map.edges).map((key) => {
            let edge = Map.edges[key];
            let n1 = Map.nodes[edge.node1];
            let n2 = Map.nodes[edge.node2];
            return <Line key={n1.name + '-' + n2.name} points={[n1.pos.x, n1.pos.y, n2.pos.x, n2.pos.y]}
                         stroke={'black'}
                         strokeWidth={5}/>
        });

        let unit_elements = this.props.units.map((unit, i) => {
            let n = Map.nodes[unit.nodeKey];
            return <Rect key={i + n.name + '-force'} x={n.pos.x} y={n.pos.y} width={10} height={10} fill={'green'}/>
        });

        // var source_elements = Object.keys(geo.nodes).filter((key) => {
        //     return geo.nodes[key].is_source
        // }).map((key) => {
        //     var node = geo.nodes[key];
        //     return <Star key={node.name + '-source'} x={node.pos.x + 10} y={node.pos.y - 10} numPoints={5}
        //                  innerRadius={5} outerRadius={10} stroke={'black'} fill={'yellow'}/>
        //
        // });

        return (
            <Group>
                {edges}
                {nodes}
                {unit_elements}
            </Group>
        )
    }
}
