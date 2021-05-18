import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, message, Card } from 'antd';
import './login.less';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setUser } from '../../store/action';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onFinish = (values: any) => {
    console.log('Success:', values);
    setUser(values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div className="page-login">
        <Card style={{ width: '50%' }}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="name"
              rules={[{ required: true, message: '请输入账号' }]}
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
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登陆
            </Button>
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Row>
                <Col span={6} offset={2}>
                  <Checkbox>下次自动登陆</Checkbox>
                </Col>
                <Col span={6} offset={10}>
                  <Link to='/register'>忘记密码</Link>|
                  <Link to='/register'>注册</Link>
                </Col>
              </Row>
            </Form.Item>

          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    setUser(data, data2) {
      console.log('data', data);
      console.log('data2', data2);
      dispatch(setUser(data))
    }
  }
}

export default Login
// export default connect(mapStateToProps, mapDispatchToProps)(Login)
