import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BottomActionBar from "./BottomActionBar";

describe("BottomActionbar", () => {
  const mockCallbacks = {
    handleClickAll: jest.fn(),
    handleClickActive: jest.fn(),
    handleClickComplete: jest.fn(),
    handleClickClear: jest.fn(),
  };

  it("should change numebs of items left, and set approprociate filter color to blue", async () => {
    render(
      <BottomActionBar
        itemsCount={5}
        activeFilter={"active"}
        {...mockCallbacks}
      />
    );

    expect(screen.getByTestId("item-counter")).toHaveTextContent("5 item left");
    expect(screen.getByText("Active")).toHaveStyle("color: blue");
    expect(screen.getByText("All")).not.toHaveStyle("color: blue");
    expect(screen.getByText("Completed")).not.toHaveStyle("color: blue");
  });
  it("should fire appropriate call back when clicking on buttons", async () => {
    render(
      <BottomActionBar
        itemsCount={5}
        activeFilter={"active"}
        {...mockCallbacks}
      />
    );

    await userEvent.click(screen.getByText("All"));
    expect(mockCallbacks.handleClickAll.mock.calls.length).toBe(1);

    await userEvent.click(screen.getByText("Active"));
    expect(mockCallbacks.handleClickActive.mock.calls.length).toBe(1);

    await userEvent.click(screen.getByText("Completed"));
    expect(mockCallbacks.handleClickComplete.mock.calls.length).toBe(1);

    await userEvent.click(screen.getByText("Clear Completed"));
    expect(mockCallbacks.handleClickClear.mock.calls.length).toBe(1);
  });
});
