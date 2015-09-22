
var Stacks = Backbone.Collection.extend({

  model: Stacks,

  backtrack: function() {
    console.log('backtrack');
    var aStack = this.pop(); // variable assignment only for the console log
    var stacksLeft = this.length;
    if (stacksLeft) {
      this.at(stacksLeft - 1).set('ex2', 0).iterateRow();
    } else {
      console.log('Algorithm has finished running');
      console.log('Total solutions found: ' + aStack.get('app').get('count'));
    }
  }

});