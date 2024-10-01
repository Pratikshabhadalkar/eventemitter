const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');

class ServerMonitor extends EventEmitter {
  constructor(cpuThreshold = 1.5, memoryThreshold = 80) {
    super();
    this.cpuThreshold = cpuThreshold;
    this.memoryThreshold = memoryThreshold;
    this.isMonitoringCPU = true;
    this.isMonitoringMemory = true;
    this.logFilePath = 'overload.log';
    this.startMonitoring();
  }

  startMonitoring() {
    console.log('Server monitoring started...');
    this.monitorInterval = setInterval(() => {
      const cpuLoad = os.loadavg()[0];
      const memoryUsage = this.getMemoryUsage();

      if (this.isMonitoringCPU && cpuLoad > this.cpuThreshold) {
        this.emit('overload', 'CPU', cpuLoad);
      }

      if (this.isMonitoringMemory && memoryUsage > this.memoryThreshold) {
        this.emit('overload', 'Memory', memoryUsage);
      }
    }, 1000);
  }

  stopMonitoring() {
    clearInterval(this.monitorInterval);
    console.log('Server monitoring stopped.');
  }

  adjustThreshold(type, newThreshold) {
    if (type === 'CPU') {
      this.cpuThreshold = newThreshold;
    } else if (type === 'Memory') {
      this.memoryThreshold = newThreshold;
    }
    console.log(`Threshold for ${type} adjusted to ${newThreshold}`);
  }

  toggleMonitoring(type, status) {
    if (type === 'CPU') {
      this.isMonitoringCPU = status;
    } else if (type === 'Memory') {
      this.isMonitoringMemory = status;
    }
    console.log(`${type} monitoring ${status ? 'started' : 'stopped'}.`);
  }

  getMemoryUsage() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    return (usedMemory / totalMemory) * 100;
  }

  logOverload(type, load) {
    const logMessage = `Warning: ${type} Overload at ${new Date().toLocaleString()}: Load - ${load.toFixed(2)}\n`;
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) throw err;
      console.log('Logged overload to file.');
    });
  }
}

const monitor = new ServerMonitor();

monitor.on('overload', (type, load) => {
  console.warn(`Warning: ${type} overload detected! Load: ${load.toFixed(2)}`);
  monitor.logOverload(type, load);
});


setTimeout(() => monitor.adjustThreshold('CPU', 1.2), 5000);
setTimeout(() => monitor.toggleMonitoring('Memory', false), 10000);
setTimeout(() => monitor.stopMonitoring(), 15000);
 