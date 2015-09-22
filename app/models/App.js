var App = Backbone.Model.extend({

  initialize: function(param) { // obj with n
    this.set({
      count: 0,
      done: (1<<n) - 1, // Math.pow(2, n) - 1
      excl: (1<<((n/2)^0)) - 1,
      stacks: new Stacks()  // Math.pow(2, Math.floor(n/2)) - 1
    });

    console.log(this.get('stacks'));
    // Can later move functionality to view
    $('body').one('click', function() {
      this.beginStack({
        ld: 0,
        col: 0,
        rd: 0,
        ex1: outerVars.excl,
        ex2: n%2 ? outerVars.excl : 0,
        done: outerVars.done
      });
    });
  },

  beginStack: function(params) { // obj with ld, col, rd, ex1, ex2
    console.log('beginStack');
    this.get('stacks').add(new Stack(params, null, this));
  }


});