/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import imgLogin from "assets/images/childhood.png";
import { ROUTES } from "constants/routerWeb";
import _capitalize from "lodash/capitalize";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionRegister } from "store/Login/action";
import "../Login/index.scss";

const initialData = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Register(props) {
  // state store
  const loginState = useSelector((state) => state.loginReducer);
  // action store
  const dispatch = useDispatch();
  const onRegister = (body) => dispatch(actionRegister(body));
  const {
    registerStatus: { isLoading, isSuccess, isFailure },
    data,
  } = loginState;

  const [formdata, setData] = useState(initialData);
  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (isSuccess) setData(initialData);
  }, [isSuccess]);

  useEffect(() => {
    if (isFailure)
      setError((prevError) => ({
        ...prevError,
        confirm_password: data?.error,
      }));
  }, [isFailure]);

  // Hàm để kiểm tra tính hợp lệ của email
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Hàm để kiểm tra mật khẩu và mật khẩu nhập lại có khớp nhau không
  const isPasswordMatching = () => {
    return formdata.password === formdata.confirm_password;
  };

  // Hàm xử lý sự thay đổi trường dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => {
      const newError = { ...prevError, [name]: "" };
      if (data?.error) newError.confirm_password = "";
      return newError;
    });
  };

  // Hàm xử lý khi người dùng nhấn nút đăng nhập
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
      } else if (key === "email" && !isEmailValid(formdata.email)) {
        setError((prevError) => ({
          ...prevError,
          email: "Invalid email format",
        }));
        validates = false;
      } else if (key === "confirm_password" && !isPasswordMatching()) {
        setError((prevError) => ({
          ...prevError,
          confirm_password: "Password do not match",
        }));
        validates = false;
      }
    });

    if (validates) {
      const newData = _omit(formdata, ["confirm_password"]);
      onRegister({ ...newData, roleid: 3, birthday: "31011999", image: "" });
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
        <form className="form-login">
          <div className="divider d-flex align-items-center my-3">
            <h1 className="text-center mx-3 mb-0 font-bold">REGISTER</h1>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${!!error.username && "is-invalid"}`}
              id="username"
              name="username"
              value={formdata.username}
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          {error.username && (
            <small className="d-block text-danger -mt-3">
              {error.username}
            </small>
          )}
          <div className="form-floating form-floating-sm mb-3">
            <input
              type="email"
              className={`form-control ${!!error.email && "is-invalid"}`}
              id="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          {error.email && (
            <small className="d-block text-danger -mt-3">{error.email}</small>
          )}
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${!!error.password && "is-invalid"}`}
              id="pwd"
              name="password"
              value={formdata.password}
              onChange={handleChange}
            />
            <label htmlFor="pwd">Password</label>
          </div>
          {error.password && (
            <small className="d-block text-danger -mt-3">
              {error.password}
            </small>
          )}
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                !!error.confirm_password && !isFailure && "is-invalid"
              }`}
              id="re_pwd"
              name="confirm_password"
              value={formdata.confirm_password}
              onChange={handleChange}
            />
            <label htmlFor="re_pwd">Confirm Password</label>
          </div>
          {error.confirm_password && (
            <small className="d-block text-danger -mt-3">
              {_capitalize(error.confirm_password)}
            </small>
          )}

          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-lg px-3 w-100 d-flex justify-content-center"
              onClick={handleSubmit}
            >
              {isLoading && (
                <div
                  className="spinner-border text-white me-2"
                  role="status"
                ></div>
              )}
              REGISTER
            </button>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="d-block text-black-50 text-end mt-1"
            role="button"
          >
            Already an account.
            <span className="text-primary"> Login!</span>
          </Link>
        </form>
      </div>
      <div className="text-center py-4 px-4 px-xl-5 bg-secondary text-white">
        Copyright © 2023. All rights reserved.
      </div>
    </section>
  );
}

export default Register;
