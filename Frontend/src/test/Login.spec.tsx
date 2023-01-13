import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithRouter } from "./renderWithRouter";

describe("Login page tests", () => {
  it("Should have Login Form Title", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const mainTitle = screen.getByRole("heading", { level: 1 });
    expect(mainTitle).toBeInTheDocument();
  });

  it("Should have Login Form username input", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const usernameLabel = screen.getByLabelText(/username/i);
    expect(usernameLabel).toBeInTheDocument();
  });

  it("Should have Login Form Password input", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const usernameLabel = screen.getByLabelText(/password/i);
    expect(usernameLabel).toBeInTheDocument();
  });

  it("Should submit login", async () => {
    renderWithRouter(<App />);

    const usernameInput = screen.getByText(/Username/i);
    const passwordInput = screen.getByText(/password/i);

    userEvent.type(usernameInput, "Rosa");
    userEvent.type(passwordInput, "Rosapass1");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await userEvent.click(loginButton);

    const user = await screen.findByText(/Saldo/i);
    expect(user).toBeInTheDocument();
  });

  it("Should submit fail with invalid user", async () => {
    renderWithRouter(<App />);

    const usernameInput = screen.getByText(/Username/i);
    const passwordInput = screen.getByText(/password/i);

    userEvent.type(usernameInput, "InvalidUser");
    userEvent.type(passwordInput, "InvalidUserPass1");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await userEvent.click(loginButton);

    const user = screen.queryByText(/Saldo/i);
    expect(user).not.toBeInTheDocument();
  });

  it("Should redirect to register", async () => {
    renderWithRouter(<App />);

    const registerButton = screen.getByRole("button", { name: "Register" });
    await userEvent.click(registerButton);

    const createButton = await screen.findByText(/Create/i);
    expect(createButton).toBeInTheDocument();
  });
});
