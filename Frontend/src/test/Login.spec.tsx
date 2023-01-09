import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";

describe("Login page tests", () => {
  it("Should have Login Form Title", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const mainTitle = screen.getByRole("heading", { level: 1 });
    expect(mainTitle).toBeInTheDocument();
  });
});
