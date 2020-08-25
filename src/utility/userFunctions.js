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
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({id})
      })
      .then(res => res.json())
    },

    patch: function(url, userObj){
      return fetch(url, {
        method: 'PATCH',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(userObj)
      })
      .then(res => res.json())
    },

    post: function(url, userObj){
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(userObj)
      })
      .then(res => res.json())
    },

    delete: function(url) {
      return fetch(url, {
        method: 'DELETE'
      })
    },
  }

  userFunctions.init.prototype = userFunctions.prototype

  env.userFunctions = userFunctions

  module.exports = userFunctions

})(typeof window === 'undefined' ? global : window)