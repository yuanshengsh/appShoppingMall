import React, { Component } from 'react'
import { Form, Input, Button, message, Card, Row, Col } from 'antd';
import axios from "axios";
import './register.less';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

type RegisterState = {
  mobile: string,
  name: string,
  password: string,
  confirmPassword: string,
  captcha: string,
  pic: string,
}

class Register extends Component<any, RegisterState> {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '', // 账号
      name: '', // 密码
      password: '', // 密码
      confirmPassword: '', // 确认密码
      captcha: '',
      pic: ''
    }
    const { confirmPassword, pic } = this.state
    console.log(confirmPassword);
    console.log(pic);
  }

  onFinish = (values: any) => {
    console.log('Success:', values);
    const { mobile, name, password, captcha } = this.state;
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

  getCaptcha = () => {
    const { mobile } = this.state;
    axios.get(`api/captcha/pic?mobile=${mobile}`)
      .then(res => {
        if (res.data.errno === 0) {
          console.log('1111');
        } else {
          message.error('注册失败，请重试');
        }
      })
  };

  onChange = (allFields) => {
    console.log(allFields, 'allFields');
    if (allFields) {
      const obj = {}
      allFields.forEach(filed => {
        obj[filed.name] = filed.value
      });
      this.setState({ ...obj })
    }
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
            onFieldsChange={(_, allFields) => {
              this.onChange(allFields);
            }}
          >
            <Form.Item
              label="手机号码"
              name="mobile"
              rules={[{ required: true, message: '请输入11位手机号码' }]}
              extra="请输入11位手机号码"
            >
              <Input
              />
            </Form.Item>
            <Form.Item
              label="用户名"
              name="name"
              rules={[{ required: true, message: '请输入用户名' }]}
              extra="请输入用户名"
            >
              <Input
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
              extra="请输入密码"
            >
              <Input.Password
              />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              rules={[{ required: true, message: '请输入确认密码!' }]}
              extra="请再次输入密码"
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
            <Form.Item label="验证码" extra="请输入手机验证码">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: '请输入手机验证码' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button onClick={() => this.getCaptcha()}>获取验证码</Button>
                </Col>
              </Row>
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
