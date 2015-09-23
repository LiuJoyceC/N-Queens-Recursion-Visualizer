
var BoardView = Backbone.View.extend({

  initialize: function(params, n, mirror, blankStack) {
    var rows = [];
    var htmlString;

    for (var i = 0; i < n; i++) {
      htmlString = '<tr>';
      for (var j = 0; j < n; j++) {
        if ((i + j + (n-1)*mirror) % 2) {
          htmlString += '<td class="square light-square"></td>';
        } else {
          htmlString += '<td class="square dark-square"></td>';
        }
      }
      htmlString += '</tr>';
      var rowEl = $(htmlString);
      this.$el.append(rowEl);
      rows.push(new RowView({
        model: blankStack,
        el: rowEl
      }, mirror));
    }

    var rowNum = 0;

    this.collection.on('add', function(model) {
      if (model.get('isRow')) {
        rows[rowNum].model = model;
        rows[rowNum].render(mirror);
        rowNum++;
      }
    });

    this.collection.on('remove', function(model) {
      if (model.get('isRow')) {
        rowNum--;
        rows[rowNum].model = blankStack;
        rows[rowNum].render(mirror);
      }
    });


  }

});