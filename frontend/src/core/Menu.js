<<<<<<< HEAD
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
=======
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// 1. Prevent reloading page 2. props History
import { signout,  isAuthenticated } from "../auth";


const isActive = (history, path) => {
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
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/dashboard")} to="/dashboard">DashBoard</Link>
            </li>

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
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
        </ul>
    </div>

);

export default withRouter(Menu);
>>>>>>> upstream/dev-shaukat