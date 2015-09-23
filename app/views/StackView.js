
var StackView = Backbone.View.extend({

  tagName: 'td',

  className: 'stack-col',

  stackTemplate: function(attributes, rowNum) {
    var topBlock = _.template([ // temporarily make these divs
      '<div class="stack-block <%= color %> top-block">',
        '<table>',
          '<tr><td><b>poss:</b></td>',
            '<td><b><%= poss %></b></td></tr>',
          '<tr><td>ld:</td>',
            '<td><%= ld %></td></tr>',
          '<tr><td>col:</td>',
            '<td><%= col %></td></tr>',
          '<tr><td>rd:</td>',
            '<td><%= rd %></td></tr>',
          '<tr><td>ex1:</td>',
            '<td><%= ex1 %></td></tr>',
        '</table>',
      '</div>'
    ].join(''))(attributes);

    var secondBlock = _.template([ // temporarily make these divs
      '<div class="stack-block <%= color %>">',
        '<table>',
          '<tr><td><b>bit:</b></td>',
            '<td><b><%= bit %></b></td></tr>',
          '<tr><td>(ld|bit):</td>',
            '<td><%= ldBit %></td></tr>',
          '<tr><td>(col|bit):</td>',
            '<td><%= colBit %></td></tr>',
          '<tr><td>(rd|bit):</td>',
            '<td><%= rdBit %></td></tr>',
          '<tr><td>ex2:</td>',
            '<td><%= ex2 %></td></tr>',
        '</table>',
      '</div>'
    ].join(''))(attributes);

    var hiddenBlock = '<div class="stack-block hidden-block"></div>';
    var labelBlock =
      '<div class="stack-block hidden-block"><div class="new-label"></div><div>Stack ' + rowNum + '</div></div>';
    var coloredBlock =
      _.template('<div class="stack-block <%= color %>"></div>')(attributes);

    return [
      hiddenBlock.repeat(rowNum - 1),
      labelBlock,
      topBlock,
      secondBlock,
      coloredBlock.repeat(6 - rowNum)
    ].join('');



  },


  initialize: function() {
    if (this.model.get('isRow')) {
      this.render(true);
      $('#stacks-scaffold').append(this.$el);

      this.model.on('change', function() {
        this.render();
      }.bind(this));
    }
  },

  render: function(isNew) {
    var newLabel = isNew ? 'New Stack' : '';
    var attributes = this.model.get('app').binString(this.model.attributes);
    _.extend(attributes, {
      color: this.model.get('darkColor') ? 'dark-block' : 'light-block'
    });
    var labelNode = this.$el
      .html(this.stackTemplate(attributes, this.model.get('rowNum')))
      .find('.new-label').text(newLabel);

    $('body').one('click', function() {
      labelNode.text('');
    });
  }

});