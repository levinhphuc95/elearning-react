import axios from "axios";
import { history } from "../../App";
import { XU_LY_DANG_NHAP_THANH_CONG } from "./../Constants/eLearningConst";
import { ACCESS_TOKEN, USER_LOGIN } from "./../../util/setting";

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
        tenDangNhap: result.data.hoTen,
      });
      localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
      localStorage.setItem(
        ACCESS_TOKEN,
        JSON.stringify(result.data.accessToken)
      );
      alert("Đăng nhập thành công");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};
