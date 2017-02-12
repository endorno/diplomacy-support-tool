/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

const Nation = {
    England: 'England',
    France: 'France'
};

const GeoType = {
    Ocean: 'Ocean',
    Land: 'Land',
    Port: 'Port'
};

class GeoNode {
    constructor(name, pos, type, is_supply) {
        this.name = name;
        this.pos = pos;
        this.type = type;
        this.is_supply = is_supply;
    }
}

class GeoEdge {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    }
}

const Map = {
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

export {Nation, GeoType, Map};