var App = Backbone.Model.extend({

  initialize: function(param) { // obj with n
    var n = param.n;
    var done = (1<<n) - 1; // Math.pow(2, n) - 1
    var excl = (1<<((n/2)^0)) - 1; // Math.pow(2, Math.floor(n/2)) - 1

    this.set({
      count: 0,
      done: done,
      excl: excl,
      stacks: new Stacks(),
      blankStack: new Blank({conflict: 0, bit: 0})
    });

    // Can later move functionality to view
    $('body').one('click', function() {
      this.beginStack({
        ld: 0,
        col: 0,
        rd: 0,
        ex1: excl,
        ex2: n%2 ? excl : 0,
        rowNum: 1,
        darkColor: false
      });
    }.bind(this));
  },

  beginStack: function(params) { // obj with ld, col, rd, ex1, ex2
    this.get('stacks').add(new Stack(params, null, this));
  },

  // can also give an obj with integer values
  // which will return an obj with same keys
  // nested objects will be ignored
  // n is optional, must be greater than 0
  binString: function(integer, n) {
    n = n || this.get('n');
    var type = typeof integer;

    if (type === 'object') {
      var newObj = {};
      for (var key in integer) {
        if (typeof integer[key] === 'number') {
          newObj[key] = this.binString(integer[key], n);
        }
      }
      return newObj;

    } else if (type === 'number') {
      var bin = integer.toString(2);
      while (bin.length < n) {
        bin = "0" + bin;
      }
      return bin.slice(bin.length - n);

    } else {
      return '';
    }
  }


});