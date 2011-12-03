
describe("A game of life", function() {
	
	it ("initalizes the size of grid", function() {
		var spec = {
			gridDim : 3
		};
		var myLife = life({}, spec);
		
		expect(myLife.gridSize()).toEqual(9);
	});
	
	it ("initalize the cell states", function() {
		var spec = {
			gridDim : 3,
			cells : [true, true, true, true, true, true, true, true, true]
		};
		
		var myLife = life({}, spec);
		
		expect(myLife.isAlive(0, 0)).toEqual(true);
		expect(myLife.isAlive(-1, -1)).toEqual(false);
		expect(myLife.isAlive(1, 1)).toEqual(true);
		expect(myLife.isAlive(3, 3)).toEqual(false);
		expect(myLife.isAlive(-1, 3)).toEqual(false);
		expect(myLife.isAlive(3, -1)).toEqual(false);
	});
	
	it ("counts the neighbours", function() {
		
		var spec = {
			gridDim : 3,
			cells : [true, true, true, true, true, true, true, true, true]	
		};
		
		var myLife = life({},spec);
		
		expect(myLife.countLiveNeighbours(0, 0)).toEqual(3);
		expect(myLife.countLiveNeighbours(1, 1)).toEqual(8);
		expect(myLife.countLiveNeighbours(2, 2)).toEqual(3);
		expect(myLife.countLiveNeighbours(3, 3)).toEqual(1);
	});
	
	if ("count the more interesting neighbours", function() {
		
		var spec = {
			gridDim : 3,
			cells : [true, false, true, false, true, false, true, false, false]
		};
		
		var myLife = life({},spec);
		
		expect(myLife.countLiveNeighbours(0, 0)).toEqual(1);
		expect(myLife.countLiveNeighbours(1, 1)).toEqual(4);
		expect(myLife.countLiveNeighbours(1, 2)).toEqual(3);
		
	});
});