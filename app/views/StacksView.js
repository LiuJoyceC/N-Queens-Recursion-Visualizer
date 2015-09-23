
var StacksView = Backbone.View.extend({

  el: '#stacks',

  initialize: function() {
    var stackViews = [];

    this.collection.on('add', function(model) {
      stackViews.push(new StackView({
        model: model,
        id: 'col-' + model.get('rowNum')
      }));
    });

    this.collection.on('remove', function(model) {
      stackViews.pop().$el.detach();
    });
  }

});