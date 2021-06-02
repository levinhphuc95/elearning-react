import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseApi } from "../../Redux/Actions/AdminAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeAccents, getDateFormatted } from "../../util/AddFunctions";
import { DropzoneArea } from "material-ui-dropzone";

export default function AdminAddCourseModal(props) {
  const { danhMucKhoaHoc } = useSelector((state) => state.CourseReducer);
  const { danhSachNguoiDung } = useSelector((state) => state.AdminUserReducer);
  const [picture, setPicture] = useState(null);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: ".jpg",
      maNhom: "GP08",
      ngayTao: getDateFormatted(),
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    },
    validationSchema: Yup.object().shape({
      maKhoaHoc: Yup.string().required("Mã khóa học không được bỏ trống"),
      tenKhoaHoc: Yup.string().required("Tên khóa học không được bỏ trống"),
      luotXem: Yup.string().required("Lượt xem không được bỏ trống"),
      danhGia: Yup.string().required("Đánh giá không được bỏ trống"),
      mota: Yup.string().required("Mã khóa học không được bỏ trống"),
    }),
  });

  const handleAddCourseFn = () => {
    const formValue = {
      ...formik.values,
      biDanh: removeAccents(formik.values.tenKhoaHoc),
      picture: picture,
    };
    dispatch(addCourseApi(formValue));
  };
  const renderDanhMucKhoaHoc = () => {
    return danhMucKhoaHoc.map((item, index) => {
      return (
        <option value={item.maDanhMuc} key={index}>
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
            Thêm khóa học
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
          >
            <div className="row">
              <div className="col-md-8 mb-3">
                <label htmlFor="taiKhoan">Mã Khóa Học</label>
                <input
                  type="text"
                  className="form-control"
                  name="maKhoaHoc"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.maKhoaHoc && formik.touched.maKhoaHoc
                    ? formik.errors.maKhoaHoc
                    : null}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="loai">Lượt xem</label>
                <input
                  type="text"
                  className="form-control"
                  name="luotXem"
                  defaultValue="0"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.luotXem && formik.touched.luotXem
                    ? formik.errors.luotXem
                    : null}
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <label htmlFor="hoTen">Tên Khóa Học</label>
                <input
                  type="text"
                  className="form-control"
                  name="tenKhoaHoc"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.tenKhoaHoc && formik.touched.tenKhoaHoc
                    ? formik.errors.tenKhoaHoc
                    : null}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="loai">Đánh giá</label>
                <input
                  type="text"
                  className="form-control"
                  name="danhGia"
                  defaultValue="0"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.danhGia && formik.touched.danhGia
                    ? formik.errors.danhGia
                    : null}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="maLoaiNguoiDung">Danh mục khóa học</label>
                <select
                  className="custom-select d-block w-100"
                  id="khuyenMai"
                  name="maDanhMucKhoaHoc"
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
                  defaultValue="HV"
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
                  defaultValue={getDateFormatted()}
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
                  defaultValue={""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div id="invalidTen" className="invalid-form text-danger">
                  {formik.errors.moTa && formik.touched.moTa
                    ? formik.errors.moTa
                    : null}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <DropzoneArea
                    filesLimit={1}
                    showAlerts={false}
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(image) => setPicture(image[0])}
                    maxFileSize={5000000}
                  />
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
            onClick={handleAddCourseFn}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
