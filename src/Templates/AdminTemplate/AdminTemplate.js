import React, { Fragment } from "react";
import { Route } from "react-router";
import AdminHeader from "../../Components/Header/AdminHeader";

export default function HomeTemplate(props) {
  return (
    <Fragment>
      {/* <Header></Header>
      <Route exact path={path} component={component}></Route> */}
      <Route
        path={props.path}
        exact
        render={(propsRoute) => {
          return (
            <Fragment>
              <AdminHeader{...propsRoute}></AdminHeader>
              <props.component {...propsRoute}></props.component>
            </Fragment>
          );
        }}
      ></Route>
    </Fragment>
  );
}
