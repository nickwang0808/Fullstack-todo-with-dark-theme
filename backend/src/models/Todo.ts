import { Column, Model, Table } from "sequelize-typescript";

@Table
class Todo extends Model {
  @Column
  name: string;
  @Column
  completed: boolean;
}

export default Todo;
