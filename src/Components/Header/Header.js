import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { layDanhMucKhoaHocApi } from "./../../Redux/Actions/eLearningAction";
import { useFormik } from "formik";
import { history } from "./../../App";
import UserLoginButtons from "../UserLogin/UserLoginButtons";
import UserInfo from "../UserLogin/UserInfo";
import { getUserInfoApi } from "../../Redux/Actions/UserAction";

export default function Header(props) {
  const { danhMucKhoaHoc } = useSelector((state) => state.CourseReducer);
  const { thongTinTaiKhoan, taiKhoan } = useSelector(
    (state) => state.UserReducer
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      searchKey: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    dispatch(layDanhMucKhoaHocApi());
    // if (taiKhoan !== "") {
    //   dispatch(getUserInfoApi(taiKhoan));
    // }
  }, [taiKhoan]);

  const renderDanhMucKhoaHoc = () => {
    return danhMucKhoaHoc.map((item, index) => {
      return (
        <Link
          className="dropdown-item bg-light text-dark"
          to={`/danhmuckhoahoc/${item.maDanhMuc}`}
          key={index}
        >
          {item.tenDanhMuc}
        </Link>
      );
    });
  };
  return (
    <div className="navbar__wrapper">
      <nav className="navbar navbar-light navbar-expand-xl navigation-clean-search bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src={require("./../../Assets/img/MIN-OP1.png").default}
              alt="logo"
            />
          </NavLink>
          <button
            className="navbar-toggler mr-3"
            data-toggle="collapse"
            data-target="#navcol-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon " />
          </button>
          <div
            className="collapse navbar-collapse w-100 bg-light px-5"
            style={{ zIndex: 100, justifyContent: "space-between" }}
            id="navcol-1"
          >
            <ul className="nav navbar-nav">
              <li className="nav-item dropdown navbar__item">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdownBrowse"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-bars navbar_item_icon"></i>
                  <span className="navbar_item_text">Danh mục</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownBrowse">
                  {renderDanhMucKhoaHoc()}
                </div>
              </li>
            </ul>
            <form
              className="form-inline"
              target="_self"
              onSubmit={() => {
                history.push(`/timkiemkhoahoc/${formik.values.searchKey}`);
              }}
            >
              <div className="form-group">
                <input
                  className="form-control search-field"
                  type="search"
                  name="searchKey"
                  id="search-field"
                  placeholder="Tìm khóa học..."
                  onChange={formik.handleChange}
                  value={formik.values.searchKey}
                />
              </div>
            </form>
            <div>
              {taiKhoan.trim() !== "" ? (
                <UserInfo
                  maLoaiND={thongTinTaiKhoan.maLoaiNguoiDung}
                  taiKhoan={taiKhoan}
                />
              ) : (
                <div>
                  <UserLoginButtons />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
