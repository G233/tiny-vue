import Observer from './Observer.js'
import Compile from './Compile.js'
export default class TinyVue {
  data // 数据
  constructor(options) {
    let self = this
    this.vm = this
    this.data = options.data
    // 数据访问代理
    Object.keys(this.data).forEach(function (key) {
      self.proxyKeys(key)
    })

    new Observer(this.data)
    new Compile(options.el, this.vm)
    return this
  }
  proxyKeys(key) {
    Object.defineProperty(this, key, {
      enumerableL: true,
      configurable: true,
      get() {
        return this.data[key]
      },
      set(val) {
        this.data[key] = val
      },
    })
  }
}
