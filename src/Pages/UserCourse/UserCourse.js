import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getCourseListApi } from "../../Redux/Actions/eLearningAction";
import { getUserInfoApi } from "../../Redux/Actions/UserAction";
import { history } from "../../App";
import { Spinner } from "react-bootstrap";

export default function CourseSearch(props) {
  const { thongTinTaiKhoan, taiKhoan, userLoading } = useSelector(
    (state) => state.UserReducer
  );
  const { danhSachKhoaHoc, courseLoading } = useSelector(
    (state) => state.CourseReducer
  );
  console.log(thongTinTaiKhoan);

  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (taiKhoan !== "") {
      dispatch(getUserInfoApi(taiKhoan));
      dispatch(getCourseListApi());
    } else {
      history.push("/login/sign-in");
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_LOADING" });
    };
  }, []);

  const handleChangeInput = (event) => {
    let { value } = event.target; //event.target là tag input đang xảy ra onchange
    //Xử lý setState
    setSearchValue(value);
  };
  const renderCourseUserPage = () => {
    let courseSearch = thongTinTaiKhoan.chiTietKhoaHocGhiDanh?.filter(
      (khoaHoc) =>
        khoaHoc.tenKhoaHoc.toLowerCase().includes(searchValue.toLowerCase())
    );
    return courseSearch?.map((course, index) => {
      let courseIndex = danhSachKhoaHoc.findIndex(
        (item) => item.maKhoaHoc === course.maKhoaHoc
      );
      return (
        <Link to={`/chitiet/${course.maKhoaHoc}`} key={index}>
          <div className="card flex-row flex-wrap">
            <div className="card-header">
              <img
                src={danhSachKhoaHoc[courseIndex]?.hinhAnh}
                alt={danhSachKhoaHoc[courseIndex]?.tenKhoaHoc}
              />
            </div>
            <div className="card-block">
              <h4 className="card-title">
                {danhSachKhoaHoc[courseIndex]?.tenKhoaHoc}
              </h4>
              <p className="card-text">{danhSachKhoaHoc[courseIndex]?.moTa}</p>
              <i>Lượt xem: {danhSachKhoaHoc[courseIndex]?.luotXem}</i>
            </div>
          </div>
        </Link>
      );
    });
  };
  let body = "";
  if (userLoading || courseLoading) {
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
      <div className="container courseSearch__wrapper">
        <div className="row mx-2 my-5">
          <h3 className="col-md-6">Danh sách khóa học đã tham gia</h3>
          <input
            type="text"
            name="searchKey"
            placeholder="Tìm khóa học đã đăng ký"
            className="col-md-6"
            onChange={handleChangeInput}
          />
        </div>
        {renderCourseUserPage()}
      </div>
    );
  }
  return <div>{body}</div>;
}
