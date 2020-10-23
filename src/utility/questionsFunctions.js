;(function(env) {

  var questionsFunctions = function(method, url, obj){ return new questionsFunctions.init(method, url, obj)[method] }

  questionsFunctions.init = function(method, url, obj){ this[method] = this[method](url, obj) }

  questionsFunctions.prototype = {
    get: function(url) {
      return fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
        },
      })
      .then(res => res.json())
    },

    getQuickQuestion: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    getDiffQuestion: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    getCatQuestion: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    getStaticQuestion: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    getQuestionResults: function(url, obj) {
      return fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    patchQuestionVote: function(url, obj) {
      return fetch(url, {
        method: "PATCH",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    patchQuestionComment: function(url, obj) {
      return fetch(url, {
        method: "PATCH",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    editQuestionComment: function(url, obj) {
      return fetch(url, {
        method: "PATCH",
        mode: 'cors',
        headers: {
          "Accept": ['application/json', 'application/x-www-form-urlencoded'],
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
    },

    deleteQuestionComment: function(url, obj) {
      return fetch(url, {
        method: "PATCH",
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

  questionsFunctions.init.prototype = questionsFunctions.prototype

  env.questionsFunctions = questionsFunctions

  module.exports = questionsFunctions

})(typeof window === 'undefined' ? global : window)