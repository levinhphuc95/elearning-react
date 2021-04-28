import { Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import CourseList from "./Pages/CourseList/CourseList";
import CourseSearch from "./Pages/CourseSearch/CourseSearch";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import UserCourse from "./Pages/UserCourse/UserCourse";
import "./Assets/sass/style.scss";
import Login from "./Pages/Login/Login";
import HomeTemplate from "./Templates/HomeTemplate/HomeTemplate";
import UserTemplate from "./Templates/UserTemplate/UserTemplate";
//Cấu hình chuyển hướng trên Route
import { createBrowserHistory } from "history";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <HomeTemplate exact path="/home" component={Home}></HomeTemplate>
          <HomeTemplate
            exact
            path="/danhmuckhoahoc/:maDanhMucKhoaHoc"
            component={CourseList}
          ></HomeTemplate>
          <HomeTemplate
            exact
            path="/timkiemkhoahoc/:searchKey"
            component={CourseSearch}
          ></HomeTemplate>
          <HomeTemplate
            exact
            path="/chitiet/:maKhoaHoc"
            component={CourseDetail}
          ></HomeTemplate>
          <UserTemplate
            exact
            path="/capnhatthongtin/:taiKhoan"
            component={UpdateProfile}
          ></UserTemplate>
          <UserTemplate
            exact
            path="/khoahoccuatoi"
            component={UserCourse}
          ></UserTemplate>
          <Route exact path="/login/:signUpMode" component={Login}></Route>
          <HomeTemplate exact path="/" component={Home}></HomeTemplate>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
