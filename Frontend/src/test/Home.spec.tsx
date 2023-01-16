import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithRouter } from "./renderWithRouter";

describe("Home page tests", () => {
  it("Should Home render elements", async () => {
    renderWithRouter(<App />);

    const usernameInput = screen.getByText(/Username/i);
    const passwordInput = screen.getByText(/password/i);

    userEvent.type(usernameInput, "Rosa");
    userEvent.type(passwordInput, "Rosapass1");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await userEvent.click(loginButton);

    const user = await screen.findAllByText(/Rosa/i);
    const tabela = await screen.findByText(/Historico de Transações/i);
    const saldo = await screen.findByText(/Saldo:/i);
    const transferir = await screen.findByText(/Transferir/i);

    expect(user[0]).toBeInTheDocument();
    expect(tabela).toBeInTheDocument();
    expect(saldo).toBeInTheDocument();
    expect(transferir).toBeInTheDocument();
  });

  it("Should Home make transferencia", async () => {
    renderWithRouter(<App />);

    const usernameInput = screen.getByText(/Username/i);
    const passwordInput = screen.getByText(/password/i);

    userEvent.type(usernameInput, "Rosa");
    userEvent.type(passwordInput, "Rosapass1");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await userEvent.click(loginButton);

    const valueInput = await screen.findByPlaceholderText("Value");
    const userInput = await screen.findByPlaceholderText("@Username");
    userEvent.type(valueInput, "10");
    userEvent.type(userInput, "Carlos");

    const enviarButton = await screen.findByRole("button", { name: "Enviar" });
    await userEvent.click(enviarButton);

    const elementTable = await screen.findAllByRole("row");

    expect(elementTable[0]).toBeInTheDocument();
  });
});
