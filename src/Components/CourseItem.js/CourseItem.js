import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CourseItem(props) {
  const { thongTinNguoiDung } = useSelector((state) => state.UserReducer);
  return (
    <div className="col-xl-3 col-md-4 course__item" key={props.index}>
      <div className="card text-left mt-3">
        <NavLink
          type="button"
          to={`/chitiet/${props.item.maKhoaHoc}`}
          className="subcribe_button"
        >
          <img
            className="card-img-top"
            src={props.item.hinhAnh}
            alt="123"
            style={{ height: 180 }}
          />
          <div className="card-body" style={{ height: 150 }}>
            <h4
              className="card-title"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {props.item.tenKhoaHoc}
            </h4>
            <p className="card-text">Lượt xem: {props.item.luotXem}</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
