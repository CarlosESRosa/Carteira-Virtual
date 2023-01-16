import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithRouter } from "./renderWithRouter";

describe("Login page tests", () => {
  it("Should have Login Form Title", () => {
    renderWithRouter(<App />);
    const mainTitle = screen.getByRole("heading", { level: 1, name: /Login/i });
    expect(mainTitle).toBeInTheDocument();
  });

  it("Should have Login Form username input", () => {
    renderWithRouter(<App />);
    const usernameLabel = screen.getByLabelText(/username/i);
    expect(usernameLabel).toBeInTheDocument();
  });

  it("Should have Login Form Password input", () => {
    renderWithRouter(<App />);
    const usernameLabel = screen.getByLabelText(/password/i);
    expect(usernameLabel).toBeInTheDocument();
  });

  it("Should submit success login", async () => {
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

  it("Should login fail with invalid user", async () => {
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
