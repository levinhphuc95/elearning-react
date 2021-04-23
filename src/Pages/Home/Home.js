import React, { useEffect } from "react";
import Carousel from "../../Components/Carousel/Carousel";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCourseListApi } from "./../../Redux/Actions/eLearningAction";
import Footer from "../../Components/Footer/Footer";
import { NavLink } from "react-router-dom";
import CourseItem from "../../Components/CourseItem.js/CourseItem";

export default function Home() {
  const { danhSachKhoaHoc } = useSelector((state) => state.CourseReducer);
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
  }, []);
  return (
    <div>
      <Carousel></Carousel>
      <div className="container mt-5">
        <h3>Các khóa học mới nhất</h3>
        <div className="row">{renderCourseList()}</div>
      </div>
    </div>
  );
}
