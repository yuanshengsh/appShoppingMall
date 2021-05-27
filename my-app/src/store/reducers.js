// 它就是将来真正要用到的数据，我们将其统一放置在reducers.js文件
import {combineReducers} from 'redux'
import defaultState from './state'

function pageTitle (state = defaultState.pageTitle,action) {
// 不同的action有不同的处理逻辑
    switch (action.type) {
        case 'SET_PAGE_TITLE':
        return action.data
        default:
        return state
    }
}

function user (state = defaultState.user, action){
    console.log(action,'action')
    console.log(state,'state')
    switch (action.type) {
        case 'SET_USER':
        return action?.payload || {}
        default:
        return state
    }
}

export default combineReducers({
    pageTitle,
    user
})