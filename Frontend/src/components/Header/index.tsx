import React from "react";

export default function Header(props: { username: string; logout: any }) {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-md ">
        <div className="container-fluid">
          <a className="navbar-brand ms-2" href="#">
            <img
              src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg"
              alt="NG.cash logo"
            ></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link mx-1 fs-4" href="home">
                  {props.username}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-1 fs-4" href="#">
                  Transações
                </a>
              </li>
              <li>
                <a
                  className="nav-link mx-1 fs-4"
                  href="/"
                  onClick={props.logout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
