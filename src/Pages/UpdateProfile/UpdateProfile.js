import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfoApi,
  loginApi,
  updateUserInfoApi,
} from "../../Redux/Actions/UserAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { phoneRegex } from "../../util/setting";
import { Link } from "react-router-dom";

export default function UpdateProfile(props) {
  //khai báo chức năng ẩn hiện các vùng khi nhấn cập nhật thông tin
  const [disappearStatus, setDisapearStatus] = useState("");
  const [appearStatus, setAppearStatus] = useState("d-none");
  const [disabled, setDisabled] = useState(true);

  const { thongTinTaiKhoan } = useSelector((state) => state.UserReducer);
  const { danhSachKhoaHoc } = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinTaiKhoan.taiKhoan,
      matKhau: thongTinTaiKhoan.matKhau,
      email: thongTinTaiKhoan.email,
      hoTen: thongTinTaiKhoan.hoTen,
      soDT: thongTinTaiKhoan.soDT,
      maNhom: "GP08",
      xacNhanMatKhau: thongTinTaiKhoan.matKhau,
      maLoaiNguoiDung: thongTinTaiKhoan.maLoaiNguoiDung,
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string(),
      matKhau: Yup.string()
        .min(5, "Mật khẩu tối thiểu 5 ký tự")
        .max(24, "Mật khẩu tối đa 24 ký tự"), //.test(/cybersof/,'Mật khẩu không đúng định dạng')
      xacNhanMatKhau: Yup.string().oneOf(
        [Yup.ref("matKhau")],
        "Mật khẩu không trùng khớp"
      ),
      email: Yup.string().email("Email không đúng định dạng!"),
      hoTen: Yup.string(),
      soDT: Yup.string().matches(phoneRegex, "Số điện thoại không hợp lệ"),
    }),
    onSubmit: (values) => {
      delete values.xacNhanMatKhau;
      dispatch(updateUserInfoApi(values));
    },
  });

  const handleUpdateProfileButton = () => {
    setDisapearStatus("d-none");
    setAppearStatus("");
    setDisabled(false);
  };

  return (
    <div className="content update__profile__wrapper">
      <div className="container">
        <div className="card my-5">
          <div className="card-header card-header-primary">
            <h4 className="card-title">Thông tin tài khoản</h4>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="bmd-label-floating">Tài Khoản</label>
                    <input
                      type="text"
                      className="form-control"
                      name="taiKhoan"
                      placeholder={thongTinTaiKhoan.taiKhoan}
                      disabled={disabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p>{formik.errors.taiKhoan}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="bmd-label-floating">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder={thongTinTaiKhoan.email}
                      disabled={disabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p>{formik.errors.email}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="bmd-label-floating">Tên người dùng</label>
                    <input
                      type="text"
                      className="form-control"
                      name="hoTen"
                      placeholder={thongTinTaiKhoan.hoTen}
                      disabled={disabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p>{formik.errors.hoTen}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="bmd-label-floating">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      name="soDT"
                      placeholder={thongTinTaiKhoan.soDT}
                      disabled={disabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p>{formik.errors.soDT}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="bmd-label-floating">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      name="matKhau"
                      disabled={disabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p>{formik.errors.matKhau}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`form-group ${appearStatus}`}>
                    <label className="bmd-label-floating">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="xacNhanMatKhau"
                      disabled={disabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p>{formik.errors.xacNhanMatKhau}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="bmd-label-floating">
                      Loại người dùng
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        thongTinTaiKhoan.maLoaiNguoiDung == "GV"
                          ? "Giáo vụ"
                          : "Học viên"
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6"></div>
              </div>
              <button
                type="button"
                className={`btn btn-primary pull-right ${disappearStatus}`}
                onClick={handleUpdateProfileButton}
              >
                Cập nhật thông tin
              </button>
              <button
                type="button"
                className={`btn btn-primary pull-right ${appearStatus}`}
                onClick={formik.handleSubmit}
              >
                Xác nhận
              </button>
              <div className="clearfix" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
