class Vehical {
  constructor(name = "unnammed vehical") {
    this._name = name;
    this._features = [];
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get features() {
    return this._features.join(",");
  }

  addFeature(feature) {
    this._features.push(feature);
  }

  clone() {
    let proto = Object.getPrototypeOf(this);
    let cloned = Object.create(proto);

    cloned._name = this._name;
    cloned._features = this._features;

    return cloned;
  }
}

const start = () => {
  // CarPrototype
  let CarPrototype = new Vehical("car");
  CarPrototype.addFeature("4 wheels");
  CarPrototype.addFeature("patrol fuel");
  CarPrototype.addFeature("4 seats");

  let toyota = CarPrototype.clone();
  toyota.name = "Toyota";
  console.log(
    `[+] new vehical added ${toyota.name} with features ${toyota.features}`
  );

  let lexas = CarPrototype.clone();
  lexas.name = "Lexas";
  console.log(
    `[+] new vehical added ${lexas.name} with features ${lexas.features}`
  );

  let toyota_bicycle = new Vehical("Toyota Bicycle");
  toyota_bicycle.addFeature("2 wheels");
  toyota_bicycle.addFeature("Manual driven");
  toyota_bicycle.addFeature("2 seats");

  console.log(
    `[+] new vehical added ${toyota_bicycle.name} with features ${toyota_bicycle.features}`
  );
};

module.exports = () => {
  console.log("===Prototype===");
  start();
};
