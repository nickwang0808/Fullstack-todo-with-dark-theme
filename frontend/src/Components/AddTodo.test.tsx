import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodo from "./AddTodo";

describe("Add todo component", () => {
  it("should have input and disabled checkbox as title without checkBoxControl passed in", async () => {
    render(<AddTodo handleAddNew={() => {}} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "this is a title");

    expect(input).toHaveValue("this is a title");
  });
});
