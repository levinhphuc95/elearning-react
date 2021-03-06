import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseListApi,
  layDanhMucKhoaHocApi,
} from "./../../Redux/Actions/eLearningAction";
import {
  getUserListApi,
  deleteCourseApi,
  getUserListNotRegisterApi,
  getUserListWaitingApi,
  getUserListApprovedApi,
} from "./../../Redux/Actions/AdminAction";
import ReactPaginate from "react-paginate";
import AdminAddCourseModal from "../../Components/AdminCourse/AdminAddCourseModal";
import AdminUpdateCourseModal from "../../Components/AdminCourse/AdminUpdateCourseModal";
import AdminCourseUserModal from "../../Components/AdminCourse/AdminCourseUserModal";
import { Spinner } from "react-bootstrap";

export default function AdminUser() {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [maKhoaHocModal, setMaKhoaHocModal] = useState("");
  const [offsetPagination, setOffsetPagination] = useState(0);
  const [addUpdateStatus, setAddUpdateStatus] = useState(true); //true:add, false: update

  const { danhSachKhoaHoc, courseLoading } = useSelector(
    (state) => state.CourseReducer
  );
  useEffect(() => {
    dispatch(getCourseListApi());
    dispatch(layDanhMucKhoaHocApi());
    dispatch(getUserListApi());
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_LOADING" });
    };
  }, []);

  const handleChangeInput = (event) => {
    let { value } = event.target;
    setSearchValue(value);
  };
  //Pagination - Handle PageCount of CourseList
  let pageCount = Math.ceil(danhSachKhoaHoc.length / 10);

  //Handle which page for request for separate page, offset is value of handlePageClick return from Pagination
  const handlePageClick = (offset) => {
    setOffsetPagination(offset.selected);
  };

  const getUserCourseStatus = (maKhoaHoc) => {
    dispatch(getUserListWaitingApi(maKhoaHoc));
    dispatch(getUserListApprovedApi(maKhoaHoc));
    dispatch(getUserListNotRegisterApi(maKhoaHoc));
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
    let danhSachKhoaHocUse = [...danhSachKhoaHoc];
    return danhSachKhoaHocUse
      .splice(offsetPagination * 10, 10)
      .map((course, index) => {
        return (
          <tr key={index}>
            <th>{offsetPagination * 10 + index + 1}</th>
            <th>{course.maKhoaHoc}</th>
            <th>{course.tenKhoaHoc}</th>
            <th>{course.nguoiTao.hoTen}</th>
            <th>{course.ngayTao}</th>
            <th>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</th>
            <th className="text-right">
              <button
                className="btn btn-primary mr-3"
                data-toggle="modal"
                data-target="#UserCourseModal"
                onClick={() => {
                  setMaKhoaHocModal(course);
                  getUserCourseStatus(course.maKhoaHoc);
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
                  setMaKhoaHocModal(course);
                }}
              >
                S???a
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  // deleteCourse(course.maKhoaHoc);
                }}
              >
                X??a
              </button>
            </th>
          </tr>
        );
      });
  };
  //render user list whtn search key is enable
  const renderUserSearchList = () => {
    let courseSearch = danhSachKhoaHoc.filter(
      (KH) =>
        KH.tenKhoaHoc.toLowerCase().includes(searchValue.toLowerCase()) ||
        KH.nguoiTao.hoTen.toLowerCase().includes(searchValue.toLowerCase())
    );
    return courseSearch.map((course, index) => {
      return (
        <tr key={index}>
          <th>{index}</th>
          <th>{course.maKhoaHoc}</th>
          <th>{course.tenKhoaHoc}</th>
          <th>{course.nguoiTao.hoTen}</th>
          <th>{course.ngayTao}</th>
          <th>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</th>
          <th className="text-right">
            <button
              className="btn btn-primary mr-3"
              data-toggle="modal"
              data-target="#UserCourseModal"
              onClick={() => {
                setMaKhoaHocModal(course);
                getUserCourseStatus(course.maKhoaHoc);
              }}
            >
              Ghi danh
            </button>
            <button
              className="btn btn-warning mr-3"
              data-toggle="modal"
              data-target="#addUserModal"
              onClick={() => {
                setMaKhoaHocModal(course);
                setAddUpdateStatus(false);
              }}
            >
              S???a
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteCourse(course.maKhoaHoc);
              }}
            >
              X??a
            </button>
          </th>
        </tr>
      );
    });
  };
  //Delete user function
  const deleteCourse = (maKhoaHoc) => {
    dispatch(deleteCourseApi(maKhoaHoc));
  };

  let body = "";
  if (courseLoading) {
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
                      Qu???n l?? kh??a h???c
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      <i className="fa fa-utensils" />
                      Qu???n l?? ng?????i d??ng
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <nav className="my-3" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="./admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Qu???n l?? kh??a h???c
                  </li>
                </ol>
              </nav>
              <h2>Danh S??ch Kh??a H???c</h2>
              {/* Button trigger modal */}
              <div className="row">
                {/* User Search Area */}
                <div className="col-8">
                  <input
                    type="text"
                    name="searchKey"
                    placeholder="T??n kh??a h???c"
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
                    Th??m Kh??a H???c
                  </button>
                </div>
              </div>
              <div className="table-responsive foodTable">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr className="user-table text-white">
                      <th>STT</th>
                      <th>M?? KH</th>
                      <th>T??n Kh??a H???c</th>
                      <th>Ng?????i t???o</th>
                      <th>Ng??y t???o</th>
                      <th>Danh m???c KH</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="tbodyFood">{handleShowDashboard()}</tbody>
                </table>
                <div className="pagination-wrapper">
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
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
            <AdminAddCourseModal />
          ) : (
            <AdminUpdateCourseModal khoaHoc={maKhoaHocModal} />
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
          <AdminCourseUserModal
            maKhoaHoc={maKhoaHocModal.maKhoaHoc}
          ></AdminCourseUserModal>
        </div>
      </div>
    );
  }

  return <>{body}</>;
}
