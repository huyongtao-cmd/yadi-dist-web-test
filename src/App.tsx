import React from 'react';
import { Provider } from 'mobx-react';
import store from './store/index';
import ElLayout from '@/project/layout';
import MultiTabMobx from '@/store/multiTab';
import './style/index.less';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { isLogin } from '@/utils/utils';
import Err404 from '@/page/errPage/Err404';

import Login from '@/page/Login/index';

class App extends React.Component {
  componentWillMount() {
    store.getPrincipal();
  }
  componentDidMount() {
    //在页面刷新时将mobx里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      store.setPrincipal();
    });
  }
  render() {
    return (
      <Router
        basename={
          process.env.NODE_ENV !== 'development'
            ? process.env.REACT_APP_BASE_URL
            : ''
        }
      >
        <Provider store={store} multiTabMobx={MultiTabMobx}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/404' component={Err404} />
            {!!isLogin() ? (
              <Redirect
                from='/domain'
                to={`${process.env.NODE_ENV !== 'development'
                  ? process.env.REACT_APP_BASE_URL
                  : ''
                  }/dashboard`}
              />
            ) : null}
            <Route
              path='/'
              render={() =>
                !!isLogin() ? (
                  <ElLayout />
                ) : (
                  <Redirect
                    // to={`${
                    //   process.env.NODE_ENV !== 'development'
                    //     ? process.env.REACT_APP_BASE_URL
                    //     : ''
                    // }/login`}
                    to={'/login'}
                  />
                )
              }
            />
            <Route path='*' component={Err404} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default App;
