const Storage = {
  get: function (name) {                // 存数据
    return JSON.parse(localStorage.getItem(name)) || null
  },
  set: function (name, obj) {             // 拿数据
    localStorage.setItem(name, JSON.stringify(obj))
  },
  clear: function (name) {              // 删数据
    localStorage.removeItem(name)
  }
}
export default Storage
