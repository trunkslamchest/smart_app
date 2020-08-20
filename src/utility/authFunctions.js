;(function(env) {

  var authFunctions = function(method, url, obj){ return new authFunctions.init(method, url, obj)[method] }

  authFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  authFunctions.prototype = {
    logIn: function(url, obj) {
      return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    signUp: function(url, obj) {
      return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    }
  }

  authFunctions.init.prototype = authFunctions.prototype

  env.authFunctions = authFunctions

  module.exports = authFunctions

})(typeof window === 'undefined' ? global : window)