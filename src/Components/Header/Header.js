import React, { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { layDanhMucKhoaHocApi } from "./../../Redux/Actions/eLearningAction";
import { useFormik } from "formik";
import { history } from "./../../App";

export default function Header(props) {
  const { danhMucKhoaHoc } = useSelector((state) => state.CourseReducer);
  const { tenDangNhap } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      searchKey: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const layDanhMucKhoaHoc = () => {
    dispatch(layDanhMucKhoaHocApi());
  };

  useEffect(() => {
    layDanhMucKhoaHoc();
  }, []);

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
      <nav className="navbar navbar-light navbar-expand-md navigation-clean-search bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src={require("./../../Assets/img/MIN-OP1.png").default}
              alt="logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navcol-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdownId"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-bars"></i>
                  <span>Danh mục khóa học</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  {renderDanhMucKhoaHoc()}
                </div>
              </li>
            </ul>
            <form
              className="form-inline w-50 mr-5"
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
              {tenDangNhap.trim() !== "" ? (
                <NavLink to="/">
                  <i className="fas fa-user-circle"></i>
                  {tenDangNhap}
                </NavLink>
              ) : (
                <div>
                  <NavLink
                    className="nav_button_1"
                    role="button"
                    to="/login/sign-in"
                  >
                    Đăng nhập
                  </NavLink>
                  <NavLink
                    className="nav_button_2"
                    role="button"
                    to="/login/sign-up"
                  >
                    Đăng kí
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
