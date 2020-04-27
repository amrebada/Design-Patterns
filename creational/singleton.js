class LoggerWithoutSingleton {
  constructor() {
    this.logs = [];
  }

  get count() {
    return this.logs.length;
  }

  log(message) {
    const timestamp = new Date().toString();
    this.logs.push({ message, timestamp });
    console.log(`${timestamp} - ${message}`);
  }
}

class LoggerWithSingleton {
  constructor() {
    this.logs = [];
    if (!LoggerWithSingleton.instance) {
      LoggerWithSingleton.instance = new LoggerWithoutSingleton();
    }
  }

  getInstance() {
    return LoggerWithSingleton.instance;
  }
}

class Store {
  constructor(isSingleton = false) {
    if (isSingleton) {
      this.logger = new LoggerWithSingleton().getInstance();
    } else {
      this.logger = new LoggerWithoutSingleton();
    }
    this.logger.log("[New Store] - create a new store");
  }
}

class Inventory {
  constructor(isSingleton = false) {
    if (isSingleton) {
      this.logger = new LoggerWithSingleton().getInstance();
    } else {
      this.logger = new LoggerWithoutSingleton();
    }
    this.logger.log("[New Inventory] - create a new Inventory");
  }
}

const start1 = () => {
  const logger = new LoggerWithoutSingleton();
  logger.log("Starting Singleton Example without Singleton ....");
  new Store();
  new Inventory();
  logger.log("Ending Singleton Example without Singleton ....");
  console.log(`${logger.count} logging message`);
  console.log("\t" + logger.logs.map((l) => l.message).join("\n\t"));
};

const start2 = () => {
  try {
    const logger = new LoggerWithSingleton().getInstance();
    logger.log("Starting Singleton Example with Singleton ....");
    new Store(true);
    new Inventory(true);
    logger.log("Ending Singleton Example with Singleton ....");
    console.log(`${logger.count} logging message`);
    console.log("\t" + logger.logs.map((l) => l.message).join("\n\t"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = () => {
  console.log("===Singleton===");
  start1();
  console.log("---------------");
  start2();
};
