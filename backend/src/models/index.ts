import { Sequelize } from "sequelize";

// in a prod env we will use a env var

export let sequelize = new Sequelize("sqlite::memory:");
if (process.env.NODE_ENV !== "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "data/database.sqlite",
  });
}

sequelize.sync();
