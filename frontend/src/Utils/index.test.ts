import { filterBy } from ".";
import { dummyTodos } from "../Data/todos";

describe("utils", () => {
  it("should filter Todos properly", () => {
    expect(filterBy("all", dummyTodos)).toHaveLength(4);
    expect(filterBy("active", dummyTodos)).toHaveLength(3);
    expect(
      filterBy("active", dummyTodos).every((elem) => elem.completed === false)
    ).toBe(true);
    expect(
      filterBy("completed", dummyTodos).every(
        (elem) => elem.completed === false
      )
    ).toBe(false);
  });
});
