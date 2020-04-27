class CartItem {
  constructor(name, total) {
    this.name = name;
    this.total = total;
  }
  print() {
    console.log(`\t${this.name} => ${this.total}`);
  }
}

class CartGroup {
  constructor(name, cartItems = []) {
    this.name = name;
    this.cartItems = cartItems;
  }

  get total() {
    return this.cartItems.reduce(
      (total, nextItem) => total + nextItem.total,
      0
    );
  }

  print() {
    console.log(`Group ${this.name} total: ${this.total}`);
    this.cartItems.forEach((cartItem) => cartItem.print());
  }
}

const start = () => {
  try {
    const Milk = new CartItem("Milk", 12);
    const Egg = new CartItem("Egg", 24);
    const Pants = new CartItem("Pants", 62);
    const Glasses = new CartItem("glasses", 612);

    const FoodGroup = new CartGroup("Food", [Milk, Egg]);
    const ClothesGroup = new CartGroup("ClothesGroup", [Pants, Glasses]);

    const Chair = new CartItem("Chair", 99);

    const Cart = new CartGroup("Total Cart", [FoodGroup, ClothesGroup, Chair]);

    Cart.print();
  } catch (error) {
    console.log(error);
  }
};
module.exports = () => {
  console.log("===Composite===");
  start();
};
