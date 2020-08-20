;(function(env) {

  var questionFunctions = function(method, url, obj){ return new questionFunctions.init(method, url, obj)[method] }

  questionFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  questionFunctions.prototype = {
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

  questionFunctions.init.prototype = questionFunctions.prototype

  env.questionFunctions = questionFunctions

  module.exports = questionFunctions

})(typeof window === 'undefined' ? global : window)