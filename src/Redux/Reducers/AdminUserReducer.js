import {
  LAY_DANH_SACH_NGUOI_DUNG,
  LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG,
  LAY_DANH_SACH_KHOA_HOC_CHO_XAC_THUC,
  LAY_DANH_SACH_KHOA_HOC_DA_XAC_THUC,
  LAY_DANH_SACH_KHOA_HOC_CHUA_GHI_DANH,
  LAY_DANH_SACH_NGUOI_DUNG_CHUA_GHI_DANH,
  LAY_DANH_SACH_NGUOI_DUNG_CHO_XAC_THUC,
  LAY_DANH_SACH_NGUOI_DUNG_DA_XAC_THUC
} from "../Constants/eLearningConst";

const initialState = {
  danhSachNguoiDung: [],
  danhSachNguoiDungPhanTrang: [],
  pageCount: "",
  danhSachKhoaHocChoXacThuc: [],
  danhSachKhoaHocDaXacThuc: [],
  danhSachKhoaHocChuaGhiDanh: [],
  danhSachNguoiDungChuaGhiDanh: [],
  danhSachNguoiDungChoXacThuc: [],
  danhSachNguoiDungDaGhiDanh:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_NGUOI_DUNG:
      return {
        ...state,
        danhSachNguoiDung: action.danhSachNguoiDung,
        pageCount: Math.ceil(state.danhSachNguoiDung.length / 10),
      };

    case LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG:
      return {
        ...state,
        danhSachNguoiDungPhanTrang: action.danhSachNguoiDungPhanTrang,
      };

    case LAY_DANH_SACH_KHOA_HOC_CHO_XAC_THUC:
      return {
        ...state,
        danhSachKhoaHocChoXacThuc: action.danhSachKhoaHocChoXacThuc,
      };

    case LAY_DANH_SACH_KHOA_HOC_DA_XAC_THUC:
      return {
        ...state,
        danhSachKhoaHocDaXacThuc: action.danhSachKhoaHocDaXacThuc,
      };

    case LAY_DANH_SACH_KHOA_HOC_CHUA_GHI_DANH:
      return {
        ...state,
        danhSachKhoaHocChuaGhiDanh: action.danhSachKhoaHocChuaGhiDanh,
      };
    case LAY_DANH_SACH_NGUOI_DUNG_CHUA_GHI_DANH:
      return {
        ...state,
        danhSachNguoiDungChuaGhiDanh: action.danhSachNguoiDungChuaGhiDanh,
      };
    case LAY_DANH_SACH_NGUOI_DUNG_CHO_XAC_THUC:
      return {
        ...state,
        danhSachNguoiDungChoXacThuc: action.danhSachNguoiDungChoXacThuc,
      };
    case LAY_DANH_SACH_NGUOI_DUNG_DA_XAC_THUC:
      return {
        ...state,
        danhSachNguoiDungDaGhiDanh: action.danhSachNguoiDungDaGhiDanh,
      };

    default:
      return state;
  }
};
