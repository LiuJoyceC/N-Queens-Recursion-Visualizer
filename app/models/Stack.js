var Stack = Backbone.Model.extend({

  initialize: function(params, options, app) { //params: ld, col, rd, ex1, ex2
    this.set('app', app);
    this.set('stacks', app.get('stacks'));
    var done = app.get('done');
    if (params.col === done) {
      app.set('count', app.get('count') + 1);

      console.log('Found a solution');
      console.log('Solutions found: ' + app.get('count'));
      console.log(app.get('stacks'));
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
        isRow: true
      });

      console.log(app.get('stacks'));
      $('body').one('click', function() {
        this.iterateRow();
      }.bind(this));
    }
  },

  iterateRow: function() {
    console.log('iterateRow');
    var poss = this.get('poss');
    if (poss) {
      var bit = poss & -poss;
      var ldBit = this.get('ld') | bit;
      var rdBit = this.get('rd') | bit;
      var colBit = this.get('col') | bit;
      this.set({
        bit: bit,
        poss: poss ^ bit,
        ldBit: ldBit,
        colBit: colBit,
        rdBit: rdBit
      });

      this.get('app').beginStack({
        ld: ldBit>>1,
        col: colBit,
        rd: rdBit<<1,
        ex1: this.get('ex2'),
        ex2: 0
      });

    } else {
      console.log('No more open spots in this row');
      console.log(this.get('stacks'));
      $('body').one('click', function() {
        this.get('stacks').backtrack();
      }.bind(this));
    }
  }



});