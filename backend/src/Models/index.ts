import { Sequelize } from "sequelize";

// Option 1: Passing a connection URI
export const sequelize = new Sequelize("sqlite::memory:"); // Example for sqlite

sequelize.sync();

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "path/to/database.sqlite",
// });

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize("database", "username", "password", {
//   host: "localhost",
//   dialect: "sqlite",
// });
