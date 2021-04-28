import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { layKhoaHocTheoTimKiemApi } from "./../../Redux/Actions/eLearningAction";

export default function CourseSearch(props) {
  const { khoaHocTheoTimKiem } = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layKhoaHocTheoTimKiemApi(props.match.params.searchKey));
  }, [props.match.params.searchKey]);

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

  return (
    <div>
      <div className="container courseSearch__wrapper">
        {renderTitleSearchPage()}
        {renderCourseSearchPage()}
      </div>
    </div>
  );
}
