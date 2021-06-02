import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { layKhoaHocTheoTimKiemApi } from "./../../Redux/Actions/eLearningAction";

export default function CourseSearch(props) {
  const { khoaHocTheoTimKiem, courseLoading } = useSelector(
    (state) => state.CourseReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layKhoaHocTheoTimKiemApi(props.match.params.searchKey));
  }, [props.match.params.searchKey]);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_LOADING" });
    };
  }, []);

  const renderCourseSearchPage = () => {
    return khoaHocTheoTimKiem.map((item, index) => {
      return (
        <NavLink to={`/chitiet/${item.maKhoaHoc}`} key={index}>
          <div className="card flex-row flex-wrap">
            <div className="card-header">
              <img src={item.hinhAnh} alt={item.tenKhoaHoc} />
            </div>
            <div className="card-block">
              <h4 className="card-title">{item.tenKhoaHoc}</h4>
              <p className="card-text">{item.moTa}</p>

              <i>Lượt xem: {item.luotXem}</i>
            </div>
          </div>
        </NavLink>
      );
    });
  };

  const renderTitleSearchPage = () => {
    return (
      <h1>
        Tìm thấy {khoaHocTheoTimKiem.length} khóa học với từ khóa '
        {props.match.params.searchKey}'
      </h1>
    );
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
      <div className="container courseSearch__wrapper">
        {renderTitleSearchPage()}
        {renderCourseSearchPage()}
      </div>
    );
  }

  return <>{body}</>;
}
