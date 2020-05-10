import Dep from './Dep.js'
export default class Watch {
  cb // 设置 Dom 节点的函数
  vm // Vue 实例
  exp //
  value // 所侦听数据的值

  constructor(vm, exp, cb) {
    ;[this.vm, this.exp, this.cb] = [vm, exp, cb]
    this.value = this.get()
  }
  get() {
    Dep.target = this
    this.value = this.vm.data[this.exp] // 触发对应属性的 get 拦截器，把自己添加到侦听器队列中
    Dep.target = null
  }
  // 修改对应 Dom 结构
  run() {
    let value = this.vm.data[this.exp]
    let oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  }
  update() {
    this.run()
  }
}
