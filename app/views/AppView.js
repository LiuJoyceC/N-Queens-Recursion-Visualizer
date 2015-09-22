
var AppView = Backbone.View.extend({

  id: 'app',

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
    $('#outervars').html(this.tableTemplate({
      n: this.model.get('n'),
      doneBin: this.binString(this.model.get('done')),
      exclBin: this.binString(this.model.get('excl'))
    }));

    var stacksView = new StacksView({collection: this.model.get('stacks')});

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