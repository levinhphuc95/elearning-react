import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { phoneRegex } from "../../util/setting";
import { updateUserApi } from "./../../Redux/Actions/AdminAction";

export default function AdminUpdateUserModal(props) {
  console.log(props.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: props.user.taiKhoan,
      matKhau: "",
      email: props.user.email,
      hoTen: props.user.hoTen,
      soDT: props.user.soDT,
      maNhom: "GP08",
      maLoaiNguoiDung: props.user.maLoaiNguoiDung,
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
      matKhau: Yup.string()
        // .required("Mật khẩu không được bỏ trống")
        .min(5, "Mật khẩu tối thiểu 5 ký tự")
        .max(24, "Mật khẩu tối đa 24 ký tự"), //.test(/cybersof/,'Mật khẩu không đúng định dạng')
      email: Yup.string()
        .required("Email không được bỏ trống!")
        .email("Email không đúng định dạng!"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống"),
      soDT: Yup.string().matches(phoneRegex, "Số điện thoại không hợp lệ"),
    }),
  });

  const handleUpdateUserFn = () => {
    dispatch(updateUserApi(formik.values));
  };
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Cập nhật thông tin người dùng
          </h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <form className="needs-validation" id="addUserForm">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="taiKhoan">Tài Khoản</label>
                <input
                  type="text"
                  className="form-control"
                  name="taiKhoan"
                  defaultValue={props.user.taiKhoan}
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.taiKhoan}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="hoTen">Họ Tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="hoTen"
                  defaultValue={props.user.hoTen}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.hoTen}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="loai">Mật Khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  name="matKhau"
                  placeholder="Nhập mật khẩu"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.matKhau}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="maLoaiNguoiDung">Loại Người Dùng</label>
                <select
                  className="custom-select d-block w-100"
                  name="maLoaiNguoiDung"
                  value={formik.values.maLoaiNguoiDung}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value>Loại Người Dùng</option>
                  <option value={"GV"}>Giáo Vụ</option>
                  <option value={"HV"}>Học Viên</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="loai">Số Điện Thoại</label>
                <input
                  type="text"
                  className="form-control"
                  name="soDt"
                  defaultValue={props.user.soDT}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.soDT}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  defaultValue={props.user.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.email}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            form="addUserForm"
            className="btn btn-warning"
            onClick={handleUpdateUserFn}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
