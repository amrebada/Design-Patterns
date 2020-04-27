class Shopper {
  constructor(name, money) {
    this.name = name;
    this.money = money;
  }

  toString() {
    return `Shopper ${this.name} - ${this.money}`;
  }
}

class Employee {
  constructor(name, money, level) {
    this.name = name;
    this.money = money;
    this.level = level;
  }

  toString() {
    return `Shopper ${this.name} with ${this.level} degree - ${this.money}`;
  }
}

const userFactory = (name, money = 0, type = "employee", level = "first") => {
  if (type === "employee") {
    return new Employee(name, money, level);
  }
  return new Shopper(name, money);
};

const start = () => {
  let shopper1 = userFactory("shopper 1", 100, "shopper");
  let shopper2 = userFactory("shopper 2", 150, "shopper");
  let employee1 = userFactory("employee 1", 100, "employee", "second");
  console.log(shopper1.toString());
  console.log(shopper2.toString());
  console.log(employee1.toString());
};

module.exports = () => {
  console.log("===Factory===");
  start();
};
