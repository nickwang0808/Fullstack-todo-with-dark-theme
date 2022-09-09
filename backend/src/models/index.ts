import { Sequelize } from "sequelize-typescript";
import _config from "../config/config";
import Todo from "./Todo";
const env = process.env.NODE_ENV || "development";

// @ts-ignore
const config = _config[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

sequelize.addModels([Todo]);

sequelize.sync();

export { sequelize, Todo };
