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
    Russia: new NationDefinition('Russia', '#C1C1C1'),
    France: new NationDefinition('France', '#4197A3'),
    Germany: new NationDefinition('Germany', '#626262'),
    Austria: new NationDefinition('Austria', '#CB4347'),
    Italy: new NationDefinition('Italy', '#3B9432'),
    Turky: new NationDefinition('Turky', '#B19C37')
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
        // c.f. http://diplomacy.g.hatena.ne.jp/keyword/%E5%9C%B0%E5%9B%B3%E3%81%A8%E5%9C%B0%E5%90%8D

        // England
        Lon: new GeoNode('London', {x: 530, y: 680}, GeoType.Port, true),
        Lvp: new GeoNode('Liverpool', {x: 466, y: 587}, GeoType.Port, true),
        Edi: new GeoNode('Edinburgh', {x: 509, y: 495}, GeoType.Port, true),
        Wal: new GeoNode('Wales', {x: 434, y: 672}, GeoType.Port, false),
        Yor: new GeoNode('York', {x: 512, y: 618}, GeoType.Port, false),
        Cly: new GeoNode('Clyde', {x: 437, y: 465}, GeoType.Port, false),

        // France
        Par: new GeoNode('Paris', {x: 493, y: 850}, GeoType.Land, true),
        Mar: new GeoNode('Marseil', {x: 524, y: 1002}, GeoType.Port, true),
        Bre: new GeoNode('Brest', {x: 443, y: 781}, GeoType.Port, true),
        Pic: new GeoNode('Picardy', {x: 515, y: 748}, GeoType.Port, false),
        Bur: new GeoNode('Burgundy', {x: 569, y: 844}, GeoType.Land, false),
        Gas: new GeoNode('Gascony', {x: 416, y: 898}, GeoType.Port, false),


        // Germany
        Ber: new GeoNode('Berlin', {x: 795, y: 648}, GeoType.Port, true),
        Mun: new GeoNode('Munich', {x: 700, y: 836}, GeoType.Land, true),
        Kie: new GeoNode('Kiel', {x: 697, y: 655}, GeoType.Port, true),
        Ruh: new GeoNode('Ruhr', {x: 650, y: 765}, GeoType.Land, false),
        Sil: new GeoNode('Silesia', {x: 857, y: 752}, GeoType.Land, false),
        Pru: new GeoNode('Prussia', {x: 909, y: 634}, GeoType.Port, false),

        //Italy
        Rom: new GeoNode('Roma', {x: 744, y: 1100}, GeoType.Port, true),
        Ven: new GeoNode('Venezia', {x: 746, y: 958}, GeoType.Port, true),
        Nap: new GeoNode('Napoli', {x: 802, y: 1149}, GeoType.Port, true),
        Apu: new GeoNode('Apulia', {x: 840, y: 1107}, GeoType.Port, false),
        Pie: new GeoNode('Piemonte', {x: 652, y: 981}, GeoType.Port, false),
        Tus: new GeoNode('Tuscana', {x: 691, y: 1027}, GeoType.Port, false),

        // Austria
        Vie: new GeoNode('Vienna', {x: 834, y: 877}, GeoType.Land, true),
        Bud: new GeoNode('Budapest', {x: 958, y: 938}, GeoType.Land, true),
        Tri: new GeoNode('Trieste', {x: 838, y: 1008}, GeoType.Port, true),
        Gal: new GeoNode('Galicia', {x: 1024, y: 806}, GeoType.Land, false),
        Boh: new GeoNode('Bohemia', {x: 806, y: 821}, GeoType.Land, false),
        Tyr: new GeoNode('Tyrolia', {x: 747, y: 891}, GeoType.Land, false),

        // Russia
        StP: new GeoNode('Saint Petersburg', {x: 1161, y: 418}, GeoType.Port, true),
        StPS: new GeoNode('Saint Petersburg South', {x: 1052, y: 449}, GeoType.Port, false),
        StPN: new GeoNode('Saint Petersburg North', {x: 1227, y: 168}, GeoType.Port, false),
        Mos: new GeoNode('Moscow', {x: 1234, y: 613}, GeoType.Land, true),
        War: new GeoNode('Marsaw', {x: 989, y: 705}, GeoType.Land, true),
        Sev: new GeoNode('Stevastopol', {x: 1297, y: 892}, GeoType.Port, true),
        Fin: new GeoNode('Finland', {x: 1017, y: 380}, GeoType.Port, false),
        Lvn: new GeoNode('Livonia', {x: 1013, y: 544}, GeoType.Port, false),
        Ukr: new GeoNode('Ukraine', {x: 1133, y: 815}, GeoType.Land, false),

        // Turky
        Con: new GeoNode('Constantinople', {x: 1147, y: 1126}, GeoType.Port, true),
        Ank: new GeoNode('Ankra', {x: 1296, y: 1057}, GeoType.Port, true),
        Smy: new GeoNode('Smyrna', {x: 1175, y: 1229}, GeoType.Port, true),
        Arm: new GeoNode('Armenia', {x: 1509, y: 1128}, GeoType.Port, false),
        Syr: new GeoNode('Syria', {x: 1469, y: 1211}, GeoType.Port, false),

        //Scandinavia
        Nwy: new GeoNode('Norway', {x: 729, y: 428}, GeoType.Port, true),
        Swe: new GeoNode('Sweeden', {x: 862, y: 484}, GeoType.Port, true),
        Den: new GeoNode('Denmark', {x: 747, y: 587}, GeoType.Port, true),


        //
        Hol: new GeoNode('Holland', {x: 609, y: 674}, GeoType.Port, true),
        Bel: new GeoNode('Belgium', {x: 548, y: 713}, GeoType.Port, true),

        //
        Por: new GeoNode('Portugal', {x: 163, y: 1095}, GeoType.Port, true),
        SpaS: new GeoNode('Spain-South', {x: 314, y: 930}, GeoType.Port, false), // TODO separate north and south
        Spa: new GeoNode('Spain', {x: 328, y: 1080}, GeoType.Port, true), // TODO separate north and south
        SpaN: new GeoNode('Spain-North', {x: 338, y: 1164}, GeoType.Port, false), // TODO separate north and south

        //
        Tun: new GeoNode('Tunisia', {x: 652, y: 1288}, GeoType.Port, true),
        NAf: new GeoNode('North Africa', {x: 302, y: 1243}, GeoType.Port, false),

        //Balkan
        Rum: new GeoNode('Romania', {x: 1121, y: 982}, GeoType.Port, true),
        BulS: new GeoNode('Bulgaria-South', {x: 1085, y: 1120}, GeoType.Port, false),
        Bul: new GeoNode('Bulgaria', {x: 1058, y: 1059}, GeoType.Port, true),
        BulE: new GeoNode('Bulgaria-East', {x: 1141, y: 1044}, GeoType.Port, false),

        Ser: new GeoNode('Serbia', {x: 966, y: 1062}, GeoType.Land, true),
        Gre: new GeoNode('Greece', {x: 1007, y: 1223}, GeoType.Port, true),
        Alb: new GeoNode('Albania', {x: 923, y: 1127}, GeoType.Port, false),

        // Ocean around Eng Fra
        NAt: new GeoNode('North Atlantic', {x: 190, y: 297}, GeoType.Ocean, false),
        MAt: new GeoNode('Mid Atlantic', {x: 143, y: 882}, GeoType.Ocean, false),
        Eng: new GeoNode('English Channel', {x: 416, y: 732}, GeoType.Ocean, false),
        Iri: new GeoNode('Irish Sea', {x: 332, y: 681}, GeoType.Ocean, false),
        Nth: new GeoNode('North Sea', {x: 604, y: 536}, GeoType.Ocean, false),
        Nrg: new GeoNode('Norweigan Sea', {x: 657, y: 201}, GeoType.Ocean, false),


        // Ocean around Russia/Germany
        Bla: new GeoNode('Black Sea', {x: 1293, y: 1008}, GeoType.Ocean, false),
        Bar: new GeoNode('Barents Sea', {x: 1164, y: 60}, GeoType.Ocean, false),
        Hel: new GeoNode('Helgoland', {x: 656, y: 612}, GeoType.Ocean, false),
        Ska: new GeoNode('Skagerrak', {x: 750, y: 504}, GeoType.Ocean, false),
        Bal: new GeoNode('Baltic Sea', {x: 876, y: 598}, GeoType.Ocean, false),
        Bot: new GeoNode('Gulf of Bothnia', {x: 936, y: 441}, GeoType.Ocean, false),

        // Ocean midsea
        Wes: new GeoNode('West Mediterranean', {x: 505, y: 1159}, GeoType.Ocean, false),
        GoL: new GeoNode('Gulf of Lyon', {x: 564, y: 1079}, GeoType.Ocean, false),
        Tyn: new GeoNode('Tyrbennian Sea', {x: 685, y: 1133}, GeoType.Ocean, false),
        Ion: new GeoNode('Ionian Sea', {x: 870, y: 1254}, GeoType.Ocean, false),
        Adr: new GeoNode('Adriatic Sea', {x: 818, y: 1044}, GeoType.Ocean, false),
        Aeg: new GeoNode('Aegean Sea', {x: 1112, y: 1250}, GeoType.Ocean, false),
        Eas: new GeoNode('East Med', {x: 1265, y: 1286}, GeoType.Ocean, false),
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