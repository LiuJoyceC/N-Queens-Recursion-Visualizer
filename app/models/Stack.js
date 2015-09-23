var Stack = Backbone.Model.extend({

  //params: ld, col, rd, ex1, ex2, rowNum, darkColor
  initialize: function(params, options, app) {
    this.set('app', app);
    this.set('stacks', app.get('stacks'));
    var done = app.get('done');
    if (params.col === done) {
      app.set('count', app.get('count') + 1);

      app.trigger('message', 'Found a solution!');
      $('body').one('click', function() {
        app.get('stacks').backtrack();
      }); //may need to bind if we add code using 'this'
    } else {
      var conflict = params.ld | params.col | params.rd | params.ex1;
      this.set({
        conflict: conflict,
        poss: ~conflict & done,
        bit: 0,
        ldBit: params.ld,
        colBit: params.col,
        rdBit: params.rd,
        isRow: true,
        nextDark: false
      });

      $('body').one('click', function() {
        this.iterateRow();
      }.bind(this));
    }
  },

  iterateRow: function() {
    var poss = this.get('poss');
    if (poss) {
      var bit = poss & -poss;
      var ldBit = this.get('ld') | bit;
      var rdBit = this.get('rd') | bit;
      var colBit = this.get('col') | bit;
      var nextDark = this.get('nextDark');
      this.set({
        bit: bit,
        poss: poss ^ bit,
        ldBit: ldBit,
        colBit: colBit,
        rdBit: rdBit,
        nextDark: !nextDark //flips value
      });

      this.get('app').beginStack({
        ld: ldBit>>1,
        col: colBit,
        rd: rdBit<<1,
        ex1: this.get('ex2'),
        ex2: 0,
        rowNum: this.get('rowNum') + 1,
        darkColor: nextDark
      });

    } else {
      this.get('app')
        .trigger('message', 'No more open spots in Row ' + this.get('rowNum'));
      $('body').one('click', function() {
        this.get('stacks').backtrack();
      }.bind(this));
    }
  }



});