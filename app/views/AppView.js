
var AppView = Backbone.View.extend({

  el: '#app',

  tableTemplate: _.template([
    '<tr>',
      '<td>n: </td>',
      '<td><%= n %></td>',
      '<td>done: </td>',
      '<td><%= doneBin %></td>',
    '</tr><tr>',
      '<td>count x 2: </td>',
      '<td id="count-times2">0</td>',
      '<td>excl: </td>',
      '<td><%= exclBin %></td>',
    '</tr>'
  ].join('')),

  initialize: function(modelParam) {
    console.log(this.$el);
    var n = this.model.get('n');
    var stacks = this.model.get('stacks');
    var blankStack = this.model.get('blankStack');

    $('#outervars').html(this.tableTemplate({
      n: n,
      doneBin: this.binString(this.model.get('done')),
      exclBin: this.binString(this.model.get('excl'))
    }));

    new StacksView({collection: stacks});

console.log('boardview about to run?');
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
  },

  binString: function(integer) {
    var n = this.model.get('n');
    var bin = integer.toString(2);
    while (bin.length < n) {
      bin = "0" + bin;
    }
    return bin.slice(bin.length - n);
  }

});