import  React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { BarcodeOutlined, AppstoreOutlined, HomeOutlined , PictureOutlined} from '@ant-design/icons';

const Header = () => {
  const [current, setCurrent] = useState('index');
  const handleClick = e => {
    setCurrent(e.key);
  };
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="index" icon={<HomeOutlined />}>
          <Link to='/'>首页</Link>
        </Menu.Item>
        <Menu.Item key="picture" icon={<PictureOutlined />}>
          <Link to='/picture'>我的图库</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<BarcodeOutlined />}>
          <Link to='/orders'>喷印下单</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to='/login'>登陆</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to='/register'>[注册]</Link>
        </Menu.Item>
      </Menu>
    );
};

export default Header;