/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { approveCourseRegisterApi } from "../../Redux/Actions/AdminAction";

export default function AdminCourseSearchUser(props) {
  const [searchValue, setSearchValue] = useState("");
  const { danhSachNguoiDungChuaGhiDanh } = useSelector(
    (state) => state.AdminUserReducer
  );
  const dispatch = useDispatch();

  const approveCourseRegister = () => {
    let nguoiDung = danhSachNguoiDungChuaGhiDanh.find(
      (item) => item.hoTen === searchValue
    );
    let data = { maKhoaHoc: props.maKhoaHoc, taiKhoan: nguoiDung.taiKhoan };
    console.log(data);
    dispatch(approveCourseRegisterApi(data));
  };

  return (
    <div className="row">
      <div style={{ width: 500 }} className="col-10">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={danhSachNguoiDungChuaGhiDanh?.map((option) => option.hoTen)}
          onChange={(e, value) => {
            setSearchValue(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tìm kiếm người dùng chưa ghi danh"
              margin="normal"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className="col-2 text-center align-text-center d-flex">
        <button
          className="btn btn-primary m-auto"
          onClick={approveCourseRegister}
        >
          Ghi danh
        </button>
      </div>
    </div>
  );
}
