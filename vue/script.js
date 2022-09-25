new Vue({
  el: "#app",
  data: {
    queue: []
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 用于产生demo用的数据
     * @method getData
     */
    getData () {
      const list = []
      for (let i = 0; i < 5; i++) {
        list.push({
          key: Math.random()
        })
      }
      this.queue = this.queue.concat(list)
    },
    /**
     * 点击按钮所绑定的方法，此方法为调用vue-tinder组件内方法的示例，仅供参考
     * @method submit
     * @param  {String} choice
     */
    decide (choice) {
      this.$refs.tinder.decide(choice)
    },
    /**
     * 自定义事件submit绑定的方法，移除卡片的回调
     * @method submit
     * @param  {Object} choice {type,key}
     */
    submit (choice) {
      switch (choice) {
        case 'nope': // 左滑
          break;
        case 'like': // 右滑
          break;
        case 'super': // 上滑
          break;
      }
      if (this.queue.length < 2) {
        this.getData()
      }
    }
  }
})