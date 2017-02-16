/**
 * Created by teppei.fujisawa on 2017/02/14.
 */
import {Nation, UnitType} from './client/src/config'
import {gameReducer} from './client/src/reducers'

var server = require('http').createServer();
var io = require('socket.io')(server);

var initialGameState = {
    units: [
        {type: UnitType.Army, nation: Nation.England, nodeKey: 'Lon'},
        {type: UnitType.Navy, nation: Nation.England, nodeKey: 'Wal'},
        {type: UnitType.Army, nation: Nation.France, nodeKey: 'Bre'},
    ],
    supplies: {
        Lon: Nation.England,
        Bre: Nation.France,
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
            rooms[room_id] = Object.assign({}, initialGameState);
        }
        console.log('join new user:', data.room_id);
        client.room_id = data.room_id;
        client.join(data.room_id);
        console.log('set initial state:', rooms[room_id]);
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
        let local_action = Object.assign({}, action, {
            type: action.type.replace("server/", "")
        });

        rooms[client.room_id] = gameReducerOnServer(rooms[client.room_id], local_action);
        io.to(client.room_id).emit('action', local_action);
    });

});
console.log('listen on 3012');
server.listen(3012);