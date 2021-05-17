import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DANG_XUAT_TAI_KHOAN } from "./../../Redux/Constants/eLearningConst";

export default function UserInfo(props) {
  const dispatch = useDispatch();
  // const { taiKhoan, maLoaiNguoiDung, tenDangNhap } = useSelector(
  //   (state) => state.UserReducer
  // );
  return (
    <ul className="nav navbar-nav">
      <li className="nav-item dropdown navbar__item">
        <Link className="nav-link dropdown-toggle" to="/">
          <i className="fa fa-home navbar_item_icon"></i>
          <span className="navbar_item_text">Trang chủ</span>
        </Link>
      </li>
      <li className="nav-item dropdown navbar__item">
        {!props.admin ? (
          <Link className="nav-link dropdown-toggle" to="/khoahoccuatoi">
            <i className="fa fa-book-open navbar_item_icon"></i>
            <span className="navbar_item_text">Khóa học của tôi</span>
          </Link>
        ) : (
          ""
        )}
      </li>
      <li className="nav-item dropdown navbar__item">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="dropdownUser"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-user navbar_item_icon"></i>
          <span className="navbar_item_text">{props.taiKhoan}</span>
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdownUser">
          <Link
            className="dropdown-item bg-light text-dark popup"
            to={`/capnhatthongtin/${props.taiKhoan}`}
          >
            Thông tin tài khoản
          </Link>
          <div>
            {props.maLoaiND === "GV" ? (
              <Link className="dropdown-item bg-light text-dark" to={`/admin`}>
                Quản lý website
              </Link>
            ) : (
              <></>
            )}
          </div>
          <Link className="dropdown-item bg-light text-dark" to={`/`}>
            Cài đặt
          </Link>
          <Link
            className="dropdown-item bg-light text-dark"
            to={`/`}
            onClick={() => {
              dispatch({
                type: DANG_XUAT_TAI_KHOAN,
              });
            }}
          >
            Đăng xuất
          </Link>
        </div>
      </li>
    </ul>
  );
}
