import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import {
  dangKyKhoaHocApi,
  layChiTietKhoaHocApi,
  huyDangKyKhoaHocApi,
} from "../../Redux/Actions/eLearningAction";
import { getUserInfoApi } from "./../../Redux/Actions/UserAction";

export default function CourseDetail(props) {
  const { chiTietKhoaHoc, courseLoading } = useSelector(
    (state) => state.CourseReducer
  );
  const { thongTinTaiKhoan, taiKhoan, userLoading } = useSelector(
    (state) => state.UserReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (taiKhoan !== "") {
      dispatch(getUserInfoApi(taiKhoan));
      dispatch(layChiTietKhoaHocApi(props.match.params.maKhoaHoc));
    } else {
      history.push("/login/sign-in");
    }
  }, [props.match.params.maKhoaHoc]);

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
              {thongTinTaiKhoan.chiTietKhoaHocGhiDanh?.findIndex(
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
    );
  }

  return <>{body}</>;
}
