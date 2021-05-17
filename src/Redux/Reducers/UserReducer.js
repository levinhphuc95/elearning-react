import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";
import {
  CAP_NHAT_THONG_TIN_NGUOI_DUNG,
  DANG_XUAT_TAI_KHOAN,
  LAY_THONG_TIN_TAI_KHOAN,
  XU_LY_DANG_NHAP_THANH_CONG,
} from "./../Constants/eLearningConst";

// let tenDN = "";
// let maLoaiND = "";
let tk = "";

if (localStorage.getItem(USER_LOGIN)) {
  let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  // tenDN = userLogin.hoTen;
  // maLoaiND = userLogin.maLoaiNguoiDung;
  tk = userLogin.taiKhoan;
}
const initialState = {
  // tenDangNhap: tenDN,
  // maLoaiNguoiDung: maLoaiND,
  taiKhoan: tk,
  thongTinTaiKhoan: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case XU_LY_DANG_NHAP_THANH_CONG: {
      return { ...state, taiKhoan: action.taiKhoan };
    }
    case DANG_XUAT_TAI_KHOAN: {
      console.log("dangxuat");
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(ACCESS_TOKEN);
      return {
        ...state,
        // tenDangNhap: "",
        // maLoaiND: "",
        taiKhoan: "",
        thongTinTaiKhoan: {},
      };
    }
    case LAY_THONG_TIN_TAI_KHOAN: {
      return { ...state, thongTinTaiKhoan: action.thongTinTaiKhoan };
    }
    case CAP_NHAT_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinTaiKhoan: action.thongTinTaiKhoanCapNhat };
    }
    default:
      return state;
  }
};
