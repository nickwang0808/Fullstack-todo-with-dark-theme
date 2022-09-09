const config = {
  development: {
    dialect: "sqlite",
    storage: "data/database.sqlite",
  },
  test: {
    dialect: "sqlite",
    storage: ":memory",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default config;