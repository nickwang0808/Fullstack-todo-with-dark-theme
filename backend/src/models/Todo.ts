import { AllowNull, Column, Default, Model, Table } from "sequelize-typescript";

@Table
class Todo extends Model {
  @AllowNull(false)
  @Column
  name: string;

  @Default(false)
  @Column
  completed: boolean;

  @Column
  order: number;
}

export default Todo;
