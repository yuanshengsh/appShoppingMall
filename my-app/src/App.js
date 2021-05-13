import logo from './logo.svg';
import './App.css';
import { Menu } from 'antd';
import { BarcodeOutlined, AppstoreOutlined, HomeOutlined , PictureOutlined} from '@ant-design/icons';
import  { useState, useEffect } from 'react';

function App() {
  const [current, setCurrent] = useState('index');
  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <div className="App">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="index" icon={<HomeOutlined />}>
          首页
        </Menu.Item>
        <Menu.Item key="picture" icon={<PictureOutlined />}>
          我的图库
        </Menu.Item>
        <Menu.Item key="orders" icon={<BarcodeOutlined />}>
          喷印下单
        </Menu.Item>
        <Menu.Item key="login">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            登陆
          </a>
        </Menu.Item>
        <Menu.Item key="register">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            注册
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default App;
