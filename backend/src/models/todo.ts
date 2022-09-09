import { DataTypes, Model, UUIDV4 } from "sequelize";

import { sequelize } from ".";

class Todo extends Model {
  declare id: string;
  declare name: string;
  declare completed: boolean;
}

Todo.init(
  {
    id: {
      type: UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize }
);

export default Todo;
