import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function HomeTemplate(props) {
  return (
    <Fragment>
      <Route
        path={props.path}
        exact
        render={(propsRoute) => {
          return (
            <Fragment>
              <Header {...propsRoute}></Header>
              <props.component {...propsRoute}></props.component>
              <Footer {...propsRoute}></Footer>
            </Fragment>
          );
        }}
      ></Route>
    </Fragment>
  );
}
