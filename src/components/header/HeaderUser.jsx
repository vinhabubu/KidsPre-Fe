import avatar from "assets/images/avatar.png";
import logo from "assets/images/logo-kid.png";
import { ROUTES } from "constants/routerWeb";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { EnumHome } from "router";
import { actionLogout } from "store/Login/action";
import "./header.scss";
function HeaderUser({ menuIcon, classHead, showProfile }) {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionLogout());

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const handleLogout = () => {
    onLogout();
    navigate(ROUTES.LOGIN);
  };
  return (
    <>
      <div className="header header-1 h-60px">
        <div
          className={`${classHead} h-100 d-flex justify-content-end align-items-center`}
        >
          {user?.username ? (
            <div className="d-flex justify-content-end align-items-center gap-4 mx-1">
              <div
                onClick={() => setIsActive((prev) => !prev)}
                className="account-header d-flex gap-2 align-items-center"
              >
                <img
                  className="avatar-account"
                  src={user.image || avatar}
                  alt="avatar"
                />
                <div className="account-info">
                  <b className="user-role m-0">{user?.username}</b>
                </div>
                <i className="fas fa-chevron-down"></i>
                <ul
                  className={`${
                    !isActive ? "d-none" : ""
                  } sub-menu-account list-unstyled`}
                >
                  {showProfile && (
                    <li onClick={() => navigate(ROUTES.USER_DETAIL)}>
                      <Link>My Profile</Link>
                    </li>
                  )}
                  <li onClick={handleLogout}>
                    <Link>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Button
                className="me-2"
                variant="secondary"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                <i className="fas fa-sign-in-alt me-1"></i>Log In
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                <i className="fas fa-sign-in-alt me-1"></i>Register
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="header header-2 h-100px">
        <div className={`${classHead} h-100 d-flex align-items-center`}>
          {/* Logo header */}
          <div className="logo-header d-flex align-items-center gap-2 pe-4 line-right">
            <div>{menuIcon}</div>
            <Link to={EnumHome[user?.roleid || 3]}>
              <img className="logo-header-img" src={logo} alt="logo kid" />
            </Link>
            <Link to={EnumHome[user?.roleid || 3]}>
              <h2 className="brand-header mb-1">Kidspire</h2>
            </Link>
          </div>
          <b className="desc-logo ff-title fs-3 text m-0 ms-4">
            LearnEnglish Kids
          </b>
        </div>
      </div>
      <div className="header header-3">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button
              className="navbar-toggler ms-auto mb-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar"
              aria-controls="navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav gap-1">
                <li className="nav-item">
                  <Link
                    to={ROUTES.HOME_PAGE}
                    className={`nav-link px-5 ${
                      matchPath(ROUTES.HOME_PAGE, pathname) && "active"
                    }`}
                  >
                    <span className="fs-5 text">Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={ROUTES.TOPIC}
                    className={`nav-link px-5 ${
                      matchPath(ROUTES.TOPIC, pathname) && "active"
                    }`}
                  >
                    <span className="fs-5 text">Topic</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={ROUTES.QUIZ}
                    className={`nav-link px-5 ${
                      matchPath(ROUTES.QUIZ, pathname) && "active"
                    }`}
                  >
                    <span className="fs-5 text">Quiz</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={ROUTES.USER_DETAIL}
                    className={`nav-link px-5 ${
                      matchPath(ROUTES.USER_DETAIL, pathname) && "active"
                    }`}
                  >
                    <span className="fs-5 text">Profile</span>
                  </Link>
                </li>
                {/* <li className="nav-item dropdown">
                  <Link
                    className="nav-link px-5 dropdown-toggle fs-5 text"
                    id="menu-dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown link
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="menu-dropdown">
                    <li>
                      <a className="dropdown-item" href="/#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default HeaderUser;
