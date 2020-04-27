class Group {
  constructor(name) {
    this.name = name;
    this.accounts = [];
    this.messages = [];
  }

  send(account, message) {
    if (this.accounts.includes(account)) {
      this.accounts
        .filter((a) => a.name !== account.name)
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

class Account {
  constructor(name) {
    this.name = name;
  }

  notify(account, message) {
    console.log(`|${this.name}| ${account.name}: ${message}`);
  }

  toString() {
    return `Account ${this.name}`;
  }
}

const start = () => {
  const Amr = new Account("Amr");
  const Mohamed = new Account("Mohamed");
  const Osama = new Account("Osama");
  const Yasin = new Account("Yasin");

  const team1 = new Group("Team 1");
  const team2 = new Group("Team 2");

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
};

module.exports = () => {
  console.log("===Observer===");
  start();
};
