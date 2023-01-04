import React, { useState } from "react";
import {
  requestBalance,
  requestGetTransactions,
  requestLogin,
} from "../../utils/FetchAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [stateUsername, setStateUsername] = useState("");
  const [statePassword, setStatePassword] = useState("");
  const navigate = useNavigate();

  function handleChange(
    event: React.FormEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) {
    setState(event.currentTarget.value);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      const token = await requestLogin(stateUsername, statePassword);
      const resultUser = await requestBalance(token);
      const userTransactions = await requestGetTransactions(token);

      const result = {
        username: resultUser.username,
        balance: resultUser.balance,
        transactions: userTransactions,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        // 👇️ error: AxiosError<any, any>
        alert(error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>LOGIN</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              value={stateUsername}
              onChange={(event) => handleChange(event, setStateUsername)}
              className="form-control"
              id="username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={statePassword}
              onChange={(event) => handleChange(event, setStatePassword)}
              className="form-control"
              id="password"
            />
          </div>
          <div className="login-buttons">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-dark"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
