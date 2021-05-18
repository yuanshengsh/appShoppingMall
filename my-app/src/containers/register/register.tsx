import React, { Component } from 'react'
//   import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
//   import Logo from '../../components/logo/logo'
import { Form, Input, Button, message, Card } from 'antd';
import axios from "axios";
import './register.less';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: '', //账号
      // pwd: '', // 密码
      // pwdConfirm: '', // 确认密码
      // type: 'worker', // 用户类型 默认求职者
    }
  }

  onFinish = (values: any) => {
    console.log('Success:', values);
    const { mobile, name, password, captcha } = values;
    const params = {
      mobile: Number(mobile),
      name,
      password,
      captcha
    }
    axios.post('api/user/register', params)
      .then(res => {
        console.log('res', res)
        if (res.data.errno === 0) {
          // 注册成功
          message.success('注册成功');
          // // 设置cookie，第三个参数的意思是所有页面都能用这个cookie
          // const { access_token, expires_at } = res.data;
          // cookie.save('Authorization', access_token, { path: "/", expires_at })
        } else {
          message.error('注册失败，请重试');
        }
      })
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div className="page-register">
        <Card style={{ width: '50%' }}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="手机号码"
              name="mobile"
              rules={[{ required: true, message: '请输入手机号码' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="用户名"
              name="name"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              rules={[{ required: true, message: '请输入确认密码!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="图片验证码"
              name="pic"
              rules={[{ required: true, message: '请输入图片验证码!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="手机验证码"
              name="captcha"
              rules={[{ required: true, message: '请输入手机验证码!' }]}
            >
              <Input />
              {/* <Button type="primary" htmlType="submit">
              获取验证码
            </Button> */}
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                注册
            </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Register