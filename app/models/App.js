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

    console.log(this.get('stacks'));
    // Can later move functionality to view
    $('body').one('click', function() {
      this.beginStack({
        ld: 0,
        col: 0,
        rd: 0,
        ex1: excl,
        ex2: n%2 ? excl : 0,
        done: done
      });
    }.bind(this));
  },

  beginStack: function(params) { // obj with ld, col, rd, ex1, ex2
    console.log('beginStack');
    this.get('stacks').add(new Stack(params, null, this));
  }


});