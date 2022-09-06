import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

describe("Add todo component", () => {
  it("should have input and disabled checkbox as title without checkBoxControl passed in", async () => {
    render(<AddTodo />);

    expect(screen.getByRole("checkbox")).not.toBeChecked();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "this is a title");

    expect(input).toHaveValue("this is a title");
  });
});

describe("Todo component", () => {
  it("should have not input as a item display and enabled checkbox", async () => {
    const mockComplete = jest.fn();
    const mockDelete = jest.fn();

    render(
      <Todo
        value="todo 1"
        completed={false}
        handleComplete={mockComplete}
        handleDelete={mockDelete}
      />
    );

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByTestId("todo-item")).toHaveTextContent("todo 1");

    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByTestId("icon-cross"));

    expect(mockComplete.mock.calls).toHaveLength(1);
    expect(mockDelete.mock.calls).toHaveLength(1);
  });
  it("should have strike through when is completed", async () => {
    const mockComplete = jest.fn();
    const mockDelete = jest.fn();

    render(
      <Todo
        value="todo 1"
        completed={true}
        handleComplete={mockComplete}
        handleDelete={mockDelete}
      />
    );

    expect(screen.getByTestId("todo-item")).toHaveStyle(
      "text-decoration: line-through"
    );
  });
});
