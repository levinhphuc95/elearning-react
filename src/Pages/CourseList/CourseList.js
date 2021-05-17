import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseItem from "../../Components/CourseItem.js/CourseItem";
import { layKhoaHocTheoDanhMucApi } from "./../../Redux/Actions/eLearningAction";

export default function CourseList(props) {
  const { khoaHocTheoDanhMuc, danhMucKhoaHoc } = useSelector(
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

  return (
    <div>
      <div className="course_list_wrapper">
        <div className="course_list_title">{renderCourseListPageTitle()}</div>
        <div className="container">
          <div className="row">{renderKhoaHocTheoDanhMuc()}</div>
        </div>
      </div>
    </div>
  );
}
