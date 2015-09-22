
var StacksView = Backbone.View.extend({

  id: 'stacks',

  initialize: function() {
    var stackViews = [];

    this.collection.on('add', function(model) {
      stackViews.push(new StackView({model: model}));
    });

    this.collection.on('remove', function(model) {
      stackViews.pop().$el.detach();
    });
  }

});