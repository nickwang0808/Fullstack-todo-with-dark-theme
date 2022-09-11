export interface Todo {
  id?: number;
  name: string;
  completed?: boolean;
  order?: number;
}

export interface PatchArg extends Omit<Required<Todo>, "name" | "order"> {
  order?: number;
}
