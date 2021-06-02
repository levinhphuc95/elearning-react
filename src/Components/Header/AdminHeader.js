import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DANG_XUAT_TAI_KHOAN } from "./../../Redux/Constants/eLearningConst";

export default function Header(props) {
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 ml-2 px-3" to="/">
        CyberSoft
      </Link>

      <ul className="navbar-nav px-3 mr-5">
        <li className="nav-item text-nowrap">
          <Link
            className="nav-link"
            to="/"
            onClick={() => {
              dispatch({
                type: DANG_XUAT_TAI_KHOAN,
              });
            }}
          >
            Đăng xuất
          </Link>
        </li>
      </ul>
    </nav>
  );
}
