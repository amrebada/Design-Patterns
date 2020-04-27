const Contants = {
  MAX_LIMITS: 100000,
};

class Query {
  constructor(builder) {
    this.table = builder.table;
    this.columns = builder.columns || [];
    this.limit = builder.limit || Contants.MAX_LIMITS;
    this.offset = builder.offset || 0;
    this.id = builder.id;
  }

  toString() {
    return `SELECT ${this.columns.join(",")} FROM ${this.table}${
      this.id ? " Where id=" + this.id : ""
    } LIMIT ${this.limit} OFFSET ${this.offset}`;
  }
}

class QueryBuilder {
  constructor(table) {
    this.table = table;
  }

  withColumns(arr = []) {
    this.columns = arr;
    return this;
  }

  withLimit(limit = Contants.MAX_LIMITS) {
    this.limit = limit;
    return this;
  }

  withOffset(offset = 0) {
    this.offset = offset;
    return this;
  }

  withId(id = null) {
    this.id = id;
    return this;
  }

  build() {
    return new Query(this);
  }
}

const start = () => {
  let getUserByID = new QueryBuilder("User")
    .withColumns(["name", "password"])
    .withId(1)
    .build();
  let getAllProducts = new QueryBuilder("Products")
    .withColumns(["name", "type", "price"])
    .withLimit(100)
    .build();
  console.log(getUserByID.toString());
  console.log(getAllProducts.toString());
};

module.exports = () => {
  console.log("===Builder===");
  start();
};
