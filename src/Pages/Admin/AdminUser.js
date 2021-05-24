import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserApi,
  getUserListApi,
  getUserListSpreadPageApi,
  getCourseListWaitingApi,
  getCourseListApprovedApi,
  getCourseListNotRegisterApi,
} from "./../../Redux/Actions/AdminAction";
import ReactPaginate from "react-paginate";
import AdminUserCourse from "../../Components/AdminUser/AdminUserCourse";
import AdminAddUser from "../../Components/AdminUser/AdminAddUser";
import AdminUpdateUser from "../../Components/AdminUser/AdminUpdateUser";
import { Spinner } from "react-bootstrap";

export default function AdminUser() {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [UserModal, setUserModal] = useState("");
  const [updateUserInfo, setUpdateUserInfo] = useState("");
  const [offsetPagination, setOffsetPagination] = useState(0);
  const [addUpdateStatus, setAddUpdateStatus] = useState(true); //true:add, false: update

  const {
    danhSachNguoiDung,
    danhSachNguoiDungPhanTrang,
    pageCount,
    adminLoading,
  } = useSelector((state) => state.AdminUserReducer);

  useEffect(() => {
    dispatch(getUserListApi());
    dispatch(getUserListSpreadPageApi(1));
  }, [pageCount]);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_LOADING" });
    };
  }, []);

  const handleChangeInput = (event) => {
    let { value } = event.target;
    setSearchValue(value);
  };

  //Handle which page for request for separate page, offset is value of handlePageClick return from Pagination
  const handlePageClick = (offset) => {
    setOffsetPagination(offset.selected);
    dispatch(getUserListSpreadPageApi(offset.selected + 1));
  };
  //handle when to show which render list to show
  const handleShowDashboard = () => {
    if (searchValue !== "") {
      return renderUserSearchList();
    }
    return renderUserList();
  };
  //render user list when search key is null
  const renderUserList = () => {
    return danhSachNguoiDungPhanTrang.items?.map((user, index) => {
      return (
        <tr key={index}>
          <th>{offsetPagination * 10 + index + 1}</th>
          <th>{user.taiKhoan}</th>
          <th>{user.tenLoaiNguoiDung}</th>
          <th>{user.hoTen}</th>
          <th>{user.email}</th>
          <th>{user.soDT}</th>
          <th className="text-right">
            <button
              className="btn btn-primary mr-3"
              data-toggle="modal"
              data-target="#UserCourseModal"
              onClick={() => {
                getUserCourseStatus(user.taiKhoan);
                setUserModal(user.taiKhoan);
              }}
            >
              Ghi danh
            </button>
            <button
              className="btn btn-warning mr-3"
              data-toggle="modal"
              data-target="#addUserModal"
              onClick={() => {
                setAddUpdateStatus(false);
                setUpdateUserInfo(user);
              }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteUser(user.taiKhoan);
              }}
            >
              Xóa
            </button>
          </th>
        </tr>
      );
    });
  };
  //render user list when search key is enable
  const renderUserSearchList = () => {
    let userSearch = danhSachNguoiDung.filter(
      (user) =>
        user.taiKhoan.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.hoTen.toLowerCase().includes(searchValue.toLowerCase())
    );
    return userSearch.map((user, index) => {
      return (
        <tr key={index}>
          <th>{index}</th>
          <th>{user.taiKhoan}</th>
          <th>{user.maLoaiNguoiDung}</th>
          <th>{user.hoTen}</th>
          <th>{user.email}</th>
          <th>{user.soDt}</th>
          <th className="text-right">
            <button
              className="btn btn-primary mr-3"
              data-toggle="modal"
              data-target="#UserCourseModal"
              onClick={() => {
                getUserCourseStatus(user.taiKhoan);
                setUserModal(user.taiKhoan);
              }}
            >
              Ghi danh
            </button>
            <button
              className="btn btn-warning mr-3"
              data-toggle="modal"
              data-target="#addUserModal"
              onClick={() => {
                setAddUpdateStatus(false);
                setUpdateUserInfo(user);
              }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteUser(user.taiKhoan);
              }}
            >
              Xóa
            </button>
          </th>
        </tr>
      );
    });
  };
  //Delete user function
  const deleteUser = (taiKhoan) => {
    dispatch(deleteUserApi(taiKhoan));
  };
  const getUserCourseStatus = (taiKhoan) => {
    dispatch(getCourseListWaitingApi(taiKhoan));
    dispatch(getCourseListApprovedApi(taiKhoan));
    dispatch(getCourseListNotRegisterApi(taiKhoan));
  };

  let body = "";
  if (adminLoading) {
    body = (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    body = (
      <div className="admin-page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
              <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/courses">
                      <i className="fa fa-home" />
                      Quản lý khóa học
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      <i className="fa fa-utensils" />
                      Quản lý người dùng
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <nav className="my-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./index.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Quản lý người dùng
                  </li>
                </ol>
              </nav>
              <h2>Danh Sách Người Dùng</h2>
              {/* Button trigger modal */}
              <div className="row">
                {/* User Search Area */}
                <div className="col-8">
                  <input
                    type="text"
                    name="searchKey"
                    placeholder="Nhập vào tài khoản hoặc họ tên người dùng"
                    className="col-md-6"
                    onChange={handleChangeInput}
                  />
                </div>
                {/* Add User Button */}
                <div className="col-4">
                  <button
                    id="btnThem"
                    type="button"
                    className="btn btn-success mb-3 text-white"
                    data-toggle="modal"
                    data-target="#addUserModal"
                    onClick={() => {
                      setAddUpdateStatus(true);
                    }}
                  >
                    Thêm Người Dùng
                  </button>
                </div>
              </div>
              <div className=" foodTable">
                <table
                  className="table table-striped table-sm"
                  style={{ overflowX: "auto" }}
                >
                  <thead>
                    <tr className="user-table text-white">
                      <th>STT</th>
                      <th>Tài khoản</th>
                      <th>Phân loại</th>
                      <th>Họ tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="tbodyFood">{handleShowDashboard()}</tbody>
                </table>
                <div className="pagination-wrapper">
                  <ReactPaginate
                    previousLabel={"Trang trước"}
                    nextLabel={"Trang tiếp"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
        {/* Add User Modal */}
        <div
          className="modal fade"
          id="addUserModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {addUpdateStatus ? (
            <AdminAddUser />
          ) : (
            <AdminUpdateUser user={updateUserInfo} />
          )}
        </div>
        {/* User Registration Modal */}
        <div
          className="modal fade"
          id="UserCourseModal"
          tabIndex={-1}
          aria-labelledby="adminUserCourse"
          aria-hidden="true"
        >
          <AdminUserCourse taiKhoan={UserModal} />
        </div>
      </div>
    );
  }

  return <>{body}</>;
}
