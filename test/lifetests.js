
describe("A game of life", function() {

	it("is a grid", function() {
		var state = { cells : [true, true, true, true, true, true, true, true, true]};
		var myLife = life({}, state);
		
		expect(myLife.getCount()).toEqual(9);
	});
	
	it("a live cell with fewer than two live neighbours dies", function() {
		var neighbours = [true];
		var myLife = life();
		
		expect(myLife.evolveCell(true, neighbours)).toEqual(false);
	});
	
	it("a live cell with two live neighbours lives", function() {
		var neighbours = [true, true];
		var myLife = life();
		
		expect(myLife.evolveCell(true, neighbours)).toEqual(true);
	});
	
	it("a live cell with three live neighbours lives", function() {
		var neighbours = [true, true, true];
		var myLife = life();
		
		expect(myLife.evolveCell(true, neighbours)).toEqual(true);
	});
	
	it("a live cell with more than three live neightbours dies", function() {
		var neighbours = [true, true, true, true];
		var myLife = life();
		
		expect(myLife.evolveCell(true, neighbours)).toEqual(false);
	});
	
	it("a dead cell with three live neighbours becomes a live cell", function() {
		var neighbours = [true, true, true];
		var myLife = life();
		
		expect(myLife.evolveCell(false, neighbours)).toEqual(true);
	});
	
	it("a dead cell with otherwise stays dead", function() {
		var neighbours = [true];
		var myLife = life();
		
		expect(myLife.evolveCell(false, neighbours)).toEqual(false);
	});
	
	it("a cell tells the world its changed", function() {
		var neighbours = [true];
		var signal = false;
		var spec = { callback: function() { signal = true; } };
		var myLife = life({}, spec);
		
		myLife.evolveCell(false, neighbours, 1);
		expect(signal).toEqual(true);
	});
	
	it("a cell has neighbours", function() {
		var state = { 
			rowLength: 3, 
			cells : [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
		var myLife = life({}, state);
		var neighbours = myLife.getNeighbours(4).sort();
		
		expect(neighbours).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
	});
	
	it("a corner cell has neighbours", function() {
		var state = {
			rowLength: 3,
			cells : [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
		var myLife = life({}, state);
		var neighbours = myLife.getNeighbours(0).sort();
		
		expect(neighbours).toEqual([2, 4, 5]);
	});
	
	it("an edge cell has neighbours", function() {
		var state = {
			rowLength: 3,
			cells : [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
		var myLife = life({}, state);
		var neighbours = myLife.getNeighbours(3).sort();
		
		expect(neighbours).toEqual([1, 2, 5, 7, 8]);
	});
	
	it("a grid evolves", function() {
		var state = {
			rowLength: 3,
			cells : [true, true, true, false, true, false, false, false, false]
		};
		var newCells = [true, true, true, true, true, true, false, false, false];
		
		var myLife = life({}, state);
		
		expect(myLife.evolve()).toEqual(newCells);
	});
});