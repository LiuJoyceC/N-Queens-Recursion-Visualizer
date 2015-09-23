
var AppView = Backbone.View.extend({

  el: '#app',

  tableTemplate: _.template([
    '<table><tbody><tr>',
      '<td>n: </td>',
      '<td><%= n %></td>',
      '<td>done: </td>',
      '<td><%= doneBin %></td>',
    '</tr><tr>',
      '<td>count x 2: </td>',
      '<td id="count-times2">0</td>',
      '<td>excl: </td>',
      '<td><%= exclBin %></td>',
    '</tr></tbody></table>'
  ].join('')),

  initialize: function() {
    var n = this.model.get('n');
    var stacks = this.model.get('stacks');
    var blankStack = this.model.get('blankStack');

    $('#outervars').html(this.tableTemplate({
      n: n,
      doneBin: this.model.binString(this.model.get('done'), n),
      exclBin: this.model.binString(this.model.get('excl'), n)
    }));

    new StacksView({collection: stacks});

    new BoardView({
      collection: stacks,
      el: '#primary-board'
    }, n, false, blankStack);

    new BoardView({
      collection: stacks,
      el: '#mirror-board'
    }, n, true, blankStack);

    this.model.on('change:count', function() {
      $('#count-times2').text(this.model.get('count')*2);
    }.bind(this));

    this.model.on('message', function(message) {
      $('#message').text(message);
    });
  }

});