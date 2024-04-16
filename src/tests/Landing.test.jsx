import { render, screen } from "@testing-library/react";
// import Landing from "../pages/Landing";
import FirstTest from "./FirstTest";
import userEvent from "@testing-library/user-event";

describe("Home Page Component", () => {
  it("Should Render the Component", () => {
    render(<FirstTest />);
    // screen.debug();
    expect(screen.queryByText("First test")).toBeInTheDocument();
  });

  it("Should Click the button and get the meesage", async () => {
    render(<FirstTest />);
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);
    // const alertElement = screen.getByRole("paragraph");
    // expect(alertElement).toBeInTheDocument();
    const alertElement = screen.getByText(
      /The button click worked successfully/
    ); // Using regular expression for partial match
    expect(alertElement).toBeInTheDocument();
    // screen.debug();
    // test
  });
});
