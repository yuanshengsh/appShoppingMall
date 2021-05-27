// 用户发送请求的处理方法会在这里执行
import axios from 'axios';
// 引入解析token方法
import jwt_decode from 'jwt-decode'
// 引入设置token方法
import setAuthToken from '../utils/setAuthToken'
// 引入type类型
import { GET_ERRORS,SET_CURRENT_USER } from './type'
 

export function loginUser(userData) {
    console.log('userData',userData)
    return function (dispatch) {
      console.log('dispatch',dispatch)
      console.log('userData',userData);
      delete axios.defaults.headers.common.Authorization;
      return axios.post('/api/user/login',userData)
      .then(res =>{// 对返回的token进行解构,并存储
        console.log('res',res)
          const {access_token } = res.data.data;
          localStorage.setItem('jwToken',access_token)
          // 设置axios的headers access_token
          setAuthToken(access_token)
          // 解析token
          const decoded = jwt_decode(access_token)
          // console.log(decoded)
          // 解析之后用dispatch分发
          dispatch(setCurrentUser(decoded))
      }).catch(err =>{
          localStorage.clear()
          setAuthToken('')

          // 在登录息错误的时候用dispatch把信息返回回去
          dispatch({
              type: GET_ERRORS,
              payload: err.response
          })
      })
    }
}

export const setCurrentUser = decoded => {
    console.log(decoded);
    return ({
        type:SET_CURRENT_USER,
        payload:decoded
    })
}