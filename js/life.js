

var life = function (my, spec) {
	
	var my = my || {},
		spec = spec || {},
		that = {};
		
	my.cells = spec.cells || [];
	my.rowLength = spec.rowLength || 3;
	my.height = my.cells.length / my.rowLength;
	
	that.getCount = function() {
		return my.cells.length;
	};
	
	that.evolveCell = function(state, neighbours, n) {
		var liveNeighbours = neighbours.filter(function(element) { return element; }).length;
		
		if (state) {
			if (liveNeighbours < 2 || liveNeighbours > 3) {
				state = false;
			}
		} else {
			if (liveNeighbours === 3) {
				state = true;
			}
		}
		
		if (typeof spec.callback === "function") {
			spec.callback(n, state);
		}
		return state;
	};
	
	that.getNeighbours = function(n) {
		var neighbours = [],
			i = 0,
			j = 0,
			x = n % my.rowLength,
			y = Math.floor(n / my.rowLength);
	
		for (i = x - 1; i <= x + 1; i += 1) {
			for (j = y - 1; j <= y + 1; j += 1) {
				if (i === x && j === y) {
					continue;
				}
				if (i < 0 || i > my.rowLength) {
					continue;
				}
				if (j < 0 || j > my.height) {
					continue;
				}
				neighbours.push(my.cells[i + j * my.rowLength]);
			}
		}
		
		return neighbours;
	};
	
	that.evolve = function() {
		var newCells = [],
			i = 0;
		for(i = 0; i < my.cells.length; i+= 1) {
			newCells.push(that.evolveCell(my.cells[i], that.getNeighbours(i), i));
		}
		my.cells = newCells;
		return newCells;
	};
	
	return that;	
};
