// 用户发送请求的处理方法会在这里执行
import axios from 'axios';
// 引入解析token方法
import jwt_decode from 'jwt-decode'
// 引入设置token方法
import setAuthToken from '../utils/setAuthToken'
// 引入type类型
import { GET_ERRORS,SET_CURRENT_USER } from './type'
 

export function userExit() {
    return function (dispatch) {
    console.log(222)

      delete axios.defaults.headers.common.Authorization;
      localStorage.clear()
      setAuthToken('')

      // 在登录息错误的时候用dispatch把信息返回回去
      dispatch({
          type: SET_CURRENT_USER,
          payload: {}
      })
    }
}
