import avatar from "assets/images/avatar.png";
import logo from "assets/images/logo-kid.png";
import { ROUTES } from "constants/routerWeb";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EnumHome } from "router";
import { actionLogout } from "store/Login/action";
import "./header.scss";
function Header({ menuIcon, children, classHead, showProfile }) {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionLogout());

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const handleLogout = () => {
    onLogout();
    navigate(ROUTES.LOGIN);
  };
  return (
    <div className="header h-60px">
      <div
        className={`${classHead} d-flex h-100 justify-content-between align-items-center px-2`}
      >
        {/* Logo header */}
        <div className="logo-header d-flex align-items-center gap-2">
          <div>{menuIcon}</div>
          <Link to={EnumHome[user?.roleid || 3]}>
            <img className="logo-header-img" src={logo} alt="logo kid" />
          </Link>
          <Link to={EnumHome[user?.roleid || 3]}>
            <h2 className="brand-header mb-1">Kidspire</h2>
          </Link>
        </div>
        {children}
        {/* Right header */}
        {user?.username ? (
          <div className=" d-flex justify-content-end align-items-center gap-4 mx-1">
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
          <Link to={ROUTES.LOGIN}>
            Login <i className="fas fa-sign-in-alt ms-1"></i>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
