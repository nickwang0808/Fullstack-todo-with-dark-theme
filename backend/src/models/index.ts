import { Sequelize } from "sequelize";

// in a prod env we will use a env var
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/database.sqlite",
});

sequelize.sync();
