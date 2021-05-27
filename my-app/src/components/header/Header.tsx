import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { BarcodeOutlined, AppstoreOutlined, HomeOutlined, PictureOutlined } from '@ant-design/icons';
import './Header.less';
import { connect } from 'react-redux';
import store from '../../store';
import isEmpty from '../../validation/is-empty'
import { userExit } from '../../actions/exitLogin';

type User = {
  exp?: string,
  iss?: string,
  user_id?: number,
  user_name?: string
}
const Header = (props) => {
  const location = useLocation();
  console.log(location.pathname);
  const [current, setCurrent] = useState('/index');
  const [user, setUser]: [User, any] = useState({});
  const [isLogin, setIsLogin] = useState({});


  const initData = () => {
    setUser(store.getState().user);
    setIsLogin(!isEmpty(store.getState().user));
  }

  useEffect(() => {
    store.subscribe(() => {
      console.log(store.getState())
      initData()
    })
    initData();
    console.log(location.pathname, 'pathname');
    setCurrent(`/${location.pathname}`)
  }, [location]);

  const handleClick = e => {
    setCurrent(e.key);
  };

  const exit = () => {
    const handle = props;
    handle.userExit();
  };

  return (
    <div className="container-header">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="/index" icon={<HomeOutlined />}>
          <Link to='/'>首页</Link>
        </Menu.Item>
        <Menu.Item key="/picture" icon={<PictureOutlined />}>
          <Link to='/picture'>我的图库</Link>
        </Menu.Item>
        <Menu.Item key="/orders" icon={<BarcodeOutlined />}>
          <Link to='/orders'>喷印下单</Link>
        </Menu.Item>
        {!isLogin && (
          <Menu.Item key="/login">
            <Link to='/login'>登陆</Link>
          </Menu.Item>
        )}
        {!isLogin && (
          <Menu.Item key="/register">
            <Link to='/register'>[注册]</Link>
          </Menu.Item>
        )}
        {isLogin && (
          <span>{user.user_name}</span>
        )}
        {isLogin && (
          <Menu.Item key="/register">
            <div onClick={() => exit()}
              onKeyDown={() => exit()}
              role="button"
              tabIndex={0}
            >[退出]</div>
          </Menu.Item>
        )}
      </Menu>
    </div >
  );
};

// 将返回的状态转换成属性
const mapStateToProps = (state) => ({
  // auth 在reducers下定义的一大的reducers
  // auth :state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { userExit })(Header);
