import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseApi } from "../../Redux/Actions/AdminAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeAccents } from "../../util/AddFunctions";
import { DropzoneArea } from "material-ui-dropzone";
import { CardMedia } from "@material-ui/core";

export default function AdminAddCourseModal(props) {
  const { danhMucKhoaHoc } = useSelector((state) => state.CourseReducer);
  const { danhSachNguoiDung } = useSelector((state) => state.AdminUserReducer);
  const [picture, setPicture] = useState(null);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maKhoaHoc: props.khoaHoc.maKhoaHoc,
      biDanh: props.khoaHoc.biDanh,
      tenKhoaHoc: props.khoaHoc.tenKhoaHoc,
      moTa: props.khoaHoc.moTa,
      luotXem: props.khoaHoc.luotXem,
      danhGia: 0,
      hinhAnh: props.khoaHoc.hinhAnh,
      maNhom: "GP08",
      ngayTao: props.khoaHoc.ngayTao,
      maDanhMucKhoaHoc: props.khoaHoc.danhMucKhoaHoc.maDanhMucKhoahoc,
      taiKhoanNguoiTao: props.khoaHoc.nguoiTao.taiKhoan,
    },
    validationSchema: Yup.object().shape({
      maKhoaHoc: Yup.string().required("Mã khóa học không được bỏ trống"),
      tenKhoaHoc: Yup.string().required("Tên khóa học không được bỏ trống"),
      luotXem: Yup.string().required("Lượt xem không được bỏ trống"),
      danhGia: Yup.string().required("Đánh giá không được bỏ trống"),
      mota: Yup.string().required("Mã khóa học không được bỏ trống"),
    }),
  });

  const handleUpdateCourseFn = () => {
    const formValue = {
      ...formik.values,
      biDanh: removeAccents(formik.values.tenKhoaHoc),
      picture: picture,
    };
    console.log(formValue);
    dispatch(updateCourseApi(formValue));
  };
  const renderDanhMucKhoaHoc = () => {
    return danhMucKhoaHoc.map((item, index) => {
      return (
        <option
          value={item.maDanhMuc}
          key={index}
          selected={
            item.maDanhMuc === props.khoaHoc.danhMucKhoaHoc.maDanhMucKhoahoc
          }
        >
          {item.tenDanhMuc}
        </option>
      );
    });
  };
  const renderDanhSachNguoiDung = () => {
    return danhSachNguoiDung
      .filter((item) => item.maLoaiNguoiDung === "GV")
      .map((item, index) => {
        return (
          <option value={item.taiKhoan} key={index}>
            {item.hoTen}
          </option>
        );
      });
  };
  return (
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Cập nhật thông tin khóa học
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
          <form
            className="needs-validation"
            id="addUserForm"
            onSubmit={formik.handleSubmit}
            enableReinitialize={formik.enableReinitialize}
          >
            <div className="row">
              <div className="col-md-8 mb-3">
                <label htmlFor="taiKhoan">Mã Khóa Học</label>
                <input
                  type="text"
                  className="form-control"
                  name="maKhoaHoc"
                  value={formik.values.maKhoaHoc}
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.maKhoaHoc}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="loai">Lượt xem</label>
                <input
                  type="text"
                  className="form-control"
                  name="luotXem"
                  disabled
                  value={formik.values.luotXem}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.luotXem}
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <label htmlFor="hoTen">Tên Khóa Học</label>
                <input
                  type="text"
                  className="form-control"
                  name="tenKhoaHoc"
                  value={formik.values.tenKhoaHoc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.tenKhoaHoc}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="loai">Đánh giá</label>
                <input
                  type="text"
                  className="form-control"
                  name="danhGia"
                  value="0"
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.danhGia}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="maLoaiNguoiDung">Danh mục khóa học</label>
                <select
                  className="custom-select d-block w-100"
                  name="maDanhMucKhoaHoc"
                  value={formik.values.maDanhMucKhoaHoc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {renderDanhMucKhoaHoc()}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="maLoaiNguoiDung">Người tạo</label>
                <select
                  className="custom-select d-block w-100"
                  name="taiKhoanNguoiTao"
                  value={formik.values.taiKhoanNguoiTao}
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {renderDanhSachNguoiDung()}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Ngày tạo</label>
                <input
                  type="text"
                  className="form-control"
                  name="ngayTao"
                  value={formik.values.ngayTao}
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="moTa">Mô Tả</label>
                <textarea
                  className="form-control"
                  name="moTa"
                  rows={3}
                  value={formik.values.moTa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.moTa}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <DropzoneArea
                    filesLimit={1}
                    showAlerts={false}
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(image) => {
                      setPicture(image[0]);
                    }}
                    maxFileSize={5000000}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group" style={{ height: "100%" }}>
                  {formik.values.hinhAnh ? (
                    <CardMedia
                      image={formik.values.hinhAnh}
                      style={{ height: "100%" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-warning"
            data-dismiss="modal"
            onClick={handleUpdateCourseFn}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
