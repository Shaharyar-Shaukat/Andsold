import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
const actch = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={actch(history, "/")} to="/">
          Home
        </Link>
      </li>

      {!isAuthenticated() && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={actch(history, "/signin")}
            to="/signin"
          >
            Signin
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={actch(history, "/signup")}
            to="/signup"
          >
            Signup
          </Link>
        </li>
      )}

      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </span>
        </li>
      )}

      {!isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
                signout(() => {
                  history.push("/dashboard");
                })
              }
          >
            Dashboard
          </span>
        </li>
      )}


    </ul>
  </div>
);

export default withRouter(Menu);
