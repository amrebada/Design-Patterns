class Middleware {
  constructor(cb) {
    this.cb = cb;
  }
}

class Router {
  constructor(path, ...middlewares) {
    this.path = path;
    this.middlewares = middlewares;
    this.index = 0;
  }

  execute(data) {
    if (
      this.middlewares &&
      this.middlewares.length > 0 &&
      this.middlewares.length - 1 >= this.index
    ) {
      this.middlewares[this.index++].cb(data, this.execute.bind(this));
    }
  }
}

const start = () => {
  try {
    const getUsersFromDB = new Middleware((data, next) => {
      next(["user1", "user2", "user3"]);
    });
    const filterUsers = new Middleware((data, next) =>
      next(data.filter((user) => user !== "user2"))
    );
    const sendData = new Middleware((data, next) =>
      console.log(data.join(","))
    );
    new Router("/user", getUsersFromDB, filterUsers, sendData).execute();
  } catch (error) {
    console.log(error);
  }
};

module.exports = () => {
  console.log("===Chain of responsibilities===");
  start();
};
