import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Menu } from 'antd';
import  { useState, useEffect } from 'react';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

// 配合applyMiddleware解决redux异步问题
import thunk from 'redux-thunk'

// createStore接受reducer生成stote compose合并生成store其他数据 applyMiddleware接受thunk解决redux异步问题
import {createStore, compose, applyMiddleware} from 'redux'

// Provider负责传递store
import {Provider} from 'react-redux'

// 引入react-router-dom各种路由元素
import {BrowserRouter as Router, Route} from 'react-router-dom'

// 引入判断是否登录组件
import CheckLogin from './components/checkLogin/CheckLogin'

// 引入页面路由组件
import Login from './containers/login/login'
import Register from './containers/register/register'

// 生成store
import reducer from './reducer'
// const current = 'index';
const store = createStore(reducer, compose(
    applyMiddleware(thunk), //解决redux异步问题
    window.devToolsExtension ? window.devToolsExtension() : f => f // chrome控制台redux工具
));
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Provider store={store}>
  </Provider> 
  </React.StrictMode>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
