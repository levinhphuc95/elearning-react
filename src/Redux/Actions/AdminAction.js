import axios from "axios";
import {
  LAY_DANH_SACH_KHOA_HOC_CHO_XAC_THUC,
  LAY_DANH_SACH_KHOA_HOC_CHUA_GHI_DANH,
  LAY_DANH_SACH_KHOA_HOC_DA_XAC_THUC,
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG,
  LAY_DANH_SACH_NGUOI_DUNG_CHUA_GHI_DANH,
  LAY_DANH_SACH_NGUOI_DUNG_CHO_XAC_THUC,
  LAY_DANH_SACH_NGUOI_DUNG_DA_XAC_THUC,
} from "./../Constants/eLearningConst";
import { USER_LOGIN } from "./../../util/setting";
import { getCourseListApi } from "./eLearningAction";

let taiKhoan = "";
let token = "";
if (localStorage.getItem(USER_LOGIN)) {
  let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  taiKhoan = userLogin.taiKhoan;
  token = userLogin.accessToken;
}
// Get info
export const getUserListApi = () => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP08`,
        method: "GET",
      });
      dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG,
        danhSachNguoiDung: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getUserListSpreadPageApi = (page) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP08&page=${page}&pageSize=10`,
        method: "GET",
      });
      dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG,
        danhSachNguoiDungPhanTrang: result.data,
      });
      // console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
};
// CRUD Users
export const deleteUserApi = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUserListApi());
    } catch (err) {
      console.log(err);
    }
  };
};
export const addUserApi = (data) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUserListApi());
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateUserApi = (data) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn
/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "PUT",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUserListApi());
    } catch (err) {
      console.log(err);
    }
  };
};
// Handle Course Register by User
export const getCourseListWaitingApi = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
        method: "POST",
        data: { taiKhoan: taiKhoan },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LAY_DANH_SACH_KHOA_HOC_CHO_XAC_THUC,
        danhSachKhoaHocChoXacThuc: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getCourseListApprovedApi = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
        method: "POST",
        data: { taiKhoan: taiKhoan },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LAY_DANH_SACH_KHOA_HOC_DA_XAC_THUC,
        danhSachKhoaHocDaXacThuc: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getCourseListNotRegisterApi = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh`,
        method: "POST",
        data: { taiKhoan: taiKhoan },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LAY_DANH_SACH_KHOA_HOC_CHUA_GHI_DANH,
        danhSachKhoaHocChuaGhiDanh: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const approveCourseRegisterApi = (data) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCourseListWaitingApi(data.taiKhoan));
      dispatch(getCourseListApprovedApi(data.taiKhoan));
      dispatch(getUserListWaitingApi(data.maKhoaHoc));
      dispatch(getUserListApprovedApi(data.maKhoaHoc));
      alert(result.data);
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteCourseRegisterApi = (data) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCourseListWaitingApi(data.taiKhoan));
      dispatch(getCourseListApprovedApi(data.taiKhoan));
      dispatch(getUserListWaitingApi(data.maKhoaHoc));
      dispatch(getUserListApprovedApi(data.maKhoaHoc));
      alert(result.data);
    } catch (err) {
      console.log(err);
    }
  };
};
// CRUD courses
export const addCourseApi = (data) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.picture) {
        let frm = new FormData();
        frm.append("file", data.picture);
        frm.append("tenKhoaHoc", result.data.tenKhoaHoc);
        let result1 = await axios({
          url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`,
          method: "POST",
          data: frm,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(result1.data);
      }
      // console.log(result.data);
      dispatch(getCourseListApi());
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateCourseApi = (data) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHoc`,
        method: "PUT",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.picture) {
        let frm = new FormData();
        frm.append("file", data.picture);
        frm.append("tenKhoaHoc", result.data.tenKhoaHoc);
        let result1 = await axios({
          url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`,
          method: "POST",
          data: frm,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(result1.data);
      }
      dispatch(getCourseListApi());
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteCourseApi = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCourseListApi());
    } catch (err) {
      console.log(err);
    }
  };
};
// Handle User Registered by Course
export const getUserListNotRegisterApi = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`,
        method: "POST",
        data: { maKhoaHoc: maKhoaHoc },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG_CHUA_GHI_DANH,
        danhSachNguoiDungChuaGhiDanh: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getUserListWaitingApi = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
        method: "POST",
        data: { maKhoaHoc: maKhoaHoc },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG_CHO_XAC_THUC,
        danhSachNguoiDungChoXacThuc: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getUserListApprovedApi = (maKhoaHoc) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
        method: "POST",
        data: { maKhoaHoc: maKhoaHoc },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG_DA_XAC_THUC,
        danhSachNguoiDungDaGhiDanh: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
