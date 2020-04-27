class printer1 {
  print(message) {
    console.log("printer 1 ", message);
  }
}

class printer2 {
  print(message) {
    console.log("printer 2 ", message);
  }
}

class Printer {
  constructor(printer) {
    this.printer = new printer();
  }

  print(message) {
    this.printer.print(message);
  }
}

const start = () => {
  console.log("inject printer 1");
  const PrinterOne = new Printer(printer1);
  PrinterOne.print("Message from printer 1");
  console.log("inject printer 2");
  const PrinterTwo = new Printer(printer2);
  PrinterTwo.print("Message from printer 2");
};
module.exports = () => {
  console.log("===Adapter===");
  start();
};
