import axios from "axios";
import { history } from "../../App";
import {
  CAP_NHAT_THONG_TIN_NGUOI_DUNG,
  LAY_THONG_TIN_TAI_KHOAN,
  XU_LY_DANG_NHAP_THANH_CONG,
} from "./../Constants/eLearningConst";
import { ACCESS_TOKEN, USER_LOGIN } from "./../../util/setting";

let taiKhoan = "";
let token = "";
if (localStorage.getItem(USER_LOGIN)) {
  let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  taiKhoan = userLogin.taiKhoan;
  token = userLogin.accessToken;
}
export const registerApi = (userRegister) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy`,
        method: "POST",
        data: userRegister,
      });
      alert("Đăng ký thành công, vui lòng đăng nhập để tiếp tục sử dụng");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap`,
        method: "POST",
        data: userLogin,
      });
      dispatch({
        type: XU_LY_DANG_NHAP_THANH_CONG,
        taiKhoan: result.data.taiKhoan,
      });
      localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
      localStorage.setItem(
        ACCESS_TOKEN,
        JSON.stringify(result.data.accessToken)
      );
      dispatch(getUserInfoApi(result.data.taiKhoan));
      alert("Đăng nhập thành công");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserInfoApi = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
        method: "POST",
        data: { taiKhoan: taiKhoan },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: LAY_THONG_TIN_TAI_KHOAN,
        thongTinTaiKhoan: result.data,
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUserInfoApi = (info) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "PUT",
        data: info,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data);
      dispatch({
        type: CAP_NHAT_THONG_TIN_NGUOI_DUNG,
        thongTinTaiKhoanCapNhat: result.data,
      });
      dispatch(
        loginApi({
          taiKhoan: result.data.taiKhoan,
          matKhau: result.data.matKhau,
        })
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};
