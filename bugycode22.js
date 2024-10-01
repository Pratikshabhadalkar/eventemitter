// 22. Buggy Code for Practice
// Problem Statement: You have a system that logs users' actions but it seems to be
// logging the same action multiple times. Your task is to identify and fix the bug.

// const EventEmitter = require('events');
// 
// Hint: The problem arises because logUserAction attaches a new listener every time it’s
// called, so the same event may have multiple listeners.


const EventEmitter = require('events');
const userLogger = new EventEmitter();
function logUserAction(action) {
userLogger.on('logAction',()=>{
console.log(`User action: ${action}`);
})
}
logUserAction('login');
logUserAction('logout');

userLogger.emit('logAction');
userLogger.emit("logAction");


