import { USER_LOGIN } from "../../util/setting";
import { XU_LY_DANG_NHAP_THANH_CONG } from "./../Constants/eLearningConst";

let tenDN = "";

if (localStorage.getItem(USER_LOGIN)) {
  let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  tenDN = userLogin.hoTen;
}
const initialState = {
  tenDangNhap: tenDN,
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case XU_LY_DANG_NHAP_THANH_CONG: {
      return { ...state, tenDangNhap: action.tenDangNhap };
    }
    default:
      return state;
  }
};
