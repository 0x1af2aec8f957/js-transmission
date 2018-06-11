import React, { Component } from 'react'
// import {config as routes} from '../../public/router'
import {
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom'

import './index.css'

import introduction from '../right/introduction'
import quickStart from '../right/quickStart'
import api from '../right/api'

const RouteWithSubRoutes = (route) => (
    <Route exact path={route.path} render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes}/>
    )}/>
  ),
  routes = [
    {
      path: '/',
      name: '项目简介',
      component: introduction,
      routes: [],
    },
    {
      path: '/quickStart',
      name: '快速开始',
      component: quickStart,
    },
    {
      path: '/api',
      name: '接口文档',
      component: api,
    },
  ]

export default class Plan extends Component {
  render () {
    return (
      <div id="js-transmission-doc">
        <div className="doc-left">
          <ul className={`${Plan.name}doc`}>
            {routes.map((x, i) => (
              <li key={`${Plan.name}doc-${i + 1}`}
                  style={{textAlign: 'center'}}>
                <NavLink to={x.path} activeClassName="link"
                         exact>{x.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="doc-right">
          <header className="link"
                  onClick={() => window.location.href = 'https://github.com/noteScript/js-transmission'}>GITHUB
          </header>
          <div className="view-y">
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route}/>
            ))}

          </div>
        </div>
      </div>
    )
  }
}