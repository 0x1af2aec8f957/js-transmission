import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

export default class Introduction extends Component {
  constructor (prop) {
    super(prop)
    console.log(prop)
  }

  render () {
    return (
      <div className={`${Introduction.name}-doc`}>
        <h6>项目信息</h6>
        <hr/>
        <ul>
          <li>文档版本：2.0</li>
          <li>深度：1</li>
        </ul>
        <hr/>
        <p>
          当前版本的代码库尚未开源，你可以先使用GitHub上的版本，2.0内部有较大的改动但保留了初期的使用接口，仅改变了全局配置的接口，你可以放心在你的项目中使用已开源的代码，敬请期待！
        </p>
      </div>
    )
  }
}