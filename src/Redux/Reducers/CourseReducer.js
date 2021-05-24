import {
  GET_COURSE_LIST,
  LAY_DANH_MUC_KHOA_HOC,
  LAY_KHOA_HOC_THEO_DANH_MUC,
  LAY_KHOA_HOC_THEO_TIM_KIEM,
  LAY_CHI_TIET_KHOA_HOC,
} from "../Constants/eLearningConst";

const initialState = {
  danhSachKhoaHoc: [],
  danhMucKhoaHoc: [],
  khoaHocTheoDanhMuc: [],
  khoaHocTheoTimKiem: [],
  chiTietKhoaHoc: [],
  courseLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_LIST: {
      return {
        ...state,
        danhSachKhoaHoc: action.courseList,
        courseLoading: false,
      };
    }
    case LAY_DANH_MUC_KHOA_HOC: {
      return {
        ...state,
        danhMucKhoaHoc: action.danhMucKhoaHoc,
        courseLoading: false,
      };
    }
    case LAY_KHOA_HOC_THEO_DANH_MUC: {
      return {
        ...state,
        khoaHocTheoDanhMuc: action.khoaHocTheoDanhMuc,
        courseLoading: false,
      };
    }
    case LAY_KHOA_HOC_THEO_TIM_KIEM: {
      return {
        ...state,
        khoaHocTheoTimKiem: action.khoaHocTheoTimKiem,
        courseLoading: false,
      };
    }
    case LAY_CHI_TIET_KHOA_HOC: {
      return {
        ...state,
        chiTietKhoaHoc: action.chiTietKhoaHoc,
        courseLoading: false,
      };
    }
    case "RESET_LOADING":
      return { ...state, courseLoading: true };
    default:
      return { ...state };
  }
};
