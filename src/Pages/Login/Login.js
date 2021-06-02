import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { phoneRegex } from "../../util/setting";
import { registerApi, loginApi } from "./../../Redux/Actions/UserAction";

export default function Login(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP08",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(5, "Mật khẩu tối thiểu 5 ký tự")
        .max(24, "Mật khẩu tối đa 24 ký tự"), //.test(/cybersof/,'Mật khẩu không đúng định dạng')
      email: Yup.string()
        .required("Email không được bỏ trống!")
        .email("Email không đúng định dạng!"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống"),
      soDT: Yup.string().matches(phoneRegex, "Số điện thoại không hợp lệ"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(registerApi(values));
    },
  });
  const formikLogin = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(5, "Mật khẩu tối thiểu 5 ký tự")
        .max(24, "Mật khẩu tối đa 24 ký tự"), //.test(/cybersof/,'Mật khẩu không đúng định dạng')
    }),
    onSubmit: (values) => {
      dispatch(loginApi(values));
    },
  });
  console.log(formikLogin.touched);
  return (
    <div className="login__wrapper">
      <div className={`login_container ${props.match.params.signUpMode}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action="#"
              className="sign-in-form"
              onSubmit={formikLogin.handleSubmit}
            >
              <h2 className="title">Đăng nhập</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="User Account"
                  name="taiKhoan"
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                />
              </div>
              {formikLogin.errors.taiKhoan && formikLogin.touched.taiKhoan ? (
                <p className="text-danger">{formikLogin.errors.taiKhoan}</p>
              ) : null}

              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  placeholder="Password"
                  name="matKhau"
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                />
              </div>
              {formikLogin.errors.matKhau && formikLogin.touched.matKhau ? (
                <p className="text-danger">{formikLogin.errors.matKhau}</p>
              ) : null}
              <input
                type="submit"
                className="btn solid"
                value="ĐĂNG NHẬP"
                onSubmit={formikLogin.handleSubmit}
              />
              <p className="social-text">
                Hoặc đăng nhập với tài khoản mạng xã hội của bạn?
              </p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
            <form
              action="#"
              className="sign-up-form"
              onSubmit={formik.handleSubmit}
            >
              <h2 className="title">Đăng Ký</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="Tài khoản"
                  name="taiKhoan"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
                <p className="text-danger">{formik.errors.taiKhoan}</p>
              ) : null}
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : null}
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  name="matKhau"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.matKhau && formik.touched.matKhau ? (
                <p className="text-danger">{formik.errors.matKhau}</p>
              ) : null}
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="Họ và tên"
                  name="hoTen"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.hoTen && formik.touched.hoTen ? (
                <p className="text-danger">{formik.errors.hoTen}</p>
              ) : null}
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  name="soDT"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.soDT && formik.touched.soDT ? (
                <p className="text-danger">{formik.errors.soDT}</p>
              ) : null}
              <input
                type="submit"
                className="btn"
                value="ĐĂNG KÝ"
                onSubmit={formik.handleSubmit}
              />
              <p className="social-text">
                Hoặc đăng nhập với tài khoản mạng xã hội của bạn?
              </p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Bạn vừa biết đến chúng tôi ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <NavLink
                className="btn transparent"
                id="sign-up-btn"
                to="/login/sign-up"
              >
                Đăng ký
              </NavLink>
            </div>
            <img
              src={require("./../../Assets/img/Login/log.svg").default}
              className="image"
              alt
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Bạn đã là thành viên của chúng tôi ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <NavLink
                className="btn transparent"
                id="sign-in-btn"
                to="/login/sign-in"
              >
                Đăng nhập
              </NavLink>
            </div>
            <img
              src={require("./../../Assets/img/Login/register.svg").default}
              className="image"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  );
}
