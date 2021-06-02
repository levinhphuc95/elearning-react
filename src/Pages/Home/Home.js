import React, { useEffect } from "react";
import Carousel from "../../Components/Carousel/Carousel";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCourseListApi } from "./../../Redux/Actions/eLearningAction";
import CourseItem from "../../Components/CourseItem.js/CourseItem";
import { getUserInfoApi } from "../../Redux/Actions/UserAction";
import { Spinner } from "react-bootstrap";

export default function Home() {
  const { danhSachKhoaHoc, courseLoading } = useSelector(
    (state) => state.CourseReducer
  );
  const { taiKhoan, userLoading } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const renderCourseList = () => {
    return danhSachKhoaHoc.slice(0, 8).map((item, index) => {
      return <CourseItem item={item} index={index}></CourseItem>;
    });
  };
  const getCourseList = () => {
    dispatch(getCourseListApi());
  };
  useEffect(() => {
    getCourseList();
    if (taiKhoan !== "") {
      dispatch(getUserInfoApi(taiKhoan));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_LOADING" });
    };
  }, []);

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
      <div>
        <Carousel></Carousel>
        <div className="container mt-5">
          <h3>Các khóa học mới nhất</h3>
          <div className="row">{renderCourseList()}</div>
        </div>
      </div>
    );
  }

  return <>{body}</>;
}
