$(document).ready(function() {
  var n = prompt('Choose an N between 2')

  var outerVars = {
    n: n,
    count: 0,
    done: (1<<n) - 1, // Math.pow(2, n) - 1
    excl: (1<<((n/2)^0)) - 1 // Math.pow(2, Math.floor(n/2)) - 1
  };
  console.log(outerVars);

  var stacks = [];

  var beginStack = function(params) { // obj with ld, col, rd, ex1, ex2
    console.log('beginStack');
    if (params.col === outerVars.done) {
      stacks.push(params);
      outerVars.count++;
      console.log(outerVars.count);
      //renderCount(); // Change count variable display, and display "Found solution"
      console.log('Found a solution');
      console.log(stacks);
      $('body').one('click', function() {
        //Remove text display, remove previous stack in stacks, run iterateRow
        backtrack(params);
      });
    } else {
      params.conflict = params.ld | params.col | params.rd | params.ex1;
      params.poss = ~params.conflict & outerVars.done;
      params.bit = 0;
      params.ldBit = params.ld;
      params.colBit = params.col;
      params.rdBit = params.rd;
      // var stack = new Stack(params);
      // stacks.push(stack);
      stacks.push(params);
      //renderNewStack(stack, stacks.length); // attach stack to dom element in stack diagram
      console.log(stacks);
      $('body').one('click', function() {
        iterateRow(params);
      });
    }
  };

  var iterateRow = function(params) { // obj with ld, col, rd, ex1, ex2, conflict, poss
    console.log('iterateRow');
    if (params.poss) {
      var poss = params.poss;
      params.bit = params.poss & -params.poss;
      params.poss = params.poss ^ params.bit;
      params.ldBit = params.ld | params.bit;
      params.colBit = params.col | params.bit;
      params.rdBit = params.rd | params.bit;
      beginStack({
        ld: params.ldBit>>1,
        col: params.colBit,
        rd: params.rdBit<<1,
        ex1: params.ex2,
        ex2: 0
      });
    } else {
      //noMoreOpenSpots(); // Display "no more open spots in this row"
      console.log('No more open spots in this row');
      console.log(stacks);
      $('body').one('click', function() {
        backtrack();
      });
    }
  };

  var backtrack = function() {
    console.log('backtrack');
    //removeTextDisplay();
    stacks.pop(); // may need to re-render D3 stacks diagram first
    if (stacks.length) {
      var prevStack = stacks[stacks.length - 1];
      prevStack.ex2 = 0;
      iterateRow(prevStack);
    } else {
      //finished(); // display "Algorithm has finished running"
      console.log('Algorith has finished running');
      console.log(outerVars.count);
    }
  }

  params = {
    ld: 0,
    col: 0,
    rd: 0,
    ex1: outerVars.excl,
    ex2: n%2 ? outerVars.excl : 0
  };

  console.log(stacks, outerVars.count);
  $('body').one('click', function() {
    beginStack(params);
  })

});