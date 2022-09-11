import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "./Todo";

describe("Todo component", () => {
  it("should have not input as a item display and enabled checkbox", async () => {
    const mockComplete = jest.fn();
    const mockDelete = jest.fn();

    render(
      <TodoItem
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
      <TodoItem
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
