const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }

  joinRoom(user) {
    if (this.users.includes(user)) {
      console.log(`${user} is already in the chat room.`);
    } else {
      this.users.push(user);
      console.log(`${user} joined the chat room.`);
      this.emit('join', user);
    }
  }

 
  leaveRoom(user) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
      console.log(`${user} left the chat room.`);
      this.emit('leave', user);
    } else {
      console.log(`${user} is not in the chat room.`);
    }
  }


  sendMessage(user, message) {
    if (this.users.includes(user)) {
      this.emit('message', user, message);
    } else {
      console.log(`${user} is not in the chat room.`);
    }
  }

  
  sendPrivateMessage(fromUser, toUser, message) {
    if (this.users.includes(fromUser) && this.users.includes(toUser)) {
      this.emit('privateMessage', fromUser, toUser, message);
    } else {
      console.log(`${fromUser} or ${toUser} is not in the chat room.`);
    }
  }

  
  broadcastMessage(message) {
    if (this.users.length > 0) {
      this.users.forEach(user => {
        this.emit('broadcast', user, message);
      });
    } else {
      console.log(`No users in the chat room to broadcast the message.`);
    }
  }

  listUsers() {
    if (this.users.length > 0) {
      console.log(`Active users in the chat room: ${this.users.join(', ')}`);
    } else {
      console.log(`The chat room is empty.`);
    }
  }
}


const chatRoom = new ChatRoom();


chatRoom.on('join', (user) => {
  console.log(`Notification: ${user} has joined the chat!`);
});

chatRoom.on('leave', (user) => {
  console.log(`Notification: ${user} has left the chat.`);
});

chatRoom.on('message', (user, message) => {
  console.log(`${user} says: ${message}`);
});

chatRoom.on('privateMessage', (fromUser, toUser, message) => {
  console.log(`Private message from ${fromUser} to ${toUser}: ${message}`);
});

chatRoom.on('broadcast', (user, message) => {
  console.log(`Broadcast to ${user}: ${message}`);
});


chatRoom.joinRoom('Alice');
chatRoom.joinRoom('Bob');
chatRoom.joinRoom('Alice'); 

chatRoom.sendMessage('Alice', 'Hello, everyone!');
chatRoom.sendMessage('Bob', 'Hey Alice!');

chatRoom.sendPrivateMessage('Alice', 'Bob', 'This is a private message.');
chatRoom.sendPrivateMessage('Alice', 'Charlie', 'Should give an error.');

chatRoom.broadcastMessage('This is a broadcast message.');

chatRoom.leaveRoom('Alice');
chatRoom.sendMessage('Alice', 'Goodbye!'); 

chatRoom.listUsers(); 
chatRoom.leaveRoom('Bob');
chatRoom.listUsers(); 
