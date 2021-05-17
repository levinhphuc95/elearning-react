import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseApi } from "../../Redux/Actions/AdminAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeAccents, getDateFormatted } from "../../util/AddFunctions";

export default function AdminAddCourseModal(props) {
  const { danhMucKhoaHoc } = useSelector((state) => state.CourseReducer);
  const { danhSachNguoiDung } = useSelector((state) => state.AdminUserReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
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
                  {formik.errors.maKhoaHoc}
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
                  {formik.errors.luotXem}
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
                  {formik.errors.tenKhoaHoc}
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
                  {formik.errors.danhGia}
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
                  id="khuyenMai"
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
                <div className="form-group">
                  <label htmlFor="hinhMon">Hình ảnh</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="hinhAnh"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
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
                  {formik.errors.moTa}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleAddCourseFn}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
