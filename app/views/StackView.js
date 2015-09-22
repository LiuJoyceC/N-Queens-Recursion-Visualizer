
var StackView = Backbone.View.extend({

  tagName: 'div',

  template: _.template([ // temporarily make these divs
    '<div>',
      'ld: <%= ld %> ',
      'col: <%= col %> ',
      'rd: <%= rd %> ',
      'ex1: <%= ex1 %> ',
      'ex2: <%= ex2 %> ',
      'bit: <%= bit %> ',
      'poss: <%= poss %> ',
    '</div>'
  ].join('')),


  initialize: function() {
    if (this.model.get('isRow')) {
      this.render();
      $('#stacks').append(this.$el);

      this.model.on('change', function() {
        this.render();
      }.bind(this));
    }
  },

  render: function() {
    console.log('attributes');
    this.$el.html(this.template(this.model.attributes));
  }

});