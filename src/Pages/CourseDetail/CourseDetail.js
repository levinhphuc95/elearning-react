import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { layChiTietKhoaHocApi } from "../../Redux/Actions/eLearningAction";

export default function CourseDetail(props) {
  const { chiTietKhoaHoc } = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();
  console.log(chiTietKhoaHoc);

  useEffect(() => {
    dispatch(layChiTietKhoaHocApi(props.match.params.maKhoaHoc));
  }, [props.match.params.maKhoaHoc]);
  return (
    <div>
      <div className="courseDetail__wrapper">
        <div className="courseDetail_carousel">
          <div className="courseDetail_carousel_overlay"></div>
          <div className="container d-flex">
            <div className="courseDetail_content">
              <p className="courseDetail_content_title">
                {chiTietKhoaHoc.tenKhoaHoc}
              </p>
              <p className="courseDetail_content_item">
                Lượt xem: {chiTietKhoaHoc.luotXem}
              </p>
              <NavLink
                className="courseDetail_content_button"
                type="button"
                to="/"
              >
                ĐĂNG KÝ
              </NavLink>
            </div>
            <div className="courseDetail_image d-flex">
              <img src={chiTietKhoaHoc.hinhAnh} alt="" />
            </div>
          </div>
        </div>
        <div className="courseDetail__info container">
          <h1>Giới thiệu khóa học</h1>
          <p>{chiTietKhoaHoc.moTa}</p>
        </div>
      </div>
    </div>
  );
}
