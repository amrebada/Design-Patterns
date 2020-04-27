# Design Patterns

It is a common solutions for common problems, that already tested and enhanced for better solutions

## Creational Patterns

these patterns descripe a best practice of creating new objects
### Singleton
create a one instance through all app .

restricts the nstantiation of a class to one "single" instance. This is useful when exactly one object is needed to coordinate actions across the system.

```javascript
class myClass {
...
}

class Singleton {
	constructor(...args){
		if(!Singleton.instance){
			Singleton.instance = new myClass(...args);
		}
	}
	getInstance(){
		return Singleton.instance;
	}
}

export default Singleton;
// or by exporting only one instance as a default (recommended)
export default new myClass();
```
### Prototypes
create a clone of object with a common variables and operations to reducing the redundancy.

```javascript
class myClass {
	...
	clone() {
		let proto =  Object.getPrototypeOf(this);
		let cloned =  Object.create(proto);
		//assign the variables of cloned with the prototyped
		return cloned;
	}
}


// prototyping common variables
// CarPrototype

let myClassPrototype =  new myClass();
//assigning variables
//myClassPrototype.blaa = blaa

//use the prototype
let clonedObject = myClassPrototype.clone();

```

### Factory
creates a classes with the same type but with different methods and variable like user factory and ( employee, shopper).

```javascript
class  Class1 {
...
}

class  Class2 {
...
}

const classTypes = {
	class1: "CLASS 1",
	class2: "CLASS 2"
}

const  classFactory  = (...args, type) => {
	switch(type){
		case classType.class1:
			return new Class1(...args);
		case classType.class2:
			return new Class2(...args);
		default:
			break;
	}
};


let class1Obj =  classFactory(... args, classTypes.class1);
let class2Obj =  classFactory(... args, classTypes.class2);

```

### Builder 
creates an instance from a class when there is too many parameters to pass with add methods that build a custom instance object

```javascript
//real example
const  Contants  = {
	MAX_LIMITS:  100000,
};

class  Query {
	constructor(builder) {
		this.table  = builder.table;
		this.columns  = builder.columns  || [];
		this.limit  = builder.limit  || Contants.MAX_LIMITS;
		this.offset  = builder.offset  ||  0;
		this.id  = builder.id;
	}

	toString() {
		return  `SELECT ${this.columns.join(",")} FROM ${this.table}${
		this.id  ?  " Where id="  +  this.id  :  ""
		} LIMIT ${this.limit} OFFSET ${this.offset}`;
	}
}

  

class  QueryBuilder {
	constructor(table) {
		this.table  = table;
	}

	withColumns(arr = []) {
		this.columns  = arr;
		return  this;
	}

	withLimit(limit = Contants.MAX_LIMITS) {
		this.limit  = limit;
		return  this;
	}

	withOffset(offset =  0) {
		this.offset  = offset;
		return  this;
	}  

	withId(id =  null) {
		this.id  = id;
		return  this;
	}

	build() {
		return  new  Query(this);
	}
}

  
let getUserByID =  new  QueryBuilder("User")
	.withColumns(["name", "password"])
	.withId(1)
	.build();

let getAllProducts =  new  QueryBuilder("Products")
	.withColumns(["name", "type", "price"])
	.withLimit(100)
	.build();

console.log(getUserByID.toString());
console.log(getAllProducts.toString());
```

## Structural Patterns

define how each component or entity should be structured so as to have very flexible interconnecting modules which can work together in a larger system.

### Adapter
is  a way to create an interface to reuse it with different implementation **kind of dependency injection**
```javascript
class  printer1 {
	print(message) {
		console.log("printer 1 ", message);
	}
}

class  printer2 {
	print(message) {
		console.log("printer 2 ", message);
	}
}

class  Printer {
	constructor(printer) {
		this.printer  =  new  printer();
	}
	
	print(message) {
		this.printer.print(message);
	}
}

console.log("inject printer 1");
const  PrinterOne  =  new  Printer(printer1);
PrinterOne.print("Message from printer 1");
console.log("inject printer 2");
const  PrinterTwo  =  new  Printer(printer2);
PrinterTwo.print("Message from printer 2");

```

### Proxy
is an object to prevent any call of another expensive object (memory and time)

```javascript
class  HeavyClass {
	constructor(message) 
		setTimeout(() => {
			console.log(message);
		}, 3000);
	}
}

const  heavyClassProxy  = (message) => {
	if (message) {
		return  new  HeavyClass(message);
	}
	throw  new  Error("Cannot start Heavy class without message");
};

console.log("starting heavy class without proxy");
new  HeavyClass("Expensive Task for time");
console.log("starting heavy class with proxy");
try {
	heavyClassProxy();
} catch (error) {
	console.log(error);
}
```


### Composite

describes a group of objects that are treated the same way as a single instance of the same type of object. it tree should composed it self also

