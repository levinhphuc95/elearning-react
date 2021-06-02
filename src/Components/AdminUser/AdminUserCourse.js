import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  approveCourseRegisterApi,
  getCourseListWaitingApi,
  getCourseListApprovedApi,
  getCourseListNotRegisterApi,
  deleteCourseRegisterApi,
} from "../../Redux/Actions/AdminAction";
import AdminUserSearchCourse from "./AdminUserSearchCourse";

export default function AdminUserCourse(props) {
  const { danhSachKhoaHocChoXacThuc, danhSachKhoaHocDaXacThuc } = useSelector(
    (state) => state.AdminUserReducer
  );
  const dispatch = useDispatch();
  
  const approveCourseRegister = (maKhoaHoc) => {
    let data = { taiKhoan: props.taiKhoan, maKhoaHoc: maKhoaHoc };
    dispatch(approveCourseRegisterApi(data));
  };
  const deleteCourseRegister = (maKhoaHoc) => {
    let data = { taiKhoan: props.taiKhoan, maKhoaHoc: maKhoaHoc };
    dispatch(deleteCourseRegisterApi(data));
  };
  const getUserCourseStatus = (taiKhoan) => {
    dispatch(getCourseListWaitingApi(taiKhoan));
    dispatch(getCourseListApprovedApi(taiKhoan));
    dispatch(getCourseListNotRegisterApi(taiKhoan));
  };
  const renderCourseWaitingItem = () => {
    return danhSachKhoaHocChoXacThuc.map((course, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-1">{index + 1}</div>
          <div className="col-8">{course.tenKhoaHoc}</div>
          <div className="col-3 text-right">
            <button
              className="btn btn-success"
              onClick={() => {
                approveCourseRegister(course.maKhoaHoc);
                getUserCourseStatus(props.taiKhoan);
              }}
            >
              Xác Thực
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => {
                deleteCourseRegister(course.maKhoaHoc);
                getUserCourseStatus(props.taiKhoan);
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      );
    });
  };
  const renderCourseApprovedItem = () => {
    return danhSachKhoaHocDaXacThuc.map((course, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-1">{index + 1}</div>
          <div className="col-8">{course.tenKhoaHoc}</div>
          <div className="col-3 text-right">
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteCourseRegister(course.maKhoaHoc);
                getUserCourseStatus(props.taiKhoan);
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="adminUserCourse">
            Quản lý ghi danh
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
          <div className="my-3">
            <h5>Danh sách khóa học chưa ghi danh</h5>
            <div>
              <AdminUserSearchCourse taiKhoan={props.taiKhoan} />
            </div>
          </div>
          <div className="my-3">
            <h5>Danh sách khóa học chờ xác thực</h5>
            {danhSachKhoaHocChoXacThuc !== [] ? (
              <div>
                <div className="row" style={{ fontWeight: "bold" }}>
                  <div className="col-2">STT</div>
                  <div className="col-6">Tên khóa học</div>
                  <div className="col-4"></div>
                </div>
                {renderCourseWaitingItem()}
              </div>
            ) : (
              "Không có khóa học chờ xác thực"
            )}
          </div>
          <hr />
          <div className="my-3">
            <h5>Danh sách khóa học đã xác thực</h5>
            {danhSachKhoaHocDaXacThuc !== [] ? (
              <div>
                <div className="row" style={{ fontWeight: "bold" }}>
                  <div className="col-2">STT</div>
                  <div className="col-6">Tên khóa học</div>
                  <div className="col-4"></div>
                </div>
                {renderCourseApprovedItem()}
              </div>
            ) : (
              "Không có khóa học đã xác thực"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
