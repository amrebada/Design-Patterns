const { writeFile, unlink } = require("fs");
const path = require("path");
const { createInterface } = require("readline");

class Conductor {
  constructor() {
    this.history = [];
    this.undoCommands = [];
  }

  run(command) {
    console.log(`run command ${command.name}`);
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    console.log(`undoing command ${command.name}`);
    command.undo();
    this.undoCommands.push(command);
  }

  redo() {
    const command = this.undoCommands.pop();
    console.log(`redoing command ${command.name}`);
    command.execute();
    this.history.push(command);
  }
}

class InstallPackage {
  constructor(packageName) {
    this.packageName = packageName;
  }

  get name() {
    return `Installing package ${this.packageName} ...`;
  }

  execute() {
    console.log(`TODO: installing ${this.packageName} ...`);
  }

  undo() {
    console.log(`TODO: removing ${this.packageName} ...`);
  }
}

class createJSONFile {
  constructor(filename, obj) {
    this.filename = filename;
    this.obj = obj;
  }

  get name() {
    return `creating package json ${this.filename}.json ...`;
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

class ExitCommand {
  get name() {
    return `exiting ...`;
  }

  execute() {
    process.exit(0);
  }
}

const start = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const conductor = new Conductor();
  const Info = `Usage:
  -  install <package name>
  -  create <JSON package name>
  -  undo
  -  redo
  -  exit
  `;
  console.log(Info);
  rl.prompt();

  rl.on("line", (input) => {
    const [commandText, ...args] = input.split(" ");
    const [packageName] = args;
    switch (commandText) {
      case "install":
        conductor.run(new InstallPackage(packageName));
        break;
      case "create":
        conductor.run(new createJSONFile(packageName, { name: packageName }));
        break;
      case "undo":
        conductor.undo();
        break;
      case "redo":
        conductor.redo();
        break;
      case "exit":
        conductor.run(new ExitCommand());
        break;
      default:
        console.log(Info);
        break;
    }
    rl.prompt();
  });
};

module.exports = () => {
  console.log("===Command===");
  start();
};
