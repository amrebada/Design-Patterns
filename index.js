const cliSelect = require("cli-select");

const start = async () => {
  try {
    const type = await cliSelect({
      values: ["Creational", "Structural", "Behavioural"],
      selected: "📂 >",
      unselected: "📁",
    });
    switch (type.id) {
      case 0:
        const CreationalExample = await cliSelect({
          values: ["Singleton", "Prototype", "Factory", "Builder"],
          selected: "📂 >",
          unselected: "📁",
        });
        switch (CreationalExample.id) {
          case 0:
            require("./creational/singleton")();
            break;
          case 1:
            require("./creational/prototype")();
            break;
          case 2:
            require("./creational/factory")();
            break;
          case 3:
            require("./creational/builder")();
            break;
          default:
            break;
        }
        break;
      case 1:
        const StructuralExample = await cliSelect({
          values: ["Adapter", "Proxy", "Composite", "Decorator"],
          selected: "📂 >",
          unselected: "📁",
        });
        switch (StructuralExample.id) {
          case 0:
            require("./structural/adapter")();
            break;
          case 1:
            require("./structural/proxy")();
            break;
          case 2:
            require("./structural/composite")();
            break;
          case 3:
            require("./structural/decorator")();
            break;
          default:
            break;
        }
        break;

      case 2:
        const BehaviouralExample = await cliSelect({
          values: [
            "Chain of responsibilities",
            "Command",
            "Iterator",
            "Observer",
            "Strategy",
          ],
          selected: "📂 >",
          unselected: "📁",
        });
        switch (BehaviouralExample.id) {
          case 0:
            require("./behavioural/chain-of-responsibilities")();
            break;
          case 1:
            require("./behavioural/command")();
            break;
          case 2:
            require("./behavioural/iterator")();
            break;
          case 3:
            require("./behavioural/observer")();
            break;
          case 4:
            require("./behavioural/strategy")();
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }
  } catch (error) {}
};
start();
