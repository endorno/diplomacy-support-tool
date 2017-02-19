/**
 * Created by teppei.fujisawa on 2017/02/12.
 */

class NationDefinition {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

const Nation = {
    England: new NationDefinition('England', '#6371BC'),
    France: new NationDefinition('France', '#4197A3')
};

const GeoType = {
    Ocean: 'Ocean',
    Land: 'Land',
    Port: 'Port'
};

const UnitType = {
    Army: 'Army',
    Navy: 'Navy'
};

// let diffX = -100
// let diffY = -400

class GeoNode {
    constructor(name, pos, type, is_supply) {
        this.name = name;
        this.pos = {x: pos.x, y: pos.y};
        this.type = type;
        this.isSupply = is_supply;
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
        // England
        NAt: new GeoNode('North Atlantic', {x: 190, y: 297}, GeoType.Ocean, false),
        Nrg: new GeoNode('Norweigan Sea', {x: 657, y: 201}, GeoType.Ocean, false),
        Cly: new GeoNode('Clyde', {x: 437, y: 465}, GeoType.Port, false),
        Edi: new GeoNode('Edinburgh', {x: 509, y: 495}, GeoType.Port, true),
        Nth: new GeoNode('North Sea', {x: 604, y: 536}, GeoType.Ocean, false),
        Lvp: new GeoNode('Liverpool', {x: 466, y: 587}, GeoType.Port, true),
        Yor: new GeoNode('York', {x: 512, y: 618}, GeoType.Port, false),
        Iri: new GeoNode('Irish Sea', {x: 332, y: 681}, GeoType.Ocean, false),
        Wal: new GeoNode('Wales', {x: 434, y: 672}, GeoType.Port, false),
        Lon: new GeoNode('London', {x: 539, y: 686}, GeoType.Port, true),
        Eng: new GeoNode('English Channel', {x: 416, y: 732}, GeoType.Ocean, false),

        // France
        Bre: new GeoNode('Brest', {x: 443, y: 781}, GeoType.Port, true),
        MAt: new GeoNode('Mid Atlantic', {x: 143, y: 882}, GeoType.Ocean, false),
        Por: new GeoNode('Portugal', {x: 163, y: 1095}, GeoType.Port, true),
        Spa: new GeoNode('Spain', {x: 328, y: 1080}, GeoType.Port, true), // TODO separate north and south
        Pic: new GeoNode('Picardy', {x: 506, y: 759}, GeoType.Port, false),
        Par: new GeoNode('Paris', {x:493 , y: 850}, GeoType.Land, true),
    },
    edges: [
        //Nat
        new GeoEdge('NAt', 'Nrg'),
        new GeoEdge('NAt', 'Cly'),
        new GeoEdge('NAt', 'Iri'),
        new GeoEdge('NAt', 'MAt'),
        new GeoEdge('NAt', 'Lvp'),
        //Nrg
        new GeoEdge('Nrg', 'Cly'),
        new GeoEdge('Nrg', 'Edi'),
        //Cly
        new GeoEdge('Cly', 'Edi'),
        new GeoEdge('Cly', 'Lvp'),
        //Edi
        new GeoEdge('Edi', 'Nth'),
        new GeoEdge('Edi', 'Lvp'),
        new GeoEdge('Edi', 'Yor'),
        //Nth
        new GeoEdge('Nth', 'Yor'),
        new GeoEdge('Nth', 'Lon'),
        new GeoEdge('Nth', 'Eng'),

        //Lvp
        new GeoEdge('Lvp', 'Iri'),
        new GeoEdge('Lvp', 'Wal'),
        new GeoEdge('Lvp', 'Yor'),
        //Yor
        new GeoEdge('Yor', 'Wal'),
        new GeoEdge('Yor', 'Lon'),

        //Iri
        new GeoEdge('Iri', 'Eng'),
        new GeoEdge('Iri', 'MAt'),
        new GeoEdge('Iri', 'Wal'),

        //
        new GeoEdge('Wal', 'Lon'),
        new GeoEdge('Wal', 'Eng'),
        new GeoEdge('Eng', 'Lon'),
        new GeoEdge('Eng', 'Bre')
    ],
};

export {Nation, GeoType, Map, UnitType};