import 'package:flutter/material.dart';
import 'package:tictactoe_game/resources/socket_client.dart';
import 'package:tictactoe_game/screens/game_screen.dart';

class SocketMethods {
  final _socketClient = SocketClient.instance.socket!;

  void createRoom(String nickname) {
    if (nickname.isNotEmpty) {
      _socketClient.emit('createRoom', {
        'nickname': nickname,
      });
    }
    void createRoomSuccessListener(BuildContext context) {
      _socketClient.on('createRoomSuccess', (room) {
        print(room);
        Navigator.pushNamed(context, GameScreen.routeName);
      });
    }
  }

  void createRoomSuccessListener(BuildContext context) {}
}
