import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, message, Card } from 'antd';
import './login.less';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
// import { setUser } from '../../store/action';
import { loginUser } from '../../actions/authActions'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

interface LoginState {
  name: string,
  password: string,
  errors: Record<any, any>
}

class Login extends Component<any, LoginState> {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      errors: {}
    }
    const { errors, name, password } = this.state;
  }

  onFinish = (values: any) => {
    console.log('Success:', values);
    // setUser(values);
    const { name, password } = values;

    const newUser = {
      name,
      password
    }
    const login = this.props;
    // 点击登录的时候把数据存入redux的authActions.js中
    login.loginUser(newUser)
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

// 将返回的状态转换成属性
const mapStateToProps = (state) => ({
  // auth 在reducers下定义的一大的reducers
  // auth :state.auth,
  errors: state.errors
})

// mapDispatchToProps：将dispatch映射到组件的props中
// const mapDispatchToProps = function (dispatch, ownProps) {
//   return {
//     setUser(data, data2) {
//       console.log('data', data);
//       console.log('data2', data2);
//       dispatch(setUser(data))
//     }
//   }
// }

export default connect(mapStateToProps, { loginUser })(Login);
