class HeavyClass {
  constructor(message) {
    setTimeout(() => {
      console.log(message);
    }, 3000);
  }
}

const heavyClassProxy = (message) => {
  if (message) {
    return new HeavyClass(message);
  }
  throw new Error("Cannot start Heavy class without message");
};

const start = () => {
  console.log("starting heavy class without proxy");
  new HeavyClass("Expensive Task for time");
  console.log("starting heavy class with proxy");
  try {
    heavyClassProxy();
  } catch (error) {
    console.log(error);
  }
};
module.exports = () => {
  console.log("===Proxy===");
  start();
};
