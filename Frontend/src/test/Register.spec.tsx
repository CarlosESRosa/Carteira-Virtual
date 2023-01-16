import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithRouter } from "./renderWithRouter";

describe("Register page tests", () => {
  it("Should Register render elements", () => {
    renderWithRouter(<App />, { route: "/register" });

    const mainTitle = screen.getByText(/Register/i);
    const usernameInput = screen.getByText(/Username/i);
    const passwordInput = screen.getByText(/Password/i);
    const createButton = screen.getByRole("button", { name: /Create/i });

    expect(mainTitle).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  it("Should register a user", async () => {
    /* 
    renderWithRouter(<App />, { route: "/register" });
    
    const usernameInput = screen.getByText(/Username/i);
    const passwordInput = screen.getByText(/Password/i);
    
    userEvent.type(usernameInput, "NewUser");
    userEvent.type(passwordInput, "NewUserPass1");
    
    const createButton = screen.getByRole("button", { name: /Create/i });
    
    await userEvent.click(createButton);
    
    const initialBalance = await screen.findByText(/Saldo: R$ 100/i);
    
    expect(initialBalance).toBeInTheDocument();
    */
  });

  it("Should not register a user with invalid inputs", async () => {
    renderWithRouter(<App />, { route: "/register" });

    const usernameInput = screen.getByText(/Username/i);
    const passwordInput = screen.getByText(/Password/i);

    userEvent.type(usernameInput, "Invalid");
    userEvent.type(passwordInput, "InvalidPass");

    const createButton = screen.getByRole("button", { name: /Create/i });

    await userEvent.click(createButton);

    const initialBalance = screen.queryByText(/Saldo: R$ 100/i);

    expect(initialBalance).not.toBeInTheDocument();
  });
});
