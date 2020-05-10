import Dep from './Dep.js'
export default class Observer {
  data
  constructor(data) {
    this.data = data
    this.run(data)
  }
  run(data) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, val) {
    // console.log(Object.prototype.toString.call(data) === '[Object Object]')
    if (Object.prototype.toString.call(data) === '[Object Object]') {
      // 还是对象,继续递归
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key])
      })
    } else {
      // 是基本属性，添加拦截器
      const dep = new Dep()
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
          //   console.log(`有人在取${key}值啦,值为${data[key]}`)
          if (Dep.target) {
            console.log('添加了一个监听器')
            dep.addsub(Dep.target)
          }
          return val
        },
        set(newval) {
          console.log(`有人在更改数据啦${key}:${val}=>${newval}`)
          if (newval === val) {
            //数据没有变化，不用理
            return
          }
          // 更新数据
          val = newval
          // 通知所有观察者，让他们更新视图
          dep.notify()
        },
      })
    }
  }
}
