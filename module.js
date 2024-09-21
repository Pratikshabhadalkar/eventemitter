const EventEmitter = require('events');
const http = require('http');
const fs = require('fs');


// class Logger extends EventEmitter {
  
//   logInfo(message) {
//     this.emit('info', message);
//   }
//   logWarn(message) {
//     this.emit('warn', message);
//   }
//   logError(message) {
//     this.emit('error', message);
//   }
//   logDebug(message) {
//     this.emit('debug', message);
//   }
//   logCritical(message) {
//     this.emit('critical', message);
//   }
// }
// const logger = new Logger();
// logger.on('info', (msg) => console.log(`Info: ${msg}`));
// logger.on('warn', (msg) => console.warn(`Warning: ${msg}`));
// logger.on('error', (msg) => console.error(`Error: ${msg}`));
// logger.on('debug', (msg) => console.debug(`Debug: ${msg}`));
// logger.on('critical', (msg) => console.error(`Critical Error: ${msg}`));

// logger.logInfo('Application started successfully');
// logger.logWarn('Memory usage is approaching the limit');
// logger.logError('An uncaught exception occurred');
// logger.logDebug('User login flow was executed');
// logger.logCritical('Database connection failed multiple times');





class Logger extends EventEmitter {
  logInfo(message) {
    this.emit('info', message);
  }

  logWarn(message) {
    this.emit('warn', message);
  }
  logDebug(message) {
    this.emit('debug', message);
  }
  logCritical(message) {
    this.emit('critical', message);
  }

  logError(message) {
    this.emit('error', message);
  }

  
  logToFile(level, message) {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile(`${level}.log`, logMessage, (err) => {
      if (err) console.error(`Failed to write ${level} log`, err);
    });
  }
}

const logger = new Logger();


logger.on('info', (msg) => {
  console.log(`Info: ${msg}`);
  logger.logToFile('info', msg);
});

logger.on('warn', (msg) => {
  console.warn(`Warning: ${msg}`);
  logger.logToFile('warn', msg);
});
logger.on('debug', (msg) => {
  console.warn(`Debug: ${msg}`);
  logger.logToFile('debug', msg);
});
logger.on('critical', (msg) => {
  console.error(`Critical Error: ${msg}`);
  logger.logToFile('critical', msg);
});
logger.on('error', (msg) => {
  console.error(`Error: ${msg}`);
  logger.logToFile('error', msg);
});


logger.logInfo('Application started');
logger.logWarn('High memory usage');
logger.logError('Uncaught exception');
logger.logDebug('User login flow was executed');
logger.logCritical('Database connection failed multiple times');


// const server = http.createServer((req, res) => {
  
//   logger.logInfo(`Received request: ${req.method} ${req.url}`);

//   if (req.url === '/error') {
    
//     logger.logError('Error occurred: Simulated error endpoint hit');
//     res.statusCode = 500;
//     res.end('Internal Server Error');
//   } else if (req.url === '/warn') {
    
//     logger.logWarn('Warning: High memory usage detected');
//     res.statusCode = 200;
//     res.end('Warning logged');
//   } 
//   else if (req.url === '/debug') {
    
//     logger.logWarn('Debug: User login flow was executed');
//     res.statusCode = 200;
//     res.end('Debug issues');
//   } else if (req.url === '/critical') {
    
//     logger.logCritical('Critical: Database connection failure');
//     res.statusCode = 503;
//     res.end('Service Unavailable');
//   } else {
    
//     res.statusCode = 200;
//     res.end('Request logged successfully');
//   }
// });


// server.listen(3000, () => {
//   logger.logInfo('Server started on port 3000');
// });
