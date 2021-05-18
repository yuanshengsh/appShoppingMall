// 现在我们已经创建了reducer，但是还没有对应的action来操作它们，所以接下来就来编写action
import axios from 'axios'
// import qs from 'qs'
import { message } from 'antd';
// 引用
import cookie from 'react-cookies';

// 常量修改
export function setPageTitle (data) {
    return (dispatch) => {
        dispatch({ type: 'SET_PAGE_TITLE', data })
    }
}

// 异步修改
// 用户登录，将用户信息存储在仓库
export function setUser (values){
    console.log('values',values)
    return (dispatch) => {
    console.log('dispatch',dispatch)
     axios.post('http://www.adaday.cn:8080/api/user/login', values)
      .then(res => {
        console.log('res', res)
        if (res.data.errno === 0) {
          // 设置cookie，第三个参数的意思是所有页面都能用这个cookie
          const { access_token, expires_at } = res.data.data;
          cookie.save('token', access_token, { path: "/", expires: expires_at });
          message.success('登陆成功');
          dispatch({ type: 'SET_USER', data:res.data.result })

        } else {
          const { errmsg } = res.data;
          message.error(errmsg);
        }
      })
        // axios.post('http://xx.xx.xx.xx:8888/user-server/login/userLogin',qs.stringify({
        //     userName:userName,
        //     password:password
        // })).then(res => {
        //     if(res.data.apistatus === 200){
        //         dispatch({ type: 'SET_USER', data:res.data.result })
        //     }else {
        //         alert('提示',res.data.msg , [
        //             { text: '知道了', onPress: () => '' },
        //         ])
        //     }
        // })
    }
}