;(function(env) {

  var questionsFunctions = function(method, url, obj){ return new questionsFunctions.init(method, url, obj)[method] }

  questionsFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  questionsFunctions.prototype = {
    get: function(url) {
      return fetch(url)
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
        method: 'POST',
        headers: {
          'content-type':'application/json'
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

  questionsFunctions.init.prototype = questionsFunctions.prototype

  env.questionsFunctions = questionsFunctions

  module.exports = questionsFunctions

})(typeof window === 'undefined' ? global : window)