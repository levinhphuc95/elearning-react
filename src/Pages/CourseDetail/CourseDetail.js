import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  dangKyKhoaHocApi,
  layChiTietKhoaHocApi,
  huyDangKyKhoaHocApi,
} from "../../Redux/Actions/eLearningAction";
import { getUserInfoApi } from "./../../Redux/Actions/UserAction";

export default function CourseDetail(props) {
  const { chiTietKhoaHoc } = useSelector((state) => state.CourseReducer);
  const { thongTinTaiKhoan } = useSelector((state) => state.UserReducer);
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
              {thongTinTaiKhoan.chiTietKhoaHocGhiDanh.findIndex(
                (item) => item.maKhoaHoc === props.match.params.maKhoaHoc
              ) !== -1 ? (
                <NavLink
                  className="courseDetail_content_button"
                  type="button"
                  to="/"
                  onClick={() => {
                    dispatch(
                      huyDangKyKhoaHocApi(
                        chiTietKhoaHoc.maKhoaHoc,
                        thongTinTaiKhoan.taiKhoan
                      )
                    );
                  }}
                >
                  HỦY ĐĂNG KÝ
                </NavLink>
              ) : (
                <NavLink
                  className="courseDetail_content_button"
                  type="button"
                  to="/"
                  onClick={() => {
                    dispatch(
                      dangKyKhoaHocApi(
                        chiTietKhoaHoc.maKhoaHoc,
                        thongTinTaiKhoan.taiKhoan
                      )
                    );
                  }}
                >
                  ĐĂNG KÝ
                </NavLink>
              )}
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
