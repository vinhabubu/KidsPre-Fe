/* eslint-disable react-hooks/exhaustive-deps */
import imgLogin from "assets/images/childhood.png";
import { ROUTES } from "constants/routerWeb";
import _capitalize from "lodash/capitalize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EnumHome } from "router";
import { actionLogin } from "store/Login/action";
import "./index.scss";

function Login() {
  // state store
  const loginState = useSelector((state) => state.loginReducer);
  // action store
  const dispatch = useDispatch();
  const onLogin = (body, isRemember) => dispatch(actionLogin(body, isRemember));
  const {
    loginStatus: { isLoading, isSuccess, isFailure },
    data,
  } = loginState;

  const { user } = data;

  // state local
  const navigate = useNavigate();
  const [isRemember, setRemember] = useState(false);
  const [formdata, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(EnumHome[user.roleid]);
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    if (isFailure)
      setError((prevError) => ({
        ...prevError,
        password: data?.error,
      }));
  }, [isFailure]);

  // function local
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
    if (isFailure) setError((prevError) => ({ ...prevError, password: "" }));
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(formdata);
    let validates = true;
    tmpKey.forEach((key) => {
      if (formdata[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      // dispatch
      onLogin(
        { email: formdata.username, password: formdata.password },
        isRemember
      );
    }
  };

  return (
    <section className="vh-100 login-box">
      <div className="container-fluid h-custom">
        <img
          src={imgLogin}
          alt="img login 1"
          className="position-absolute bg-login"
        />
        <div className="form-login">
          <div className="divider d-flex align-items-center my-3">
            <h1 className="text-center mx-3 mb-0 font-bold">LOGIN</h1>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${!!error.username && "is-invalid"}`}
              name="username"
              id="username"
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          {!!error.username && (
            <small className="d-block text-danger -mt-3">
              {error.username}
            </small>
          )}

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                !!error.password && !isFailure && "is-invalid"
              }`}
              name="password"
              id="pwd"
              onChange={handleChange}
            />
            <label htmlFor="pwd">Password</label>
          </div>
          {!!error.password && (
            <small className="d-block text-danger -mt-3">
              {error.password}
            </small>
          )}

          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <div className="form-check">
              <input
                className="form-check-input "
                type="checkbox"
                value=""
                id="remember"
                onChange={() => setRemember((prev) => !prev)}
              />
              <label
                className="form-check-label text-black-50"
                htmlFor="remember"
                role="button"
              >
                Remember me
              </label>
            </div>
            <div className="text-black-50" role="button">
              Forgot password?
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-lg px-3 w-100 d-flex justify-content-center"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && (
                <div
                  className="spinner-border text-white me-2"
                  role="status"
                ></div>
              )}
              SIGN IN
            </button>
          </div>
          <Link
            to={ROUTES.REGISTER}
            className="d-block text-black-50 text-end mt-1"
            role="button"
          >
            No account yet.
            <span className="text-primary"> Register!</span>
          </Link>
        </div>
      </div>
      <div className="text-center py-4 px-4 px-xl-5 bg-secondary text-white">
        Copyright © 2023. All rights reserved.
      </div>
    </section>
  );
}

export default Login;
