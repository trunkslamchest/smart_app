;(function(env) {

  var checkFunctions = function(method, url, obj){ return new checkFunctions.init(method, url, obj)[method] }

  checkFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  checkFunctions.prototype = {
    checkUserName: function(url, obj){
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          // "Content-Type": 'application/json'
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        // body: JSON.stringify(obj)
        body: `data=${JSON.stringify(obj)}`
      })
      .then(res => res.json())
    },

    checkEmail: function(url, obj){
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          // "Content-Type": 'application/json'
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        // body: JSON.stringify(obj)
        body: `data=${JSON.stringify(obj)}`
      })
      .then(res => res.json())
    }
  }

  checkFunctions.init.prototype = checkFunctions.prototype

  env.checkFunctions = checkFunctions

  module.exports = checkFunctions

})(typeof window === 'undefined' ? global : window)