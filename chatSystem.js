const EventEmitter = require('events');

class Chat extends EventEmitter {
  constructor() {
    super();
    this.rooms = {}; 
  }

 
  joinRoom(user, room) {
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    console.log(`${user} joined ${room}`);
    this.emit('join', user, room);
  }

  
  sendMessage(user, room, message) {
    const timestamp = new Date().toLocaleTimeString();
    const fullMessage = { user, message, timestamp };

    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }

    this.rooms[room].push(fullMessage); 
    this.emit('message', room, fullMessage);
  }

  
  getMessageHistory(room) {
    return this.rooms[room] ? this.rooms[room] : [];
  }
}

const chatRoom = new Chat();


chatRoom.on('message', (room, { user, message, timestamp }) => {
  console.log(`[${timestamp}] ${user} in ${room}: ${message}`);
});


chatRoom.on('join', (user, room) => {
  console.log(`${user} has joined the room: ${room}`);
});


chatRoom.joinRoom('Alice', 'General');
chatRoom.joinRoom('Bob', 'General');


chatRoom.sendMessage('Alice', 'General', 'Hello, everyone!');
chatRoom.sendMessage('Bob', 'General', 'Hey, Alice!');


const history = chatRoom.getMessageHistory('General');
console.log('\nMessage History for General:', history);


