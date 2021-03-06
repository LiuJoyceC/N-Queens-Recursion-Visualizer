
var RowView = Backbone.View.extend({

  initialize: function(params, mirror) {
    this.render(mirror);
  },

  render: function(mirror) {
    var squares = this.$el.children();
    var n = squares.length;
    var conflict = this.model.get('conflict');

    for (var i = 0; i < n; i++) {
      if (conflict & Math.pow(2, i)) {
        $(squares[ mirror ? i : n - 1 - i ]).addClass('conflict');
      } else {
        $(squares[ mirror ? i : n - 1 -i ]).removeClass('conflict');
      }
    }

    this.placeQueen(squares, n, mirror);

    this.model.on('change:bit', function() {
      this.placeQueen(squares, n, mirror);
    }.bind(this));

  },

  placeQueen: function(squares, n, mirror) {
    $(squares).children().remove();
    var bit = this.model.get('bit');
    if (bit) {
      var qPos = mirror ? Math.log2(bit) : n - 1 - Math.log2(bit);
      $(squares[qPos]).append('<div class="queen"></div>'); // will append image instead
    }
  }

});
