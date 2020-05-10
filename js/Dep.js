export default class Dep {
  static target = null
  subs = []
  // 添加侦听器
  addsub(sub) {
    this.subs.push(sub)
  }
  // 发送信号
  notify() {
    console.log('开始通知侦听者')
    console.log(this.subs)
    // 后面无响应了

    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
