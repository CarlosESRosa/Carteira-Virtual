import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import {
  requestGetTransactions,
  requestTransference,
} from "../../utils/FetchAPI";
import axios from "axios";
import formatDate from "../../utils/formatDate";
import Header from "../../components/Header";

const Home: React.FC = () => {
  const [userData, setUserData] = useState<any>({
    username: "",
    balance: 0,
    transactions: [],
  });
  const [copyUserData, setCopyUserData] = useState<any>({
    username: "",
    balance: 0,
    transactions: [],
  });
  const [balanceValue, setBalanceValue] = useState(0);
  const [filterBy, setFilterBy] = useState("Data");
  const [usernameToTransfer, setUsernameToTransfer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadDatas = async () => {
    const userLocalStorage = await JSON.parse(
      localStorage.getItem("user") || ""
    );
    setUserData(userLocalStorage);
    setCopyUserData(userLocalStorage);
    setIsLoading(false);
  };

  useEffect(() => {
    loadDatas();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    navigate("/");
  };

  function handleChangeBalance(
    event: React.FormEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) {
    setState(Number(event.currentTarget.value));
  }

  function handleChangeUsername(
    event: React.FormEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) {
    setState(event.currentTarget.value);
  }

  function handleChangeFilter(
    event: any,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) {
    setState(event.currentTarget.value);
  }

  async function handleClickTransfer() {
    try {
      const token = localStorage.getItem("token") || "";
      await requestTransference(balanceValue, usernameToTransfer, token);
      const userTransactions = await requestGetTransactions(token);

      const aux = {
        username: userData.username,
        balance: userData.balance - balanceValue,
        transactions: userTransactions,
      };
      setUserData(aux);
      setCopyUserData(aux);
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

  async function handleClickFilter() {
    if (filterBy === "Data") {
      const test = copyUserData.transactions.sort((a: any, b: any) => {
        if (Number(formatDate(a.createdAt)) > Number(formatDate(b.createdAt)))
          return -1;
        if (Number(formatDate(a.createdAt)) < Number(formatDate(b.createdAt)))
          return 1;
        return 0;
      });
      const aux = {
        username: userData.username,
        balance: userData.balance,
        transactions: test,
      };
      setCopyUserData(aux);
    }
    if (filterBy === "Valor") {
      const test = copyUserData.transactions.sort((a: any, b: any) => {
        if (Number(a.value) > Number(b.value)) return -1;
        if (Number(a.value) < Number(b.value)) return 1;
        return 0;
      });
      const aux = {
        username: userData.username,
        balance: userData.balance,
        transactions: test,
      };
      setCopyUserData(aux);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      <Header username={userData.username} logout={logout} />
      <div className="section1-container">
        <div className="row section1-row">
          <div className="col col-left">
            <div>
              <h1>{`Saldo: R$ ${userData.balance}`}</h1>
            </div>
            <div className="section1-transfer">
              <h3>Transferir</h3>
              <div>
                <div className="section1-transfer-row row">
                  <input
                    className="form-control"
                    type="number"
                    value={balanceValue}
                    onChange={(event) =>
                      handleChangeBalance(event, setBalanceValue)
                    }
                    placeholder="Value"
                  ></input>
                  <input
                    className="form-control"
                    type="text"
                    value={usernameToTransfer}
                    onChange={(event) =>
                      handleChangeUsername(event, setUsernameToTransfer)
                    }
                    placeholder="@Username"
                  ></input>
                </div>
                <div className="section1-transfer-button row">
                  <button
                    className="btn btn-dark"
                    onClick={handleClickTransfer}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <img
              src="https://ng.cash/_nuxt/img/home-ngcash-app.49e176e.png"
              alt="NG.CASH App"
            />
          </div>
        </div>
      </div>
      <div className="section2-container">
        <div className="transactions-table">
          <h1>Historico de Transações</h1>
          <form>
            <label>
              Filtrar por:
              <select
                id="exampleFormControlSelect1"
                onChange={(event) => handleChangeFilter(event, setFilterBy)}
              >
                <option>Data</option>
                <option>Valor</option>
              </select>
            </label>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClickFilter}
            >
              RUN
            </button>
          </form>
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">debitedAccountId</th>
                  <th scope="col">creditedAccountId</th>
                  <th scope="col">value</th>
                  <th scope="col">createdAt</th>
                </tr>
              </thead>
              {copyUserData.transactions.map((element: any) => (
                <tbody>
                  <tr>
                    <th scope="row">{element.id}</th>
                    <td>{element.debitedAccountId}</td>
                    <td>{element.creditedAccountId}</td>
                    <td>{element.value}</td>
                    <td>{element.createdAt}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="copyright">
        <h5>@ Carlos Eduardo Soares Rosa</h5>
      </div>
    </div>
  );
};

export default Home;
