
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Spinner,
} from "reactstrap";
import { authFailure, authStart, authSucess } from "../Redux/Slice/AuthSclice";
import { axiosApi } from "../Services/AxiosInstance";
import { claerToken, saveToken } from "../utils/helper";
import "./login.css";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const { loading, error } = useSelector((state) => state.Auth);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const handelSubmite = (e) => {
    e.preventDefault();
    const { username, password } = state;

    dispatch(async (dispatchInner) => {
      dispatchInner(authStart());

      try {
        const users = await axiosApi.get("/users");

        const validUser = users.find(
          (u) => u.username === username && u.password === password
        );

        if (!validUser) {
          throw new Error("Invalid username or password");
        }

        const accessToken = "dummy-access-token";
        const refreshToken = "dummy-refresh-token";

        saveToken(accessToken, refreshToken);
        dispatchInner(authSucess({ user: validUser }));
        Navigate("/")
      } catch (err) {
        const message = err?.message || "Login failed";
        dispatchInner(authFailure(message));
        claerToken();
      }
    });
  };

  return (
    <div className="login-wrapper">
      
      {/* Left Section - Image Only */}
      <div className="login-left">
        <img
          src="https://cdn.netmeds.tech/v2/plain-cake-860195/original/storefront/images/login-banner.png"
          alt="Login Banner"
          className="left-image"
        />
      </div>

      {/* Right Section - Login Card */}
      <div className="login-right">
        <div className="login-card">
          <h1>Sign in</h1>
          <p className="subtitle">
            Order medicines, wellness products and much more.
          </p>

          <Form onSubmit={handelSubmite}>
            <FormGroup>
              <Label>Enter Username</Label>
              <Input
                name="username"
                value={state.username}
                onChange={handleChange}
                placeholder="+91 Enter Username"
                className="custom-input"
              />
            </FormGroup>

            <FormGroup>
              <Label>Enter Password</Label>
              <Input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="custom-input"
              />
            </FormGroup>

            <Button className="login-btn" block>
              {loading ? <Spinner size="sm" /> : "Login"}
            </Button>

            {error && <p className="error-text">Error: {error}</p>}
          </Form>
        </div>
      </div>

    </div>
  );
};
