;(function(env) {

  var leaderBoardsFunctions = function(method, url, obj){ return new leaderBoardsFunctions.init(method, url, obj)[method] }

  leaderBoardsFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  leaderBoardsFunctions.prototype = {
    getOverallLeaderBoards: function(url) {
      console.log(url)
      return fetch(url)
      .then(res => res.json())
    },

    getCatLeaderBoards: function(url) {
      return fetch(url)
      .then(res => res.json())
    }
  }

  leaderBoardsFunctions.init.prototype = leaderBoardsFunctions.prototype

  env.leaderBoardsFunctions = leaderBoardsFunctions

  module.exports = leaderBoardsFunctions

})(typeof window === 'undefined' ? global : window)