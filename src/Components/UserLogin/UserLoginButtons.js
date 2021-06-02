import React from "react";
import { NavLink } from "react-router-dom";

export default function UserLoginButtons() {
  return (
    <div>
      <NavLink className="nav_button_1" role="button" to="/login/sign-in">
        Đăng nhập
      </NavLink>
      <NavLink className="nav_button_2" role="button" to="/login/sign-up">
        Đăng kí
      </NavLink>
    </div>
  );
}
