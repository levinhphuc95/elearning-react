import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  approveCourseRegisterApi,
  deleteCourseRegisterApi,
  getUserListWaitingApi,
  getUserListApprovedApi,
  getUserListNotRegisterApi,
} from "../../Redux/Actions/AdminAction";
import AdminCourseSearchUser from "./AdminCourseSearchUser";

export default function AdminCourseUserModal(props) {
  const { danhSachNguoiDungDaGhiDanh, danhSachNguoiDungChoXacThuc } =
    useSelector((state) => state.AdminUserReducer);
  const dispatch = useDispatch();

  const approveCourseRegister = (taiKhoan) => {
    let data = { taiKhoan: taiKhoan, maKhoaHoc: props.maKhoaHoc };
    dispatch(approveCourseRegisterApi(data));
  };
  const deleteCourseRegister = (taiKhoan) => {
    let data = { taiKhoan: taiKhoan, maKhoaHoc: props.maKhoaHoc };
    dispatch(deleteCourseRegisterApi(data));
  };
  const getUserCourseStatus = (maKhoaHoc) => {
    dispatch(getUserListWaitingApi(maKhoaHoc));
    dispatch(getUserListApprovedApi(maKhoaHoc));
    dispatch(getUserListNotRegisterApi(maKhoaHoc));
  };
  const renderUserWaitingItem = () => {
    return danhSachNguoiDungChoXacThuc.map((user, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-1">{index + 1}</div>
          <div className="col-8">{user.hoTen}</div>
          <div className="col-3 text-right">
            <button
              className="btn btn-success"
              onClick={() => {
                approveCourseRegister(user.taiKhoan);
                getUserCourseStatus(props.maKhoaHoc);
              }}
            >
              Xác Thực
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => {
                deleteCourseRegister(user.taiKhoan);
                getUserCourseStatus(props.maKhoaHoc);
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      );
    });
  };
  const renderUserApprovedItem = () => {
    return danhSachNguoiDungDaGhiDanh.map((user, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-1">{index + 1}</div>
          <div className="col-8">{user.hoTen}</div>
          <div className="col-3 text-right">
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteCourseRegister(user.taiKhoan);
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
            <h5>Danh sách người dùng chưa ghi danh</h5>
            <div>
              <AdminCourseSearchUser maKhoaHoc={props.maKhoaHoc} />
            </div>
          </div>
          <div className="my-3">
            <h5>Danh sách người dùng chờ xác thực</h5>
            {danhSachNguoiDungChoXacThuc !== [] ? (
              <div>
                <div className="row" style={{ fontWeight: "bold" }}>
                  <div className="col-2">STT</div>
                  <div className="col-6">Tên học viên</div>
                  <div className="col-4"></div>
                </div>
                {renderUserWaitingItem()}
              </div>
            ) : (
              "Không có học viên chờ xác thực"
            )}
          </div>
          <hr />
          <div className="my-3">
            <h5>Danh sách người dùng đã xác thực</h5>
            {danhSachNguoiDungDaGhiDanh !== [] ? (
              <div>
                <div className="row" style={{ fontWeight: "bold" }}>
                  <div className="col-2">STT</div>
                  <div className="col-6">Tên học viên</div>
                  <div className="col-4"></div>
                </div>
                {renderUserApprovedItem()}
              </div>
            ) : (
              "Không có học viên đã xác thực"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
