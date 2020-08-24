(function(env) {

  var getTime = function(keyword){
    var init = new getTime.init(keyword)
    return init[keyword]
  }

  getTime.init = function(keyword){
    this.date = new Date()

    this[keyword] = this[keyword] ? this[keyword]() : this.error(keyword)
  }

  getTime.prototype = {

    now: function() {
      let hours = this.date.getHours() % 12
      let ampm = this.date.getHours() <= 12 ? 'AM' : 'PM'
      let minutes = this.date.getMinutes()
      let seconds = this.date.getSeconds()

      hours = hours ? hours : 12
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0'+ seconds : seconds

      return hours + ':' + minutes + ':' + seconds + ' ' + ampm
    },

    day: function() { return this.date.getDate() },

    month: function() { return (this.date.getMonth() + 1) },

    year: function() { return this.date.getFullYear() },

    fullDate: function() { return '(' + this.now() + ') ' + this.month() + '/' + this.day() + '/' + this.year() },

    error: function(keyword) {
      if (keyword === '' || keyword === null || keyword === undefined) {
        return 'Please enter a keyword'
      } else {
        return `${keyword} is an invalid keyword`
      }
    }
  }

  getTime.init.prototype = getTime.prototype

  module.exports = getTime

  return getTime.init

})(typeof window === "undefined" ? global : window)