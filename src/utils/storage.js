// export const getItem = (name) => {
//   const data = window.localStorage.getItem(name)
//   try {
//     return JSON.parse(data)
//   } catch (err) {
//     return data
//   }
// }

// export const setItem = (name, value) => {
//   if (typeof value === 'object') {
//     value = JSON.stringify(value)
//   }
//   window.localStorage.setItem(name, value)
// }

// export const removeItem = (name) => {
//   window.localStorage.removeItem(name)
// }

class Storage {
  set (key, val) {
    // localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  }

  get (key) {
    // JSON.parse(localStorage.getItem('TOUTIAO_USER'))
    const data = localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}

const storages = new Storage()
export default storages
