import * as React from 'react';
import './App.less';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

// 引入页面路由组件
import Login from './containers/login/login.tsx';
import Register from './containers/register/register.tsx';
import Protocol from './containers/protocol/protocol.tsx';
import Orders from './containers/orders/orders.tsx';
import Header from './components/header/Header.tsx'
// import logo from './logo.svg';
import store from './store';
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions';



if (localStorage.jwToken) {
  setAuthToken(localStorage.jwToken)
  // 解析token
  const decoded = jwt_decode(localStorage.jwToken)
  store.dispatch(setCurrentUser(decoded))
  // 检测token过期
  // 获取当前时间
  const currentTime = Date.now() / 1000;// 由毫秒转成秒
  console.log(decoded)
  console.log(currentTime)
  // 判断当前时间是否大于token中的exp时间;如果大于是为过期
  // if (decoded.exp < currentTime) {
  //   // 过期
  //   store.dispatch(logoutUser())

  //   // 退出后再跳转页面
  //   window.location.href = "/login";
  // }
}
function App(props: any) {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/protocol' component={Protocol}></Route>
          <Route path='/orders' component={Orders}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
