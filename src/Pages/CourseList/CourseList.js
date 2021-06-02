import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CourseItem from "../../Components/CourseItem.js/CourseItem";
import { layKhoaHocTheoDanhMucApi } from "./../../Redux/Actions/eLearningAction";

export default function CourseList(props) {
  const { khoaHocTheoDanhMuc, danhMucKhoaHoc, courseLoading } = useSelector(
    (state) => state.CourseReducer
  );
  const dispatch = useDispatch();

  const renderKhoaHocTheoDanhMuc = () => {
    return khoaHocTheoDanhMuc.map((item, index) => {
      return <CourseItem item={item} index={index}></CourseItem>;
    });
  };

  const renderCourseListPageTitle = () => {
    let index = danhMucKhoaHoc?.findIndex(
      (KH) => KH.maDanhMuc === props.match.params.maDanhMucKhoaHoc
    );
    return khoaHocTheoDanhMuc !== [] ? (
      <p>{danhMucKhoaHoc[index]?.tenDanhMuc}</p>
    ) : (
      <p>Chưa có khóa học trong danh mục này</p>
    );
  };

  useEffect(() => {
    dispatch(layKhoaHocTheoDanhMucApi(props.match.params.maDanhMucKhoaHoc));
  }, [props.match.params.maDanhMucKhoaHoc]);

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
      <div className="course_list_wrapper">
        <div className="course_list_title">{renderCourseListPageTitle()}</div>
        <div className="container">
          <div className="row">{renderKhoaHocTheoDanhMuc()}</div>
        </div>
      </div>
    );
  }

  return <>{body}</>;
}
