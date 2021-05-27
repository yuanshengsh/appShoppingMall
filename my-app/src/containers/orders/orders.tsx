import React, { Component } from 'react'
//   import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
//   import Logo from '../../components/logo/logo'
import { Form, Input, Button, message, Card, Radio } from 'antd';
import axios from "axios";
import './orders.less';
import OrgTree from 'react-org-tree';
import ProMethod from './components/proMethod.tsx';

const horizontal = true; // true：横向  false：纵向
const collapsable = true; // true：可折叠 false：不可折叠 
const expandAll = true; // true: 全部展开 false：全部折叠 

const node = {
  id: 0,
  label: 'XXX股份有限公司',
  children: [{
    id: 1,
    label: '技术部',
    children: [{
      id: 4,
      label: '后端工程师'
    }, {
      id: 5,
      label: '前端工程师'
    }, {
      id: 6,
      label: '运维工程师'
    }]
  }, {
    id: 2,
    label: '人事部'
  }, {
    id: 3,
    label: '销售部'
  }]
}

interface OrdersState {
  craft: number | null,
}

class Orders extends Component<any, OrdersState> {
  constructor(props) {
    super(props);
    this.state = {
      craft: null, // 账号
    }
  }

  clickNode = (e, data) => {
    console.log(e)
    console.log(data)
  }

  onChange = e => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      craft: e.target.value,
    });
  };

  render() {
    const { craft } = this.state;
    return (
      <div className="page-orders">
        <ProMethod />
      </div>
    )
  }
}

export default Orders