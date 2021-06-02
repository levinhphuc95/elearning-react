import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import AdminHeader from "../../Components/Header/AdminHeader";

export default function AdminTemplate(props) {
  const { taiKhoan } = useSelector((state) => state.UserReducer);
  if (taiKhoan) {
    return (
      <Fragment>
        <Route
          path={props.path}
          exact
          render={(propsRoute) => {
            return (
              <Fragment>
                <AdminHeader {...propsRoute}></AdminHeader>
                <props.component {...propsRoute}></props.component>
              </Fragment>
            );
          }}
        ></Route>
      </Fragment>
    );
  } else {
    return <Redirect to="/login/sign-in"></Redirect>;
  }
}