```javascript
class  CartItem {
	constructor(name, total) {
		this.name  = name;
		this.total  = total;
	}
	print() {
		console.log(`\t${this.name} => ${this.total}`);
	}
}

class  CartGroup {
	constructor(name, cartItems = []) {
		this.name  = name;
		this.cartItems  = cartItems;
	}

	get  total() {
		return  this.cartItems.reduce((total, nextItem) => total + nextItem.total,0);
	}
	print() {
		console.log(`Group ${this.name} total: ${this.total}`);
		this.cartItems.forEach((cartItem) => cartItem.print());
	}
}

const  Milk  =  new  CartItem("Milk", 12);
const  Egg  =  new  CartItem("Egg", 24);
const  Pants  =  new  CartItem("Pants", 62);
const  Glasses  =  new  CartItem("glasses", 612);
const  FoodGroup  =  new  CartGroup("Food", [Milk, Egg]);
const  ClothesGroup  =  new  CartGroup("ClothesGroup", [Pants, Glasses]);
const  Chair  =  new  CartItem("Chair", 99);
const  Cart  =  new  CartGroup("Total Cart", [FoodGroup, ClothesGroup, Chair]);
Cart.print();
```

### Decorator

allows a user to add new functionality to an existing object without altering its structure.

```javascript
class  Item {
	constructor(name, price) {
		this.name  = name;
		this.price  = price;
	}
}  

class  GoldenItem {
	constructor(baseItem, carat =  24) {
		this.name  =  `Golden ${baseItem.name}`;
		this.price  =  1000  + baseItem.price;
		this.carat  =  this.carat;
	}
}

class  DiamondItem {
	constructor(baseItem) {
		this.name  =  `Diamond ${baseItem.name}`;
		this.price  =  1500  + baseItem.price;
		this.isCutGlass  =  true;
	}
}

//decorator exports {Item, GoldenItem, DiamondItem}

class  Shopper {
	constructor(name, account =  0) {
		this.name  = name;
		this.account  = account;
		this.items  = [];
	}

	purchaseItem(item) {
		if (this.account  > item.price) {
			this.items.push(item);
			this.account  -= item.price;
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

const  iphone  =  new  Item("Iphone", 100);
const  cups  =  new  Item("cups", 1);
const  Amr  =  new  Shopper("Amr", 1500);

const  goldenIphone  =  new  GoldenItem(iphone);
const  dimanondGoldenIphone  =  new  DiamondItem(goldenIphone);
const  diamondCups  =  new  DiamondItem(cups);  

Amr.purchaseItem(goldenIphone);
Amr.purchaseItem(cups);
Amr.purchaseItem(diamondCups);
Amr.purchaseItem(dimanondGoldenIphone);
Amr.print();

```

## Behavioural Patterns

concerned with the assignment of responsibilities between objects, or, encapsulating **behavior** in an object and delegating requests to it

### Chain of responsibilities

consisting of a source of command objects and a series of processing objects. like (middlewares in express js)

```javascript

class  Middleware {
	constructor(cb) {
		this.cb  = cb;
	}
}

class  Router {
	constructor(path, ...middlewares) {
		this.path  = path;
		this.middlewares  = middlewares;
		this.index  =  0;
	}

	execute(data) {
		if (
			this.middlewares  &&
			this.middlewares.length  >  0  &&
			this.middlewares.length  -  1  >=  this.index
		) {
			this.middlewares[this.index++].cb(data, this.execute.bind(this));
		}
	}
}

const  getUsersFromDB  =  new  Middleware((data, next) =>next(["user1", "user2", "user3"]));
const  filterUsers  =  new  Middleware((data, next) =>next(data.filter((user) => user !==  "user2")));
const  sendData  =  new  Middleware((data, next) =>console.log(data.join(",")));

new  Router("/user",getUsersFromDB,filterUsers,sendData).execute();

```
### Command

in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time. This information includes the method name, the object that owns the method and values for the method parameters.
```javascript
const { writeFile, unlink } =  require("fs");
const  path  =  require("path");
const { createInterface } =  require("readline");

class  Conductor {
	constructor() {
		this.history  = [];
		this.undoCommands  = [];
	}
	
	run(command) {
		console.log(`run command ${command.name}`);
		command.execute();
		this.history.push(command);
	}
	
	undo() {
		const  command  =  this.history.pop();
		console.log(`undoing command ${command.name}`);
		command.undo();
		this.undoCommands.push(command);
	}

	redo() {
		const  command  =  this.undoCommands.pop();
		console.log(`redoing command ${command.name}`);
		command.execute();
		this.history.push(command);
	}
} 

class  InstallPackage {

	constructor(packageName) {
		this.packageName  = packageName;
	}

	get  name() {
		return  `Installing package ${this.packageName}`;
	}

	execute() {
		console.log(`TODO: installing ${this.packageName} ...`);
	}

	undo() {
		console.log(`TODO: removing ${this.packageName} ...`);
	}
}

  

class  createJSONFile {
	constructor(filename, obj) {
		this.filename  = filename;
		this.obj  = obj;
	}

	get  name() {
		return  `creating package json ${this.filename}.json ...`;
	}

	execute() {
		writeFile(
			path.join(__dirname, this.filename),
			JSON.stringify(this.obj),
			() => {}
		);
	}

	undo() {
		unlink(path.join(__dirname, this.filename), () => {});
	}
}

  

class  ExitCommand {
	get  name() {
		return  `exiting ...`;
	}

	execute() {
		process.exit(0);
	}
}

  



const  rl  =  createInterface({
		input:  process.stdin,
		output:  process.stdout,
	});
const  conductor  =  new  Conductor();
const  Info  =  `Usage:
- install <package name>
- create <JSON package name>
- undo
- redo
- exit
`;

console.log(Info);
rl.prompt();

rl.on("line", (input) => {
	const [commandText, ...args] = input.split(" ");
	const [packageName] = args;
	switch (commandText) {
		case  "install":
			conductor.run(new  InstallPackage(packageName));
			break;
		case  "create":
			conductor.run(new  createJSONFile(packageName, { name: packageName }));
			break;
		case  "undo":
			conductor.undo();
			break;
		case  "redo":
			conductor.redo();
			break;
		case  "exit":
			conductor.run(new  ExitCommand());
			break;
		default:
			console.log(Info);
			break;
	}
	rl.prompt();
});

```

