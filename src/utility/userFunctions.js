;(function(env) {

  var userFunctions = function(method, url, obj){ return new userFunctions.init(method, url, obj)[method] }

  userFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  userFunctions.prototype = {
    get: function(url) {
      return fetch(url)
      .then(res => res.json())
    },

    getUser: function(url, id) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify({id}))
      })
      .then(res => res.json())
    },

    getUserProfile: function(url, user_name) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify({user_name}))
      })
      .then(res => res.json())
    },

    patchUserLoginTime: function(url, obj){
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify(obj))
      })
      .then(res => res.json())
    },

    patch: function(url, obj){
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify(obj))
      })
      .then(res => res.json())
    },

    post: function(url, obj){
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify(obj))
      })
      .then(res => res.json())
    },

    delete: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify(obj))
      })
      .then(res => res.json())
    },

    editUserComment: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify(obj))
      })
      .then(res => res.json())
    },

    deleteUserComment: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: "data=" + encodeURIComponent(JSON.stringify(obj))
      })
      .then(res => res.json())
    }
  }

  userFunctions.init.prototype = userFunctions.prototype

  env.userFunctions = userFunctions

  module.exports = userFunctions

})(typeof window === 'undefined' ? global : window)