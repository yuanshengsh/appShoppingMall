import {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {axios} from 'axios'
// @withRouter
class CheckLogin extends Component {
    constructor(props) {    
        super(props);
        this.state = {};
     }

    componentDidMount() {
         // 在这里请求相关接口判断用户是否完成登录
        // axios.get('xxxxx')
        //     .then(res => {
        //         if(res.status === 200) {
        //             if(res.data.code === 0) {

        //             }else {
        //                 this.props.history.push('/login')
        //             }
        //         }
        //     })
        // const {history}=this.props;
        // history.push('/login')
    }

    render() {
        return null;
    }
}

export default withRouter(CheckLogin);