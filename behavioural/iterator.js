class Iterator {
  constructor(elements = []) {
    this.index = 0;
    this.elements = elements;
  }
  next() {
    console.log("next");

    if (this.hasNext) {
      this.index += 1;
      return this.elements[this.index];
    }
    return null;
  }

  prev() {
    console.log("prev");
    if (this.index > 0) {
      this.index -= 1;
    }
    return this.elements[this.index];
  }

  last() {
    console.log("last");
    const [last, ..._] = [...this.elements].reverse();
    return last;
  }

  first() {
    console.log("first");
    const [first, ..._] = this.elements;
    return first;
  }

  current() {
    console.log("current");
    return this.elements[this.index];
  }

  hasNext() {
    return this.index + 1 < this.elements.length;
  }
}

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  writeLn() {
    process.stdout.write(`${this.name} - ${this.price}\n`);
  }
}

const start = () => {
  const Items = new Iterator([
    new Item("item 1", 100),
    new Item("item 2", 200),
    new Item("item 3", 300),
    new Item("item 4", 400),
    new Item("item 5", 500),
    new Item("item 6", 600),
    new Item("item 7", 700),
    new Item("item 8", 800),
    new Item("item 9", 900),
    new Item("item 10", 1000),
  ]);

  Items.next().writeLn();
  Items.first().writeLn();
  Items.next().writeLn();
  Items.next().writeLn();
  Items.next().writeLn();
  Items.prev().writeLn();
  Items.prev().writeLn();
  Items.current().writeLn();
  Items.last().writeLn();
  Items.prev().writeLn();
  Items.next().writeLn();
  Items.next().writeLn();
};

module.exports = () => {
  console.log("===Iterator===");
  start();
};
