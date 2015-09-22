
var Stacks = Backbone.Collection.extend({

  model: Stack,

  backtrack: function() {
    var app = this.pop().get('app'); // pops last stack off, and also gets app
    app.trigger('message','');
    var stacksLeft = this.length;
    if (stacksLeft) {
      this.at(stacksLeft - 1).set('ex2', 0).iterateRow();
    } else {
      app.trigger('message',
        'Algorithm has finished running. Solutions found: ' + app.get('count')*2);
    }
  }

});