const { appendFile } = require("fs");
const path = require("path");

class LogStrategy {
  static toFile(message, timestamp) {
    appendFile(
      path.join(__dirname, "logger.log"),
      `${timestamp} - ${message}\n`,
      () => {}
    );
  }

  static toConsole(message, timestamp) {
    console.log(`${timestamp} - ${message}`);
  }

  static noDate(message, timestamp) {
    console.log(message);
  }

  static none(message, timestamp) {}
}

class Logger {
  constructor(startegy = LogStrategy.toConsole) {
    this.logs = [];
    this.startegy = startegy;
  }

  changeStrategy(startegy) {
    this.startegy = LogStrategy[startegy];
  }

  log(message) {
    this.startegy(message, new Date().toISOString());
  }
}

const start = () => {
  const logger = new Logger();
  logger.log(" message 1");
  logger.log(" message 2");
  logger.log(" message 3");
  logger.changeStrategy("toFile");
  logger.log(" message 1");
  logger.log(" message 2");
  logger.log(" message 3");
  logger.changeStrategy("noDate");
  logger.log(" message 1");
  logger.log(" message 2");
  logger.log(" message 3");
  logger.changeStrategy("none");
  logger.log(" message 1");
  logger.log(" message 2");
  logger.log(" message 3");
};

module.exports = () => {
  console.log("===Strategy===");
  start();
};
