import {
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG,
  LAY_DANH_SACH_KHOA_HOC_CHO_XAC_THUC,
  LAY_DANH_SACH_KHOA_HOC_DA_XAC_THUC,
  LAY_DANH_SACH_KHOA_HOC_CHUA_GHI_DANH,
  LAY_DANH_SACH_NGUOI_DUNG_CHUA_GHI_DANH,
  LAY_DANH_SACH_NGUOI_DUNG_CHO_XAC_THUC,
  LAY_DANH_SACH_NGUOI_DUNG_DA_XAC_THUC,
} from "../Constants/eLearningConst";

const initialState = {
  adminLoading: true,
  danhSachNguoiDung: [],
  danhSachNguoiDungPhanTrang: [],
  pageCount: "",
  danhSachKhoaHocChoXacThuc: [],
  danhSachKhoaHocDaXacThuc: [],
  danhSachKhoaHocChuaGhiDanh: [],
  danhSachNguoiDungChuaGhiDanh: [],
  danhSachNguoiDungChoXacThuc: [],
  danhSachNguoiDungDaGhiDanh: [],
  adminLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_NGUOI_DUNG:
      return {
        ...state,
        danhSachNguoiDung: action.danhSachNguoiDung,
        pageCount: Math.ceil(state.danhSachNguoiDung.length / 10),
        adminLoading: false,
      };

    case LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG:
      return {
        ...state,
        danhSachNguoiDungPhanTrang: action.danhSachNguoiDungPhanTrang,
        adminLoading: false,
      };

    case LAY_DANH_SACH_KHOA_HOC_CHO_XAC_THUC:
      return {
        ...state,
        danhSachKhoaHocChoXacThuc: action.danhSachKhoaHocChoXacThuc,
        adminLoading: false,
      };

    case LAY_DANH_SACH_KHOA_HOC_DA_XAC_THUC:
      return {
        ...state,
        danhSachKhoaHocDaXacThuc: action.danhSachKhoaHocDaXacThuc,
        adminLoading: false,
      };

    case LAY_DANH_SACH_KHOA_HOC_CHUA_GHI_DANH:
      return {
        ...state,
        danhSachKhoaHocChuaGhiDanh: action.danhSachKhoaHocChuaGhiDanh,
        adminLoading: false,
      };
    case LAY_DANH_SACH_NGUOI_DUNG_CHUA_GHI_DANH:
      return {
        ...state,
        danhSachNguoiDungChuaGhiDanh: action.danhSachNguoiDungChuaGhiDanh,
        adminLoading: false,
      };
    case LAY_DANH_SACH_NGUOI_DUNG_CHO_XAC_THUC:
      return {
        ...state,
        danhSachNguoiDungChoXacThuc: action.danhSachNguoiDungChoXacThuc,
        adminLoading: false,
      };
    case LAY_DANH_SACH_NGUOI_DUNG_DA_XAC_THUC:
      return {
        ...state,
        danhSachNguoiDungDaGhiDanh: action.danhSachNguoiDungDaGhiDanh,
        adminLoading: false,
      };
    case "RESET_LOADING":
      return { ...state, adminLoading: true };

    default:
      return state;
  }
};
