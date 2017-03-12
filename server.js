/**
 * Created by teppei.fujisawa on 2017/02/14.
 */
import {Nation, UnitType} from './client/src/config'
import {gameReducer} from './client/src/reducers'

var server = require('http').createServer();
var io = require('socket.io')(server);

var initialGameState = {
    units: [
        // {type: UnitType.Army, nation: Nation.England, nodeKey: 'Lon'},
        // {type: UnitType.Navy, nation: Nation.England, nodeKey: 'Wal'},
        // {type: UnitType.Army, nation: Nation.France, nodeKey: 'Bre'},
        {nation: Nation.England, nodeKey: "Lon", type: UnitType.Navy,},
        {nation: Nation.England, nodeKey: "Lvp", type: UnitType.Army,},
        {nation: Nation.England, nodeKey: "Edi", type: UnitType.Navy,},
        {nation: Nation.France, nodeKey: "Par", type: UnitType.Army,},
        {nation: Nation.France, nodeKey: "Mar", type: UnitType.Army,},
        {nation: Nation.France, nodeKey: "Bre", type: UnitType.Navy,},
        {nation: Nation.Germany, nodeKey: "Ber", type: UnitType.Army,},
        {nation: Nation.Germany, nodeKey: "Mun", type: UnitType.Army,},
        {nation: Nation.Germany, nodeKey: "Kie", type: UnitType.Navy,},
        {nation: Nation.Italy, nodeKey: "Rom", type: UnitType.Army,},
        {nation: Nation.Italy, nodeKey: "Ven", type: UnitType.Army,},
        {nation: Nation.Italy, nodeKey: "Nap", type: UnitType.Navy,},
        {nation: Nation.Austria, nodeKey: "Vie", type: UnitType.Army,},
        {nation: Nation.Austria, nodeKey: "Bud", type: UnitType.Army,},
        {nation: Nation.Austria, nodeKey: "Tri", type: UnitType.Navy,},
        {nation: Nation.Russia, nodeKey: "StPS", type: UnitType.Navy,},
        {nation: Nation.Russia, nodeKey: "Mos", type: UnitType.Army,},
        {nation: Nation.Russia, nodeKey: "War", type: UnitType.Army,},
        {nation: Nation.Russia, nodeKey: "Sev", type: UnitType.Navy,},
        {nation: Nation.Turky, nodeKey: "Con", type: UnitType.Army,},
        {nation: Nation.Turky, nodeKey: "Ank", type: UnitType.Navy,},
        {nation: Nation.Turky, nodeKey: "Smy", type: UnitType.Army,},


    ],
    supplies: {
        Lon: Nation.England,
        Lvp: Nation.England,
        Edi: Nation.England,

        Par: Nation.France,
        Mar: Nation.France,
        Bre: Nation.France,

        Ber: Nation.Germany,
        Mun: Nation.Germany,
        Kie: Nation.Germany,

        Rom: Nation.Italy,
        Ven: Nation.Italy,
        Nap: Nation.Italy,

        Vie: Nation.Austria,
        Bud: Nation.Austria,
        Tri: Nation.Austria,

        StP: Nation.Russia,
        Mos: Nation.Russia,
        War: Nation.Russia,
        Sev: Nation.Russia,

        Con: Nation.Turky,
        Ank: Nation.Turky,
        Smy: Nation.Turky,
    }


};

const gameReducerOnServer = (state = {}, action) => {
    //状態の整合性をチェックするべきだし、アルゴリズム自体共有するべきではない。
    //TODO エラーハンドリングのやり方を考えて実装し直す（IDで一意に管理したい）
    return gameReducer(state, action);
}


var rooms = {};
io.on('connection', function (client) {
    console.log('on connected:');
    client.on('disconnect', function () {
        console.log('on disconnected:');
    });

    client.on('join_room', (data) => {
        let room_id = data.room_id;
        if (rooms[room_id] === undefined) {
            console.log('new room created:', room_id);
            rooms[room_id] = Object.assign({}, initialGameState);
        }
        console.log('join new user:', data.room_id);
        client.room_id = data.room_id;
        client.join(data.room_id);
        client.emit('action', {
            type: 'SET_INITIAL_STATE',
            value: rooms[room_id]
        });
    });

    client.on('action', (action) => {
        if (client.room_id === undefined) {
            console.log('not join room');
            return;
        }

        if (action.type.includes('GET_LATEST_STATE')) {
            client.emit('action', {
                type: 'SET_LATEST_STATE',
                value: rooms[client.room_id]
            });
            return;
        }

        let local_action = Object.assign({}, action, {
            type: action.type.replace("server/", "")
        });

        rooms[client.room_id] = gameReducerOnServer(rooms[client.room_id], local_action);
        io.to(client.room_id).emit('action', local_action);
    });

});
console.log('listen on 3012');
server.listen(3012);