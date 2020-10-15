;(function(env) {

  var achievementFunctions = function(method, url, obj){ return new achievementFunctions.init(method, url, obj)[method] }

  achievementFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  achievementFunctions.prototype = {
    get: function(url) {
      return fetch(url)
      .then(res => res.json())
    }
  }

  achievementFunctions.init.prototype = achievementFunctions.prototype

  env.achievementFunctions = achievementFunctions

  module.exports = achievementFunctions

})(typeof window === 'undefined' ? global : window)