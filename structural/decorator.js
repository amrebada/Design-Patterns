class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class GoldenItem {
  constructor(baseItem, carat = 24) {
    this.name = `Golden ${baseItem.name}`;
    this.price = 1000 + baseItem.price;
    this.carat = this.carat;
  }
}

class DiamondItem {
  constructor(baseItem) {
    this.name = `Diamond ${baseItem.name}`;
    this.price = 1500 + baseItem.price;
    this.isCutGlass = true;
  }
}

//decorator exports {Item, GoldenItem, DiamondItem}

class Shopper {
  constructor(name, account = 0) {
    this.name = name;
    this.account = account;
    this.items = [];
  }

  purchaseItem(item) {
    if (this.account > item.price) {
      this.items.push(item);
      this.account -= item.price;
    } else {
      console.log(`${this.name} cannot afford ${item.name}`);
    }
  }

  print() {
    console.log(`${this.name} has purchased ${this.items.length} items:`);
    this.items.forEach((item) =>
      console.log(`\t* ${item.name} - ${item.price}`)
    );
    console.log(`${this.name}'s account has $${this.account} remaining`);
  }
}

const start = () => {
  const iphone = new Item("Iphone", 100);
  const cups = new Item("cups", 1);
  const Amr = new Shopper("Amr", 1500);

  const goldenIphone = new GoldenItem(iphone);
  const dimanondGoldenIphone = new DiamondItem(goldenIphone);
  const diamondCups = new DiamondItem(cups);

  Amr.purchaseItem(goldenIphone);
  Amr.purchaseItem(cups);
  Amr.purchaseItem(diamondCups);
  Amr.purchaseItem(dimanondGoldenIphone);
  Amr.print();
};

module.exports = () => {
  console.log("===Decorator===");
  start();
};