### Iterator

used to traverse a container and access the container's elements. The _iterator pattern_ decouples algorithms from containers;

```javascript
class  Iterator {
	constructor(elements = []) {
		this.index  =  0;
		this.elements  = elements;
	}

	next() {
		console.log("next");		  
		if (this.hasNext) {
			this.index  +=  1;
			return  this.elements[this.index];
		}
		return  null;
	}

	prev() {
		console.log("prev");
		if (this.index  >  0) {
			this.index  -=  1;
		}
		return  this.elements[this.index];
	}

	last() {
		console.log("last");
		const [last, ..._] = [...this.elements].reverse();
		return last;
	}

	first() {
		console.log("first");
		const [first, ..._] =  this.elements;
		return first;
	}

	current() {
		console.log("current");
		return  this.elements[this.index];
	}

	hasNext() {
		return  this.index  +  1  <  this.elements.length;
	}
}

  

class  Item {
	constructor(name, price) {
		this.name  = name;
		this.price  = price;
	}

	writeLn() {
		process.stdout.write(`${this.name} - ${this.price}\n`);
	}
}

const  Items  =  new  Iterator([
	new  Item("item 1", 100),
	new  Item("item 2", 200),
	new  Item("item 3", 300),
	new  Item("item 4", 400),
	new  Item("item 5", 500),
	new  Item("item 6", 600),
	new  Item("item 7", 700),
	new  Item("item 8", 800),
	new  Item("item 9", 900),
	new  Item("item 10", 1000),
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

```

### Observer

n which an object, called the subject, maintains a list of its dependents, called _observers_, and notifies them automatically of any state changes,

```javascript
class  Group {
	constructor(name) {
		this.name  = name;
		this.accounts  = [];
		this.messages  = [];
	}
	  
	send(account, message) {
		if (this.accounts.includes(account)) {
			this.accounts
				.filter((a) => a.name  !== account.name)
				.forEach((a) => a.notify(account, message));
			this.messages.push({ account, message });
		}
	}

	subscribe(account) {
		this.accounts.push(account);
	}

	print() {
		console.log(`Group ${this.name}`);
		this.messages.forEach((m) =>
			console.log(`${m.account.name}: ${m.message}`)
		);
	}
}

class  Account {
	constructor(name) {
		this.name  = name;
	}

	notify(account, message) {
		console.log(`|${this.name}| ${account.name}: ${message}`);
	}

	toString() {
		return  `Account ${this.name}`;
	}
}

const  Amr  =  new  Account("Amr");
const  Mohamed  =  new  Account("Mohamed");
const  Osama  =  new  Account("Osama");
const  Yasin  =  new  Account("Yasin");
const  team1  =  new  Group("Team 1");
const  team2  =  new  Group("Team 2");

team1.subscribe(Amr);
team1.subscribe(Mohamed);
team1.subscribe(Yasin);
team2.subscribe(Amr);
team2.subscribe(Osama);

team1.send(Amr, "Hi");
team1.send(Yasin, "Hi Amr");
team1.send(Mohamed, "How are you All");
team2.send(Amr, "Hi");
team2.send(Osama, "Hi Amr");

```

### Strategy

encapsulates a "family" of algorithms and selects one from the pool for use during runtime.

```javascript
const { appendFile } =  require("fs");
const  path  =  require("path");

class  LogStrategy {
	static  toFile(message, timestamp) {
		appendFile(
			path.join(__dirname, "logger.log"),
			`${timestamp} - ${message}\n`,
			() => {}
		);
	}
	  
	static  toConsole(message, timestamp) {
		console.log(`${timestamp} - ${message}`);
	}

	static  noDate(message, timestamp) {
		console.log(message);
	}

	static  none(message, timestamp) {}
}

class  Logger {
	constructor(startegy = LogStrategy.toConsole) {
		this.logs  = [];
		this.startegy  = startegy;
	}

	changeStrategy(startegy) {
		this.startegy  = LogStrategy[startegy];
	}

	log(message) {
		this.startegy(message, new  Date().toISOString());
	}
}

const  logger  =  new  Logger();
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
```
