import logo from './logo.svg';
import './App.less';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// 引入页面路由组件
import Login from './containers/login/login'
import Register from './containers/register/register'
import Protocol from './containers/protocol/protocol.tsx'
import Header from './components/header/Header'

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/protocol' component={Protocol}></Route>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;
