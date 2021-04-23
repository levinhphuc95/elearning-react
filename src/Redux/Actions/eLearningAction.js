import axios from "axios";
import {
  GET_COURSE_LIST,
  LAY_DANH_MUC_KHOA_HOC,
  LAY_KHOA_HOC_THEO_DANH_MUC,
  LAY_KHOA_HOC_THEO_TIM_KIEM,
  LAY_CHI_TIET_KHOA_HOC,
} from "../Constants/eLearningConst";

export const getCourseListApi = (MaNhom) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP08`,
        method: "GET",
      });
      dispatch({
        type: GET_COURSE_LIST,
        courseList: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const layDanhMucKhoaHocApi = () => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,
        method: "GET",
      });
      dispatch({
        type: LAY_DANH_MUC_KHOA_HOC,
        danhMucKhoaHoc: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const layKhoaHocTheoDanhMucApi = (maDanhMuc) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP08`,
        method: "GET",
      });
      dispatch({
        type: LAY_KHOA_HOC_THEO_DANH_MUC,
        khoaHocTheoDanhMuc: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const layKhoaHocTheoTimKiemApi = (tenKhoaHoc) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP08`,
        method: "GET",
      });
      dispatch({
        type: LAY_KHOA_HOC_THEO_TIM_KIEM,
        khoaHocTheoTimKiem: result.data,
      });
    } catch (err) {
      alert(err);
    }
  };
};

export const layChiTietKhoaHocApi = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
        method: "GET",
      });
      dispatch({
        type: LAY_CHI_TIET_KHOA_HOC,
        chiTietKhoaHoc: result.data,
      });
    } catch (err) {
      alert(err);
    }
  };
};
